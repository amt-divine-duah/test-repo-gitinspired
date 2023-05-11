import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import configValues from "../configs/config";
import { TokenType } from "../constants/TokenType";
import { customAlphabet } from "nanoid";
import { prisma } from "../configs/prismaConfig";
import _ from "lodash";

// Generate confirmation Token
export function generateJWT(payload: object, options?: object) {
  const secretKey = configValues.SECRET_KEY;
  const defaultOptions = {
    expiresIn: configValues.JWT_TOKEN_EXPIRATION,
  };

  return jwt.sign(payload, secretKey, Object.assign(defaultOptions, options));
}

export function generateAuthToken(user: User) {
  const accessToken = generateJWT({
    userId: user.loginId,
    tokenType: TokenType.USER_AUTH,
  });
  return {
    accessToken: accessToken,
  };
}

export function validateToken(token: string) {
  try {
    return jwt.verify(token, configValues.SECRET_KEY);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getExistingIds() {
  const users = await prisma.user.findMany();
  const loginIds = _.map(users, "loginId");
  return loginIds;
}

export async function generateStudentId() {
  let studentId: string;
  const existingIds = await getExistingIds();
  do {
    const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8);
    studentId = "STD-" + nanoid();
  } while (studentId in existingIds);

  return studentId;
}

export async function generateLecturerId() {
  let lecturerId: string;
  const existingIds = await getExistingIds();
  do {
    const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8);
    lecturerId = "LEC-" + nanoid();
  } while (lecturerId in existingIds);

  return lecturerId;
}

export async function generateUniqueCode() {
  let uniqueCode: string;
  const existingCodes = await getExistingCodes();
  do {
    const nanoid = customAlphabet("0123456789", 7);
    uniqueCode = nanoid();
  } while (uniqueCode in existingCodes);

  return uniqueCode;
}

async function getExistingCodes() {
  const assignments = await prisma.assignment.findMany();
  const codes = _.map(assignments, "uniqueCode");
  return codes;
}
