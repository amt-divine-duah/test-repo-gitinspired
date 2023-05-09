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
    const results = await prisma.assignment.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        course: req.body.course,
        deadline: req.body.deadline,
        isPublished: req.body.publish,
        uniqueCode: await generateUniqueCode(),
        createdBy: {
          connect: {
            id: req.body.createdBy,
          },
        },
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
    const id = Number(req.body.assignmentId);
    //get students
    const oldStudents = await prisma.studentsOnAssignments.findMany({
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
    if (req.method === "GET") {
      //must return information on the saved assignment and invited students
      return ResponseUtil.sendResponse(res, "students on assignment", {
        assignment: assignment,
        students: oldStudents,
      });
    }

    if (req.method === "POST") {
      //get newly invited students without already invited students
      const newStudentIds = req.body.students;
      const oldIds = oldStudents.map((stud) => stud.studentId);

      const newStudents = [];
      newStudentIds.forEach((id) => {
        if (!oldIds.includes(id)) {
          newStudents.push({
            status: false,
            student: {
              connect: {
                id: id,
              },
            },
          });
        }
      });
      const results = await prisma.assignment.update({
        where: {
          id: id,
        },
        data: {
          title: req.body.title,
          description: req.body.description,
          course: req.body.course,
          deadline: req.body.deadline,
          isPublished: req.body.publish,
          students: {
            create: newStudents,
          },
        },
      });
      return ResponseUtil.sendResponse(res, "assignment list", newStudents);
      //update with given assignment info and update invited students list
      // const assignment = prisma.assignment.update({
      //   where: {
      //     id: id,
      //   },
      //   data: {
      //     title: req.body.title,
      //     deadline: req.body.deadline,
      //     description: req.body.description,
      //     course: req.body.course,
      //     isPublished: req.body.publish,
      //   },
      // });
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
