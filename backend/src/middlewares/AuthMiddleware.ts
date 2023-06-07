import { NextFunction, Response, Request } from "express";
import logger from "../configs/winstonConfig";
import { ResponseUtil } from "../utils/Response";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { validateToken } from "../utils/GeneralUtils";
import { TokenType } from "../constants/TokenType";

export class AuthMiddleware {
  // function to authenticate users
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    // Get token from headers
    try {
      const { authorization: tokenHeader } = req.headers;
      // Check for header (if none return error)
      if (!tokenHeader) {
        return ResponseUtil.sendError(
          res,
          "Token not provided",
          StatusCodes.UNAUTHORIZED,
          ReasonPhrases.UNAUTHORIZED
        );
      }
      // Get the token and validate the token
      const token = tokenHeader.split(" ")[1];
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
      // Get the payload from the token and add to request object
      req["tokenPayload"] = payload;
    } catch (error) {
      logger.error(error);
      return ResponseUtil.sendError(
        res,
        "Invalid Authorization Header",
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED
      );
    }
    // next function
    next();
  }
}
