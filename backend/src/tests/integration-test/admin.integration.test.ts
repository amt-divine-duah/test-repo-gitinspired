import supertest from "supertest";
import { resetDb, userPayload } from "../testHelper";
import configureApp from "../../app";
import { Application } from "express";
import { generateAuthToken, generateJWT } from "../../utils/GeneralUtils";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../configs/prismaConfig";
import { User } from "@prisma/client";
import { TokenType } from "../../constants/TokenType";
import { hash } from "bcryptjs";

let testApp: Application;
let accessToken: string;
beforeAll(async () => {
  testApp = configureApp();
  const admin = await prisma.user.findFirst({
    where: {
      email: "admin@gmail.com",
    },
  });
  const authToken = generateAuthToken(admin);
  accessToken = authToken.accessToken;
});


// afterAll(async () => {
//   await resetDb();
//   await prisma.$disconnect();
// });

describe("Admin Controller Process", () => {

  describe("[POST] api/admin/create-student", () => {
    test("should respond with a `200` status code and Student details", async () => {
      const response = await supertest(testApp)
        .post("/api/admin/create-student")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(userPayload);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.message).toBe("Student created successfully");
    });

    test("It should return `422` status code if invalid request body is provided", async () => {
      const response = await supertest(testApp)
        .post("/api/admin/create-student")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
    });

    test("It should return `400` status code if invalid token is provided", async () => {
      const response = await supertest(testApp)
        .post("/api/admin/create-student")
        .set("Authorization", `Bearer 123deaf`);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });


    test("It should return `401` status code if authorization headers is not set", async () => {
      const response = await supertest(testApp).post(
        "/api/admin/create-student"
      );
      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    });

    test("It should return `400` status code if invalid token payload is provided", async () => {
      const payload = {
        userId: "STD-ABE1235",
        tokenType: "TEST_AUTH",
      };
      const expiresIn = "30m";
      const token = generateJWT(payload, {
        expiresIn: expiresIn,
      });
      const response = await supertest(testApp)
        .post("/api/admin/create-student")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe("Invalid or expired token");
    });

    test("It should return `403` status code if user is forbidden to access the route", async () => {
      
      const user = await prisma.user.create({
        data: {
          email: "test@example.com",
          loginId: "STD-ABE1235",
          password: await hash("password", 12),
          createdAt: new Date("2023-06-04"),
          isActive: true,
          role: "LECTURER",
        },
      });
      const { accessToken } = generateAuthToken(user);
      const response = await supertest(testApp)
        .post("/api/admin/create-student")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(StatusCodes.FORBIDDEN);
      expect(response.body.message).toBe("Access Forbidden");
    });

  });

  describe("[POST] api/admin/create-lecturer", () => {
    test("should respond with a `200` status code and Lecturer details", async () => {
      const response = await supertest(testApp)
        .post("/api/admin/create-lecturer")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          email: "johnkuma@gmail.com",
          firstname: "John",
          lastname: "Kumapley",
        });
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.message).toBe("Lecturer created successfully");
    });
  });

  describe("[GET] api/admin/lecturers", () => {
    test("should respond with a `200` status code and list of lecturers", async () => {
      const response = await supertest(testApp)
        .get("/api/admin/lecturers")
        .set("Authorization", `Bearer ${accessToken}`)
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.message).toBe("List of Lecturers");
    });
  });

  describe("[GET] api/admin/students", () => {
    test("should respond with a `200` status code and list of students", async () => {
      const response = await supertest(testApp)
        .get("/api/admin/students")
        .set("Authorization", `Bearer ${accessToken}`)
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.message).toBe("List of Students");
    });

  });

  describe("[GET] api/admin/assignments", () => {
    test("should respond with a `200` status code and list of assignments", async () => {
      const response = await supertest(testApp)
        .get("/api/admin/assignments")
        .set("Authorization", `Bearer ${accessToken}`)
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.message).toBe("Assignments fetched successfully");
    });

  });
  describe("[GET] api/admin/submissions", () => {
    test("should respond with a `200` status code and list of submissions", async () => {
      const response = await supertest(testApp)
        .get("/api/admin/submissions")
        .set("Authorization", `Bearer ${accessToken}`)
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.message).toBe("Submissions fetched successfully");
    });

  });
});
