import { Request } from "express"
import { checkSchema, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../configs/prismaConfig";

export async function studentSchemaValidation(req: Request) {
    await checkSchema(
      {
        email: {
          notEmpty: {
            bail: true,
            errorMessage: "email cannot be empty"
          },
          isEmail: {
            bail: true,
            errorMessage: "enter a valid email"
          },
          custom: {
            options: async (value, {req}) => {
                const data = await prisma.user.findUnique({
                      where: {
                          email: value
                      }
                  });
                  if (data !== null) {
                      return Promise.reject("Email is already in use");
                  }

            }
          }
        },
        firstname: {
          notEmpty: {
            bail: true,
            errorMessage: "First name cannot be empty"
          },
          isString: {
            bail: true,
            errorMessage: "Enter a valid first name"
          },
          isAlpha: {
            errorMessage: "Enter a valid first name"
          }
        },
        lastname: {
          notEmpty: {
            bail: true,
            errorMessage: "Last name cannot be empty"
          },
          isString: {
            bail: true,
            errorMessage: "Enter a valid last name"
          },
          isAlpha: {
            errorMessage: "Enter a valid last name"
          }
        }
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
  