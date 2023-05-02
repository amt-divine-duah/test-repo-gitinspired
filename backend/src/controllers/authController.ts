import { NextFunction, Request, Response } from "express";
import { prisma } from "../configs/prismaConfig";
import { loginSchemaValidation } from "../dtos/authDTO";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ResponseUtil } from "../utils/Response";
import { compare } from "bcryptjs";
import { generateAuthToken } from "../utils/GeneralUtils";
import _ from "lodash";

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

    const filteredUser = _.pick(user, ["id", "email", "loginId"])
    const token = generateAuthToken(user)
    const response = {
        ...filteredUser,
        ...token
    }

    return ResponseUtil.sendResponse(res, "User logged in successfully", response);
  }
  async register() {
    
  }
}
