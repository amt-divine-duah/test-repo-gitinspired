import { NextFunction, Request, Response } from "express";
import { ResponseUtil } from "../utils/Response";
import logger from "../configs/winstonConfig";
import { generateStudentId } from "../utils/GeneralUtils";
import { studentSchemaValidation } from "../dtos/adminDTO";
import generator from "generate-password";
import { prisma } from "../configs/prismaConfig";
import { hash } from "bcryptjs";
import _ from "lodash";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { csvToDb, getCsvFiles } from "../utils/databaseUtils";
import path from "path";

export class AdminController {
  async createStudent(req: Request, res: Response, next: NextFunction) {
    const studentData = req.body;

    // perform validations
    await studentSchemaValidation(req);

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
    // If user is created, add otp
    if (user) {
      const otp = await prisma.otp.create({
        data: {
          otpCode: tempPassword,
          userId: studentId,
        },
      });
    }
    const filteredUser = _.pick(user[1], ["email"]);
    const response = {
      ...user[0],
      ...filteredUser,
    };

    return ResponseUtil.sendResponse(res, "Student created successfully", response);
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

    await csvToDb(currentDir)

    return ResponseUtil.sendResponse(res, "Student information upload successful", null);
  }
}
