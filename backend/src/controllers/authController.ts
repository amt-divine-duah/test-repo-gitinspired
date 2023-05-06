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
        "Please activate your account",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }

    const filteredUser = _.pick(user, ["id", "email", "loginId", "role"]);
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
    if (payload["tokenType"] !== TokenType.USER_AUTH || !payload["userId"]) {
      return ResponseUtil.sendError(
        res,
        "Invalid or expired token",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }
    const userId = payload["userId"];
    const getUser = await prisma.user.findFirst({
      where: {
        loginId: userId,
      },
    });
    if (getUser.isActive) {
      return ResponseUtil.sendError(
        res,
        "User account has already been confirmed",
        StatusCodes.CONFLICT,
        ReasonPhrases.CONFLICT
      );
    }

    // const updateUser = await prisma.user.update({
    //   where: {
    //     loginId: userId,
    //   },
    //   data: {
    //     isActive: true,
    //   },
    // });

    // const response = { payload, updateUser };
    return ResponseUtil.sendResponse(
      res,
      "You can now update your password",
      null
    );
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    const passwordData = req.body;

    const payload = validateToken(passwordData.token);

    logger.info("%j", payload);

    if (!payload) {
      return ResponseUtil.sendError(
        res,
        "Invalid or expired Token",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }
    if (payload["tokenType"] !== TokenType.USER_AUTH || !payload["userId"]) {
      return ResponseUtil.sendError(
        res,
        "Invalid or expired token",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }
    const userId = payload["userId"];
    await resetPasswordSchemaValidation(req);

    const user = await prisma.user.findFirstOrThrow({
      where: {
        loginId: userId,
      },
    });

    if (user.isActive) {
      return ResponseUtil.sendError(
        res,
        "User account has already been confirmed",
        StatusCodes.CONFLICT,
        ReasonPhrases.CONFLICT
      );
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
        isActive: true,
      },
    });

    return ResponseUtil.sendResponse(res, "Password reset successfully", null);
  }
}
