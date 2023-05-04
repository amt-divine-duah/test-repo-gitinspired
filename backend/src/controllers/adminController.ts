import { NextFunction, Request, Response } from "express";
import { ResponseUtil } from "../utils/Response";
import logger from "../configs/winstonConfig";
import {
  generateAuthToken,
  generateLecturerId,
  generateStudentId,
  validateToken,
} from "../utils/GeneralUtils";
import { schemaValidation } from "../dtos/adminDTO";
import generator from "generate-password";
import { prisma } from "../configs/prismaConfig";
import { hash } from "bcryptjs";
import _, { take } from "lodash";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { csvToDb, getCsvFiles } from "../utils/databaseUtils";
import path from "path";
import { mailOptionsInterface } from "../interfaces/mailOptionsInterface";
import { EMAIL_ACTIVATION_SUBJECT } from "../constants/messages";
import { confirmAccountTemplate } from "../templates/activateAccount";
import transporter from "../configs/nodemailerConfig";
import configValues from "../configs/config";
import { Token, TokenClass } from "typescript";
import { JwtPayload } from "jsonwebtoken";
import { faker } from "@faker-js/faker";

export class AdminController {
  //confirm account
  async confirmAccount(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;
    const payload = validateToken(token);
    if (!payload) {
      return ResponseUtil.sendError(
        res,
        "Invalid or expired Token",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }
    const userId = payload["userId"];
    logger.info(userId);
    const getUser = await prisma.user.findFirst({
      where: {
        loginId: userId,
      },
    });
    if (getUser.isActive) {
      return ResponseUtil.sendError(
        res,
        "User account has already been confirmed",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }

    const updateUser = await prisma.user.update({
      where: {
        loginId: userId,
      },
      data: {
        isActive: true,
      },
    });

    const response = { payload, updateUser };
    return ResponseUtil.sendResponse(
      res,
      "Account confirmed successfully",
      response
    );
  }

  async createStudent(req: Request, res: Response, next: NextFunction) {
    const studentData = req.body;

    // perform validations
    await schemaValidation(req);

    logger.info("%j", studentData);
    const tempPassword = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      strict: true,
    });
    const studentId = await generateStudentId();
    const user = await prisma.$transaction([
      prisma.student.create({
        data: {
          studentId: studentId,
          firstName: studentData.firstname,
          lastName: studentData.lastname,
        },
      }),
      prisma.user.create({
        data: {
          loginId: studentId,
          email: studentData.email,
          role: "STUDENT",
          password: await hash(tempPassword, 12),
        },
      }),
    ]);
    // If user is created, add otp.
    if (user) {
      const otp = await prisma.otp.create({
        data: {
          otpCode: tempPassword,
          userId: studentId,
        },
      });
      // If otp was created, send email with verification link
      if (otp) {
        const token = generateAuthToken(user[1]);
        const filteredUser = _.pick(user[1], ["email"]);
        let message = confirmAccountTemplate(
          filteredUser.email,
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
    const filteredUser = _.pick(user[1], ["email"]);
    const response = {
      ...user[0],
      ...filteredUser,
    };

    return ResponseUtil.sendResponse(
      res,
      "Student created successfully",
      response
    );
  }

  async uploadStdInfo(req: Request, res: Response, next: NextFunction) {
    if (!req.files || !req.files.length) {
      return ResponseUtil.sendError(
        res,
        "File cannot be empty",
        StatusCodes.UNPROCESSABLE_ENTITY,
        ReasonPhrases.UNPROCESSABLE_ENTITY
      );
    }

    const currentDir = path.resolve(`src/uploads/students`);

    await csvToDb(currentDir);

    return ResponseUtil.sendResponse(
      res,
      "Student information upload successful",
      null
    );
  }

  async createLecturer(req: Request, res: Response, next: NextFunction) {
    const lecturerData = req.body;

    // perform validations
    await schemaValidation(req);

    logger.info("%j", lecturerData);
    const tempPassword = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      strict: true,
    });
    const lecturerId = await generateLecturerId();
    const user = await prisma.$transaction([
      prisma.lecturer.create({
        data: {
          staffId: lecturerId,
          firstName: lecturerData.firstname,
          lastName: lecturerData.lastname,
        },
      }),
      prisma.user.create({
        data: {
          loginId: lecturerId,
          email: lecturerData.email,
          role: "LECTURER",
          password: await hash(tempPassword, 12),
        },
      }),
    ]);
    // If user is created, add otp
    if (user) {
      const otp = await prisma.otp.create({
        data: {
          otpCode: tempPassword,
          userId: lecturerId,
        },
      });

      if (otp) {
        // If otp was created, send email with verification link
        const token = generateAuthToken(user[1]);
        const filteredUser = _.pick(user[1], ["email"]);
        let message = confirmAccountTemplate(
          filteredUser.email,
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

    const filteredUser = _.pick(user[1], ["email"]);
    const response = {
      ...user[0],
      ...filteredUser,
    };

    return ResponseUtil.sendResponse(
      res,
      "Lecturer created successfully",
      response
    );
  }

  async uploadLecInfo(req: Request, res: Response, next: NextFunction) {
    if (!req.files || !req.files.length) {
      return ResponseUtil.sendError(
        res,
        "File cannot be empty",
        StatusCodes.UNPROCESSABLE_ENTITY,
        ReasonPhrases.UNPROCESSABLE_ENTITY
      );
    }

    const currentDir = path.resolve(`src/uploads/lecturers`);

    await csvToDb(currentDir);

    return ResponseUtil.sendResponse(
      res,
      "Lecturer information upload successful",
      null
    );
  }

  async getLecturers(req: Request, res: Response, next: NextFunction) {
    const { page } = req.params;
    let skipNum: number = (Number(page) - 1) * 14;
    let takeNum: number = 14;

    const results = await prisma.lecturer.findMany({
      skip: skipNum,
      take: takeNum,
      orderBy: {
        lastName: "asc",
      },
    });

    const totalRecords = await prisma.lecturer.count();

    if (results && totalRecords) {
      return ResponseUtil.sendResponse(res, "Lecturers List", results, 200, {
        total: totalRecords, // total number of records
        currentPage: Number(page), // current page number
        pageSize: 14, // page size
      });
    }
  }

  async getStudents(req: Request, res: Response, next: NextFunction) {
    const { page } = req.params;
    let skipNum = (Number(page) - 1) * 14;
    let takeNum = 14;

    const results = await prisma.student.findMany({
      skip: skipNum,
      take: takeNum,
      orderBy: {
        lastName: "asc",
      },
    });

    const totalRecords = await prisma.student.count();

    if (results && totalRecords) {
      return ResponseUtil.sendResponse(res, "Students List", results, 200, {
        total: totalRecords, // total number of records
        currentPage: Number(page), // current page number
        pageSize: 14, // page size
      });
    }
  }
}
