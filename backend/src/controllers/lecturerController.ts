import { NextFunction, Request, Response } from "express";
import { generateUniqueCode } from "../utils/GeneralUtils";
import _, { take } from "lodash";
import { prisma } from "../configs/prismaConfig";
import { ResponseUtil } from "../utils/Response";
import logger from "../configs/winstonConfig";

export class LecturerController {
  async createAssignment(req: Request, res: Response, next: NextFunction) {
    const students = req.body.students; //array of student ids
    const studentIds = students.map((i) => {
      return {
        status: false,
        student: {
          connect: {
            id: i,
          },
        },
      };
    });
    console.log(studentIds);
    const results = await prisma.assignment.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        course: req.body.course,
        deadline: req.body.deadline,
        isPublished: req.body.publish,
        uniqueCode: await generateUniqueCode(),
        students: {
          create: studentIds,
        },
      },
    });
    return ResponseUtil.sendResponse(
      res,
      "assignment created successfully",
      results
    );
  }

  async editAssignment(req: Request, res: Response, next: NextFunction) {
    if (req.method === "GET") {
      //must return information on the saved assignments and invited students
      const id = req.body.assignmentId;
      //get students
      const students = await prisma.studentsOnAssignments.findMany({
        where: {
          assignmentId: id,
        },
        select: {
          studentId: true,
        },
      });
      //get assignment details for populating form fields
      const assignment = await prisma.assignment.findFirst({
        where: {
          id: id,
        },
      });

      return ResponseUtil.sendResponse(res, "students on assignment", {
        assignment: assignment,
        students: students,
      });
    }

    if (req.method === "POST") {
      const id = req.body.assignmentId;
      //update with given assignment info
      const assignment = prisma.assignment.update({
        where: {
          id: id,
        },
        data: {
          title: req.body.title,
          deadline: req.body.deadline,
          description: req.body.description,
          course: req.body.course,
        },
      });
      //get invited student
    }
  }

  async getSubmissions(req: Request, res: Response, next: NextFunction) {
    //get all published assignments
    const assignments = await prisma.assignment.findMany({
      where: {
        isPublished: true,
      },
    });
    return ResponseUtil.sendResponse(res, "assignment list", assignments);
  }
}
