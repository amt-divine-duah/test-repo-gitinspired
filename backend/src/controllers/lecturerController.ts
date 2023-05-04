import { Assignment } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { generateUniqueCode } from "../utils/GeneralUtils";
import _, { take } from "lodash";
import { prisma } from "../configs/prismaConfig";
import { ResponseUtil } from "../utils/Response";

export class LecturerController {
  async createAssignment(req: Request, res: Response, next: NextFunction) {
    const students = req.body.students;
    const arr = students.split(",");
    const studentIds = [];
    arr.forEach((a) => {
      studentIds.push({
        status: false,
        student: {
          connect: {
            id: Number(a),
          },
        },
      });
    });

    // const studentIds = _.map(students, (stud) => {
    //   return { id: stud.id };
    // });
    // console.log(studentIds);
    const results = await prisma.assignment.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        course: req.body.course,
        deadline: req.body.deadline,
        isPublished: false,
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
    const id = req.body.assignment.id;
    //get students
    const students = await prisma.studentsOnAssignments.findMany({
      where: {
        assignmentId: Number(id),
      },
      select: {
        studentId: true,
      },
    });
    const assignment = await prisma.assignment.findFirst({
      where: {
        id: Number(id),
      },
    });

    return ResponseUtil.sendResponse(res, "students on assignment", {
      assignment: assignment,
      students: students,
    });
  }
}
