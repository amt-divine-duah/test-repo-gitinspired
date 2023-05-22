import { NextFunction, Request, Response } from 'express';
import { prisma } from '../configs/prismaConfig';
import {
  loginSchemaValidation,
  resetPasswordSchemaValidation,
} from '../dtos/authDTO';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ResponseUtil } from '../utils/Response';
import { compare } from 'bcryptjs';
import { generateAuthToken, validateToken } from '../utils/GeneralUtils';
import _ from 'lodash';
import hasher from '../utils/hashPassword';
import logger from '../configs/winstonConfig';
import { TokenType } from '../constants/TokenType';

export class CliController {
  async submit(req: Request, res: Response, next: NextFunction) {
    const { uniqueCode, studentId, password, snapName } = req.body;
    //first validate user cred. if not found, return err
    const student = await prisma.user.findFirstOrThrow({
      where: {
        loginId: studentId,
      },
    });
    const isValidStudent = await compare(password, student.password);
    logger.info(isValidStudent);
    if (!student || !isValidStudent) {
      return ResponseUtil.sendError(
        res,
        'Invalid config credentials. Please reconfigure',
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }
    //check for assignment
    const deadline = Date.now();
    const assignment = await prisma.assignment.findFirstOrThrow({
      where: {
        uniqueCode: uniqueCode,
        isPublished: true,
      },
      include: {
        students: {
          select: {
            studentId: true,
          },
        },
      },
    });
    if (!assignment) {
      return ResponseUtil.sendError(
        res,
        'Invalid assignment code. Please reconfigure',
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }
    
    if(Date.parse(assignment.deadline)>=deadline){
      return ResponseUtil.sendError(
        res,
        'Can no longer submit after deadline',
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }
    //check if student is invited
    const students = assignment.students.map((id) => id.studentId);
    if (!students.includes(studentId)) {
      return ResponseUtil.sendError(
        res,
        'Invalid config credentials. Please reconfigure',
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }

    //make entry into student-assignment model, set status to true

    //create array of snaps to be stored in submissions table
    const entries = snapName.map((snap: string) => {
      return {
        snapshotName: snap,
      };
    });
    //store in submissions table
    const relation = await prisma.studentsOnAssignments.update({
      where: {
        studentId_assignmentId: {
          studentId: studentId,
          assignmentId: assignment.id,
        },
      },
      data: {
        status: true,
        Submissions: {
          create: entries,
        },
      },
    });

    if (relation) {
      return ResponseUtil.sendResponse(
        res,
        'Validation and submission successful',
        relation
      );
    }
  }

  async sendMail(req: Request, res: Response, next: NextFunction){
    //query database for all status equal true
  };
}
