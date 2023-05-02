import { Request } from "express";
import { checkSchema, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import validator from "validator";

export async function loginSchemaValidation(req: Request) {
  await checkSchema(
    {
      emailOrId: {
        custom: {
          options: (value, { req }) => {
            if (validator.isEmail(value)) {
              return true;
            }
            if (typeof value === "string" && value.includes("-") && value.length >= 8) {
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
          options: { min: 6 },
          errorMessage: "Password should be at least 6 characters long",
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
