import path from "path";
import util from "util";
import fs from "fs";
import logger from "../configs/winstonConfig";
import _ from "lodash";
import * as fastcsv from "fast-csv";
import validator from "validator";
import { StatusCodes } from "http-status-codes";
import generator from "generate-password";
import { UserInterface } from "../interfaces/modelInterface";
import { generateAuthToken, generateLecturerId, generateStudentId } from "./GeneralUtils";
import { hash } from "bcryptjs";
import { prisma } from "../configs/prismaConfig";
import configValues from "../configs/config";
import transporter from "../configs/nodemailerConfig";
import { EMAIL_ACTIVATION_SUBJECT } from "../constants/messages";
import { mailOptionsInterface } from "../interfaces/mailOptionsInterface";
import { studentInviteTemplate } from "../templates/studentInviteTemplate";
import { lecturerInviteTemplate } from "../templates/lecturerInviteTemplate";

const readdir = util.promisify(fs.readdir);

// Get file names present in the directory
export const getCsvFiles = async (currentDir: string) => {
  try {
    const filenames = await readdir(currentDir);
    const filteredFiles = _.filter(filenames, (filename) => {
      return _.endsWith(filename, ".csv");
    });
    return filteredFiles;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

async function createStudentAccount(user: UserInterface) {
  const tempPassword = generator.generate({
    length: 10,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
    strict: true,
  });
  const studentId = await generateStudentId();
  const results = await prisma.$transaction([
    prisma.student.create({
      data: {
        studentId: studentId,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email
      },
    }),
    prisma.user.create({
      data: {
        loginId: studentId,
        email: user.email,
        role: "STUDENT",
        password: await hash(tempPassword, 12),
      },
    }),
  ]);

  if (results) {
    const otp = await prisma.otp.create({
      data: {
        otpCode: tempPassword,
        userId: studentId,
      },
    });
    // If otp was created, send email with verification link
    if (otp) {
      const token = generateAuthToken(results[1]);
      const filteredUser = _.pick(results[1], ["email"]);
      let message = studentInviteTemplate(
        studentId,
        configValues.ACCOUNT_CONFIRMATION_URL + "/" + token.accessToken,
        otp.otpCode
      );
      const mailOptions: mailOptionsInterface = {
        to: filteredUser.email,
        subject: EMAIL_ACTIVATION_SUBJECT,
        html: message,
      };
      transporter.sendMail(mailOptions);
    }
  }

  return results[0]
}

// Create Lecturer
async function createLecturerAccount(user: UserInterface) {
  const tempPassword = generator.generate({
    length: 10,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
    strict: true,
  });
  const staffId = await generateLecturerId();
  const results = await prisma.$transaction([
    prisma.lecturer.create({
      data: {
        staffId: staffId,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email
      },
    }),
    prisma.user.create({
      data: {
        loginId: staffId,
        email: user.email,
        role: "LECTURER",
        password: await hash(tempPassword, 12),
      },
    }),
  ]);

  if (results) {
    const otp = await prisma.otp.create({
      data: {
        otpCode: tempPassword,
        userId: staffId,
      },
    });
    // If otp was created, send email with verification link
    if (otp) {
      const token = generateAuthToken(results[1]);
      const filteredUser = _.pick(results[1], ["email"]);
      let message = lecturerInviteTemplate(
        staffId,
        configValues.ACCOUNT_CONFIRMATION_URL + "/" + token.accessToken,
        otp.otpCode
      );
      const mailOptions: mailOptionsInterface = {
        to: filteredUser.email,
        subject: EMAIL_ACTIVATION_SUBJECT,
        html: message,
      };
      transporter.sendMail(mailOptions);
    }
  }

  return results[0]
}

export async function csvToDb(currentDir: string, model: string) {
  const filenames = await getCsvFiles(currentDir);
  let errors = [];
  let results = []

  // Use Promise.all to wait for all the CSV files to be parsed
  await Promise.all(
    filenames.map(async (filename) => {
      const currentFilePath = path.join(currentDir, filename);
      const uploadedFileStream = fs.createReadStream(currentFilePath);
      let csvCollection = [];
      const processedEmails = []; // Track processed emails
      const duplicateEmails = []; // Track duplicate emails

      // Wrap the CSV parsing in a promise to await it
      await new Promise((resolve, reject) => {
        uploadedFileStream
          .pipe(fastcsv.parse({ headers: true }))
          .validate(async (data, cb) => {
            const existingUser = await prisma.user.findFirst({
              where: {
                email: data["email"],
              },
            });
            // Check for duplicate email
            if (existingUser || processedEmails.includes(data["email"])) {
              duplicateEmails.push(data["email"]);
              return cb(null, false);
            }
            if (
              !validator.isEmail(data["email"]) ||
              typeof data["firstname"] !== "string" ||
              validator.isEmpty(data["firstname"]) ||
              !validator.isAlpha(data["firstname"]) ||
              typeof data["lastname"] !== "string" ||
              validator.isEmpty(data["lastname"]) ||
              !validator.isAlpha(data["lastname"])
            ) {
              return cb(null, false);
            }
            // If email is valid and not a duplicate, mark it as processed
            processedEmails.push(data["email"]);
            return cb(null, true);
          })
          .on("data-invalid", (row, rowNumber) => {
            logger.error(
              `Row number ${rowNumber} in ${
                filename.split(/-(.+)/)[1]
              } with data ${JSON.stringify(row)} is invalid`
            );
            const error = new Error("CsvUploadError");
            error["statusCode"] = StatusCodes.UNPROCESSABLE_ENTITY;
            error["details"] = `Row number ${rowNumber} in ${
              filename.split(/-(.+)/)[1]
            } contains invalid data`;
            error["filename"] = filename.split(/-(.+)/)[1];
            errors.push(error);
          })
          .transform((data) => {
            logger.info("Transforming data....", data);
            data["firstname"] = _.capitalize(data["firstname"]);
            data["lastname"] = _.capitalize(data["lastname"]);
            return data;
          })
          .on("data", (row) => {
            csvCollection.push(row);
          })
          .on("error", (error) => {
            reject(error);
          })
          .on("end", async (data) => {
            await Promise.all(
              csvCollection.map(async (user: UserInterface) => {
                let createdUser;
                if (model === "student") {
                  createdUser = await createStudentAccount(user);
                }
                else if (model === "lecturer") {
                  createdUser = await createLecturerAccount(user);
                }
                results.push(createdUser);
              })
            );
            // Remove file
            logger.info("removing file......%j", filename);
            fs.unlinkSync(currentFilePath);
            resolve(data);
          });
      });
    })
  );

  // Throw an error if there are any errors
  if (errors.length > 0) {
    const error = new Error("CsvFileError");
    error["statusCode"] = StatusCodes.UNPROCESSABLE_ENTITY;
    error["info"] = `Some file(s) had errors in processing`;
    error["details"] = errors;
    throw error;
  }
  // Return nothing if there are no errors
  return results;
}
