import { Request } from "express";
import { checkSchema, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import validator from "validator";

export async function resetPasswordSchemaValidation(req: Request) {
  await checkSchema(
    {
      password: {
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          },
          errorMessage: "Password requirement not met",
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.confirmPassword) return false;
            return true;
          },
          errorMessage: "Passwords do not match",
        },
      },
    },
    ["body"]
  ).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Create error object and throw validation Error
    const error = new Error("ValidationError");
    error["statusCode"] = StatusCodes.UNPROCESSABLE_ENTITY;
    error["details"] = errors.array();
    throw error;
  }
}

export async function loginSchemaValidation(req: Request) {
  await checkSchema(
    {
      emailOrId: {
        custom: {
          options: (value, { req }) => {
            if (validator.isEmail(value)) {
              return true;
            }
            if (
              typeof value === "string" &&
              value.includes("-") &&
              value.length >= 8
            ) {
              return true;
            }
            // Invalid email or ID
            return false;
          },
          errorMessage: "Invalid email or ID",
        },
      },
      password: {
        isLength: {
          bail: true,
          options: {
            min: 8,
          },
          errorMessage: "Password should be at least 8 characters",
        },
        isStrongPassword: {
          bail: true,
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          },
          errorMessage: "password requirements not met"
        },
      },
    },
    ["body"]
  ).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Create error object and throw validation Error
    const error = new Error("ValidationError");
    error["statusCode"] = StatusCodes.UNPROCESSABLE_ENTITY;
    error["details"] = errors.array();
    throw error;
  }
}
