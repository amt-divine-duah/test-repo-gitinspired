import { NextFunction, Request, Response } from "express";
import { prisma } from "../configs/prismaConfig";
import {
  loginSchemaValidation,
  resetPasswordSchemaValidation,
} from "../dtos/authDTO";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ResponseUtil } from "../utils/Response";
import { compare } from "bcryptjs";
import { generateAuthToken } from "../utils/GeneralUtils";
import _ from "lodash";
import hasher from "../utils/hashPassword";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    // Login user
    const loginData = req.body;
    const { emailOrId } = loginData;

    await loginSchemaValidation(req);
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            loginId: emailOrId,
          },
          {
            email: emailOrId,
          },
        ],
      },
    });
    if (!user) {
      return ResponseUtil.sendError(
        res,
        "Invalid credentials. Try again",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }
    const isValidPassword = await compare(loginData.password, user.password);
    if (!isValidPassword) {
      return ResponseUtil.sendError(
        res,
        "Invalid credentials. Try again",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }

    if (!user.isActive) {
      return ResponseUtil.sendError(
        res,
        "Please activate your account and try again",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }

    const filteredUser = _.pick(user, ["id", "email", "loginId"]);
    const token = generateAuthToken(user);
    const response = {
      ...filteredUser,
      ...token,
    };

    return ResponseUtil.sendResponse(
      res,
      "User logged in successfully",
      response
    );
  }
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    const passwordData = req.body;

    await resetPasswordSchemaValidation(req);

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ loginId: passwordData.userId }, { email: passwordData.email }],
      },
    });
    if (!user) {
      return Error("User not found");
    }
    //hash password
    const hashedPassword = await hasher(passwordData.password);
    //change password in db
    const changed = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    const filteredUser = _.pick(changed, ["id", "email", "loginId"]);

    return ResponseUtil.sendResponse(
      res,
      "Password reset successfully",
      filteredUser
    );
  }
}
