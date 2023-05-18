import { NextFunction, Request, Response } from "express";
import { prisma } from "../configs/prismaConfig";
import {
  loginSchemaValidation,
  resetPasswordSchemaValidation,
} from "../dtos/authDTO";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ResponseUtil } from "../utils/Response";
import { compare } from "bcryptjs";
import { generateAuthToken, validateToken } from "../utils/GeneralUtils";
import _ from "lodash";
import hasher from "../utils/hashPassword";
import logger from "../configs/winstonConfig";
import { TokenType } from "../constants/TokenType";

export class CliController {
  async validateConfig(req: Request, res: Response, next: NextFunction) {
    const { uniqueCode, studentId } = req.body;
    const assignment = await prisma.assignment.findFirstOrThrow({
      where: {
        uniqueCode: uniqueCode,
      },
      include: {
        students: {
          select: {
            studentId: true,
          },
        },
      },
    });
    const students = assignment.students.map((id) => id.studentId);
    if (assignment && students.includes(studentId)) {
      return ResponseUtil.sendResponse(
        res,
        "Validation successful",
        assignment
      );
    }
    return ResponseUtil.sendError(
      res,
      "Invalid config credentials. Reconfigure",
      StatusCodes.BAD_REQUEST,
      ReasonPhrases.BAD_REQUEST
    );
  }
}
