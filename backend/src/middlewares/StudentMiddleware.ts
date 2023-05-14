import { NextFunction, Request, Response } from "express";
import { prisma } from "../configs/prismaConfig";
import { ResponseUtil } from "../utils/Response";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class StudentMiddleware {
  static async checkStudentStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // get the payload from the request object
    const payload = req["tokenPayload"];
    const userId = payload["userId"];

    const user = await prisma.user.findFirstOrThrow({
      where: {
        loginId: userId,
      },
    });
    if (user.role !== "STUDENT") {
      return ResponseUtil.sendError(
        res,
        "Access Forbidden",
        StatusCodes.FORBIDDEN,
        ReasonPhrases.FORBIDDEN
      );
    }
    next();
  }
}