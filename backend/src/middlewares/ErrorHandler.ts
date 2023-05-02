import { Request, Response, NextFunction } from "express";
import logger from "../configs/winstonConfig";
import { ResponseUtil } from "../utils/Response";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";
import { ValidationErrorItem } from "../interfaces/ValidationErrorItem";

export class ErrorHandler {
  // Create a wrapper to handle errors
  static catchErrors(fn) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  static handleErrors(err: any, req: Request, res: Response, next: NextFunction) {
    // Handle not found error
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return ResponseUtil.sendError(res, err.message, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
    }

    if (err.details && err.message === "ValidationError" && err.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
      // format the errors
      const errors = ErrorHandler.formatErrors(err.details);
      return ResponseUtil.sendError(res, ReasonPhrases.UNPROCESSABLE_ENTITY, StatusCodes.UNPROCESSABLE_ENTITY, errors);
    }

    // if filetype is not accepted
    if (err.message === "Invalid file type") {
      return ResponseUtil.sendError(
        res,
        "Invalid file type",
        StatusCodes.UNPROCESSABLE_ENTITY,
        ReasonPhrases.UNPROCESSABLE_ENTITY
      );
    }

    // any other error
    logger.error("%j", err)
    console.dir(err, "I have this error")
    return ResponseUtil.sendError(
      res,
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR,
      ReasonPhrases.INTERNAL_SERVER_ERROR
    );
  }

  static formatErrors(details: ValidationErrorItem[]) {
    const errors = {};
    details.forEach((d) => {
      const key = d.path;
      if (!errors[key]) {
        errors[key] = [];
      }
      errors[key].push(d.msg);
    });

    return errors;
  }
}
