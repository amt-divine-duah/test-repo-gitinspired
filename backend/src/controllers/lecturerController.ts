import { NextFunction, Request, Response } from "express";
import { generateUniqueCode } from "../utils/GeneralUtils";
import _, { result, take } from "lodash";
import { prisma } from "../configs/prismaConfig";
import { ResponseUtil } from "../utils/Response";
import sendAssignment from "../utils/sendAssignmentUtil";

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
    if (results.isPublished) {
      const studentsInfo = [];
      for (let i = 0; i < students.length; i++) {
        const email = await prisma.student.findFirst({
          where: {
            id: students[i],
          },
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        });
        studentsInfo.push(email);
      }
      const assignmentInfo = {
        title: results.title,
        deadline: results.deadline,
        uniqueCode: results.uniqueCode,
        link: `toBeImplemented`,
      };
      sendAssignment(assignmentInfo, studentsInfo);
    }

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
      const givenStudentIds = req.body.students;
      const oldIds = oldStudents.map((stud) => stud.studentId);
      const newStudents = [];
      //separate newly invite   d students from already invited students
      givenStudentIds.forEach((id) => {
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
      if (results.isPublished) {
        //send email to invited students posted to route, assuming assignment has not yet been published
        const studentsInfo = [];
        const assignmentInfo = {
          title: results.title,
          deadline: results.deadline,
          uniqueCode: results.uniqueCode,
          link: `toBeImplemented`,
        };
        for (let i = 0; i < givenStudentIds.length; i++) {
          const email = await prisma.student.findFirst({
            where: {
              id: givenStudentIds[i],
            },
            select: {
              email: true,
              firstName: true,
              lastName: true,
            },
          });
          studentsInfo.push(email);
        }
        sendAssignment(assignmentInfo, studentsInfo);
      }
      return ResponseUtil.sendResponse(res, "assignment list", newStudents);
    }
  }

  async getDrafts(req: Request, res: Response, next: NextFunction) {
    const lecturer = Number(req.body.lecturerId);
    const drafts = await prisma.assignment.findMany({
      where: {
        isPublished: false,
        lecturerId: lecturer,
      },
      select: {
        title: true,
        course: true,
        updatedAt: true,
        _count: {
          select: {
            students: true,
          },
        },
      },
    });
    return ResponseUtil.sendResponse(res, "drafts list for lecturer", drafts);
  }

  async getAssignments(req: Request, res: Response, next: NextFunction) {
    const lecturer = req.body.lecturerId;
    const assignments = await prisma.assignment.findMany({
      where: {
        lecturerId: lecturer,
      },
      select: {
        title: true,
        deadline: true,
        description: true,
        course: true,
        uniqueCode: true,
      },
    });
    return ResponseUtil.sendResponse(
      res,
      "assignment list for lecturer",
      assignments
    );
  }

  async getSubmissions(req: Request, res: Response, next: NextFunction) {
    const lecturer = Number(req.body.lecturerId);
    //get all published assignments with particular lecturer
    const assignments = await prisma.assignment.findMany({
      where: {
        lecturerId: lecturer,
        isPublished: true,
      },
      select: {
        title: true,
        id: true,
        course: true,
      },
    });

    const result = [];
    for (let i = 0; i < assignments.length; i++) {
      let work = assignments[i];
      const subs = await prisma.studentsOnAssignments.count({
        where: {
          assignmentId: work.id,
          status: false,
        },
      });
      result.push({ ...work, submissions: subs });
    }

    return ResponseUtil.sendResponse(res, "assignment list", result);
  }

  async inviteStudents(req: Request, res: Response, next: NextFunction) {
    const assignmentId = req.body.assignmentId;
    const givenStudents = req.body.students;
    //get students invited to that assignment
    const oldStudentsIds = await prisma.studentsOnAssignments.findMany({
      where: {
        assignmentId: assignmentId,
      },
      select: {
        studentId: true,
      },
    });
    const oldIds = oldStudentsIds.map((stud) => stud.studentId);
    const newStudents = [];
    //seperate old stuednts from new students
    //send email to new students only
  }
}
