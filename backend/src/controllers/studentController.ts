import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { prisma } from "../configs/prismaConfig";
import { ResponseUtil } from "../utils/Response";

export class StudentController {
  async getAssignments(req: Request, res: Response, next: NextFunction) {
    const studentId = req["tokenPayload"]["userId"];

    //get assignment ids
    const assignmentIds = await prisma.studentsOnAssignments.findMany({
      where: {
        studentId: studentId,
        status: false
      },
      select: {
        assignmentId: true,
      },
    });
    const ids = assignmentIds.map((id) => id.assignmentId);
    //get published assignments
    const assignments = await prisma.assignment.findMany({
      where: {
        id: { in: ids },
        isPublished: false,
      },
      include:{
        createdBy: true,
      }
    });
    
    return ResponseUtil.sendResponse(
      res,
      "List of assignments given to user",
      {assignments}
    );
  }

  async getAssignmentInfo(req: Request, res: Response, next: NextFunction) {
    const { assignmentId } = req.params;
    const assignmentID = Number(assignmentId);
    //check if student has access to assignment
    const studentId = req["tokenPayload"]["userId"];
    //get students on assignment
    const students = await prisma.studentsOnAssignments.findMany({
      where: {
        assignmentId: assignmentID,
      },
      select: {
        studentId: true,
      },
    });
    const studentList = students.map((id) => id.studentId);
    //if student list does not include studentid or assignment is not published, return forbidden
    const assignment = await prisma.assignment.findFirst({
      where: {
        id: assignmentID,
      },
    });
    if (!studentList.includes(studentId) || !assignment.isPublished) {
      return ResponseUtil.sendError(
        res,
        "You don't access to this assignment",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }
    //otherwise, return assignment
    return ResponseUtil.sendResponse(res, "Assignment details", assignment);
  }
}
