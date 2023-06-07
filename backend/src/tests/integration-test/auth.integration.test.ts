import { Application } from "express";
import supertest from "supertest";
import configureApp from "../../app";
import { prisma } from "../../configs/prismaConfig";
import { generateAuthToken, generateJWT } from "../../utils/GeneralUtils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { hash } from "bcryptjs";

let testApp: Application;
const user = {
  email: "teststudent@gmail.com",
  loginId: "STD-ABEG5435",
  firstName: "Daniel",
  lastName: "Mark",
};
beforeAll(async () => {
  testApp = configureApp();
  const results = await prisma.$transaction([
    prisma.student.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        studentId: user.loginId,
      },
    }),
    prisma.user.create({
      data: {
        email: user.email,
        loginId: user.loginId,
        password: await hash("Stud@123.", 12),
        role: "STUDENT",
      },
    }),
  ]);

});

describe("Auth Controller Process", () => {
  describe("[POST] api/auth/login", () => {
    test("it should respond with `200` status code when provided with valid credentials", async () => {
      const response = await supertest(testApp).post("/api/auth/login").send({
        emailOrId: "admin@gmail.com",
        password: "Admin@123",
      });
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.message).toBe("User logged in successfully");
    });

    test("It should return `422` status code if invalid request body is provided", async () => {
      const response = await supertest(testApp).post("/api/auth/login").send({
        emailOrId: "admin",
        password: "Admin@123",
      });
      expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(response.body.message).toBe(ReasonPhrases.UNPROCESSABLE_ENTITY);
    });

    test("It should return `400` status code if invalid email is provided", async () => {
      const response = await supertest(testApp).post("/api/auth/login").send({
        emailOrId: "myadmin@gmail.com",
        password: "Admin@123",
      });
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe("Invalid credentials. Try again");
    });

    test("It should return `400` status code if invalid password is provided", async () => {
      const response = await supertest(testApp).post("/api/auth/login").send({
        emailOrId: "admin@gmail.com",
        password: "Admin@12345",
      });
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe("Invalid credentials. Try again");
    });
    test("It should return `400` status code if account is not activated", async () => {
      const user = await prisma.user.create({
        data: {
          email: "seconduser@gmail.com",
          loginId: "ADM-ABEG5435",
          password: await hash("Admin@123", 12),
          createdAt: new Date("2023-06-04"),
          isActive: false,
          role: "ADMIN",
        },
      });
      const response = await supertest(testApp).post("/api/auth/login").send({
        emailOrId: user.email,
        password: "Admin@123",
      });
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe("Please activate your account");
    });
  });

  describe("[POST] api/auth/confirm-account/:token", () => {
    test("It should return `200` status code and success response if account is not activated", async () => {
      const user = {
        email: "teststudent@gmail.com",
        loginId: "STD-ABEG5435",
        firstName: "Daniel",
        lastName: "Mark",
      };
      const results = await prisma.$transaction([
        prisma.student.create({
          data: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            studentId: user.loginId,
          },
        }),
        prisma.user.create({
          data: {
            email: user.email,
            loginId: user.loginId,
            password: await hash("Stud@123.", 12),
            role: "STUDENT",
          },
        }),
      ]);

      const { accessToken } = generateAuthToken(results[1]);
      const response = await supertest(testApp).get(
        `/api/auth/confirm-account/${accessToken}`
      );
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.message).toBe("You can now update your password");
    });

    test("It should return `409` status code and if account is has been activated", async () => {
      const user = {
        email: "teststudent2@gmail.com",
        loginId: "STD-ABEH5435",
        firstName: "Billie",
        lastName: "Franklin",
      };
      const results = await prisma.$transaction([
        prisma.student.create({
          data: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            studentId: user.loginId,
          },
        }),
        prisma.user.create({
          data: {
            email: user.email,
            loginId: user.loginId,
            password: await hash("Stud@123.", 12),
            role: "STUDENT",
            isActive: true
          },
        }),
      ]);

      const { accessToken } = generateAuthToken(results[1]);
      const response = await supertest(testApp).get(
        `/api/auth/confirm-account/${accessToken}`
      );
      expect(response.status).toBe(StatusCodes.CONFLICT);
      expect(response.body.message).toBe(
        "User account has already been confirmed"
      );
    });

    test("It should return `400` status code if invalid token is provided", async () => {
      const response = await supertest(testApp).get(
        `/api/auth/confirm-account/stdiksad123`
      );
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe("Invalid or expired Token");
    });

    test("It should return `400` status code if invalid token is provided", async () => {
        const payload = {
          userId: "STD-ABE1235",
          tokenType: "TEST_AUTH",
        };
        const expiresIn = "30m";
        const token = generateJWT(payload, {
          expiresIn: expiresIn,
        });
      const response = await supertest(testApp).get(
        `/api/auth/confirm-account/${token}`
      );
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe("Invalid or expired token");
    });
  });
});
