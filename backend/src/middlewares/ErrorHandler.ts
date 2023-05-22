import { Request, Response, NextFunction } from 'express';
import logger from '../configs/winstonConfig';
import { ResponseUtil } from '../utils/Response';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Prisma } from '@prisma/client';
import {
  CsvErrorItem,
  ValidationErrorItem,
} from '../interfaces/ErrorsInterface';

export class ErrorHandler {
  // Create a wrapper to handle errors
  static catchErrors(fn) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  static handleErrors(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // Handle not found error
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2025'
    ) {
      return ResponseUtil.sendError(
        res,
        err.message,
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND
      );
    }
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      return ResponseUtil.sendError(
        res,
        'Snap has already been submitted',
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }

    if (
      err.details &&
      err.message === 'ValidationError' &&
      err.statusCode === StatusCodes.UNPROCESSABLE_ENTITY
    ) {
      // format the errors
      const errors = ErrorHandler.formatErrors(err.details);
      return ResponseUtil.sendError(
        res,
        ReasonPhrases.UNPROCESSABLE_ENTITY,
        StatusCodes.UNPROCESSABLE_ENTITY,
        errors
      );
    }

    // if filetype is not accepted
    if (err.message === 'Invalid file type') {
      return ResponseUtil.sendError(
        res,
        'Invalid file type',
        StatusCodes.UNPROCESSABLE_ENTITY,
        ReasonPhrases.UNPROCESSABLE_ENTITY
      );
    }

    if (
      err.message === 'CsvFileError' &&
      err.statusCode === StatusCodes.UNPROCESSABLE_ENTITY
    ) {
      const errors = ErrorHandler.formatCsvErrors(err.details);
      return ResponseUtil.sendError(
        res,
        err['info'],
        StatusCodes.UNPROCESSABLE_ENTITY,
        errors
      );
    }

    // any other error
    console.log('error I have any other error', err);
    return ResponseUtil.sendError(
      res,
      'Something went wrong',
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
  static formatCsvErrors(details: CsvErrorItem[]) {
    const errors = {};
    details.forEach((d) => {
      const key = d.filename;
      if (!errors[key]) {
        errors[key] = [];
      }
      errors[key].push(d.details);
    });

    return errors;
  }
}
