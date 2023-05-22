import { compare } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import transporter from '../configs/nodemailerConfig';
import { prisma } from '../configs/prismaConfig';
import logger from '../configs/winstonConfig';
import { SUBMISSION_NOTIFICATION } from '../constants/messages';
import { mailOptionsInterface } from '../interfaces/mailOptionsInterface';
import { successSubmissionTemplate } from '../templates/successSubmission';
import { ResponseUtil } from '../utils/Response';

export class CliController {
  async submit(req: Request, res: Response, next: NextFunction) {
    const { uniqueCode, studentId, password, snapName } = req.body;
    //first validate user cred. if not found, return err
    const student = await prisma.user.findFirstOrThrow({
      where: {
        loginId: studentId,
      },
    });
    const isValidStudent = await compare(student.password, password);
    // logger.info(isValidStudent);
    if (!student || !isValidStudent) {
      return ResponseUtil.sendError(
        res,
        'Invalid config credentials. Please reconfigure',
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }
    //check for assignment
    const deadline = new Date;
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
    
    if (deadline > assignment.deadline) {
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
      //send mail to student and response to cli
      const studentNames = await prisma.student.findFirst({
        where:{
          email: student.email
        },
        select:{
          firstName: true,
          lastName: true
        }
      })
      const mailOptions: mailOptionsInterface = {
        to: student.email,
        subject: SUBMISSION_NOTIFICATION,
        html: successSubmissionTemplate(assignment,studentNames),
      };
      await transporter.sendMail(mailOptions);
      return ResponseUtil.sendResponse(
        res,
        'Validation and submission successful',
        relation
      );
    }
  }
}
