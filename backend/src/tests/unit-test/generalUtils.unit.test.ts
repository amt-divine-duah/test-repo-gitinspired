import * as GeneralUtils from "../../utils/GeneralUtils";
import { Assignment, User } from "@prisma/client";
import { TokenType } from "../../constants/TokenType";
import { prismaMock } from "../../singleton";

describe("General Utility Functions", () => {
  describe("Generate Auth Token", () => {
    test("It should return a valid auth token", () => {
      const user: User = {
        id: 1,
        email: "test@example.com",
        loginId: "STD-ABE1235",
        password: "password",
        createdAt: new Date("2023-06-04"),
        isActive: true,
        role: "ADMIN",
      };
      const token = GeneralUtils.generateAuthToken(user);
      expect(token).toBeDefined();
      expect(token).toHaveProperty("accessToken")
    });
  });

  describe("Validate JWT Token", () => {
    test("It should check for expired Token", () => {
      const payload = {
        userId: "STD-ABE1235",
        tokenType: TokenType.USER_AUTH,
      };
      const expiresIn = "1s";
      const token = GeneralUtils.generateJWT(payload, {
        expiresIn: expiresIn,
      });

      const timer = setTimeout(() => {
        expect(GeneralUtils.validateToken(token)).toBeFalsy();
      }, 5000);
      timer.unref();
    });

    test("It should check for valid Token", () => {
      const payload = {
        userId: "STD-ABE1235",
        tokenType: TokenType.USER_AUTH,
      };
      const expiresIn = "30m";
      const token = GeneralUtils.generateJWT(payload, {
        expiresIn: expiresIn,
      });

      expect(GeneralUtils.validateToken(token)).toBeDefined();
    });
  });

  describe("Get Existing Login IDs", () => {
    test("It should return existing login Ids in the database", async () => {
      const mockedUsers: User[] = [
        {
          id: 1,
          email: "test@example.com",
          loginId: "STD-ABE1235",
          password: "password",
          createdAt: new Date("2023-06-04"),
          isActive: true,
          role: "ADMIN",
        },
        {
          id: 2,
          email: "tes2t@example.com",
          loginId: "STD-EF1236S",
          password: "password",
          createdAt: new Date("2023-06-04"),
          isActive: true,
          role: "ADMIN",
        },
      ];
      // @ts-ignore
      prismaMock.user.findMany.mockResolvedValue(mockedUsers);

      const result = await GeneralUtils.getExistingIds();
      expect(result).toEqual(["STD-ABE1235", "STD-EF1236S"]);
      // Verify that prisma.user.findMany was called
      expect(prismaMock.user.findMany).toHaveBeenCalled();
    });
  });

  describe("Generate Student IDs", () => {
    test("It should generate unique student Ids", async () => {
      const mockedExistingIds = ["STD-ABE1235", "STD-EF1236S"];
      const getExistingIdsSpy = jest.spyOn(GeneralUtils, "getExistingIds").mockResolvedValue(mockedExistingIds)
      
      const result = await GeneralUtils.generateStudentId();
      expect(result).toMatch(/^STD-[A-Z0-9]{8}$/);
      expect(mockedExistingIds).not.toContain(result);
      expect(getExistingIdsSpy).toHaveBeenCalled()
    });
  });

  describe("Generate Lecturer IDs", () => {
    test("It should generate unique lecturer staff Id", async () => {
      const mockedExistingIds = ["LEC-S50DMLPD", "LEC-TTJCGMI3"];
      const getExistingIdsMock = jest.fn().mockResolvedValue(mockedExistingIds);
      jest.mock("../../utils/GeneralUtils", () => {
        getExistingIds: getExistingIdsMock;
      });
      const result = await GeneralUtils.generateLecturerId();
      
      expect(result).toMatch(/^LEC-[A-Z0-9]{8}$/);
      expect(mockedExistingIds).not.toContain(result);
    });
  });

  describe("Get Existing Assignment Codes", () => {
    test("It should return existing assignment codes in the database", async () => {
      const mockedAssignments: Assignment[] = [
        {
          id: 1,
          title: "Python",
          deadline: new Date("2023-06-04"),
          description: "This is the first Assignment",
          course: "Python",
          lecturerId: "LEC-S50DMLPD",
          uniqueCode: "8342097",
          isPublished: true,
          updatedAt: new Date("2023-06-04"),
        },
        {
          id: 2,
          title: "Java",
          deadline: new Date("2023-06-04"),
          description: "This is the second Assignment",
          course: "Java",
          lecturerId: "LEC-S50DMLPD",
          uniqueCode: "9211626",
          isPublished: true,
          updatedAt: new Date("2023-06-04"),
        },
      ];
      // @ts-ignore
      prismaMock.assignment.findMany.mockResolvedValue(mockedAssignments);

      const result = await GeneralUtils.getExistingCodes();
      expect(result).toEqual(["8342097", "9211626"]);
      // Verify that prisma.assignment.findMany was called
      expect(prismaMock.assignment.findMany).toHaveBeenCalled();
    });
  });

  describe("Generate Unique Assignment Code", () => {
    test("It should generate unique assignment code for every asssignment", async () => {
      const mockedExistingIds = ["8342097", "9211626"];
      jest.mock("../../utils/GeneralUtils", () => {
        getExistingCodes: jest.fn().mockResolvedValue(mockedExistingIds);
      });
      const result = await GeneralUtils.generateUniqueCode();
      expect(result).toMatch(/^\d{7}$/);
      expect(mockedExistingIds).not.toContain(result);
    });
  });
});
