import { NextFunction, Request, Response } from 'express';
import { ResponseUtil } from '../utils/Response';
import logger from '../configs/winstonConfig';
import {
  generateAuthToken,
  generateLecturerId,
  generateStudentId,
  validateToken,
} from '../utils/GeneralUtils';
import { schemaValidation } from '../dtos/adminDTO';
import generator from 'generate-password';
import { prisma } from '../configs/prismaConfig';
import { hash } from 'bcryptjs';
import _ from 'lodash';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { csvToDb } from '../utils/databaseUtils';
import path from 'path';
import { mailOptionsInterface } from '../interfaces/mailOptionsInterface';
import { EMAIL_ACTIVATION_SUBJECT } from '../constants/messages';
import transporter from '../configs/nodemailerConfig';
import configValues from '../configs/config';
import { studentInviteTemplate } from '../templates/studentInviteTemplate';
import { lecturerInviteTemplate } from '../templates/lecturerInviteTemplate';
import { Paginator } from '../utils/Paginator';

export class AdminController {
  async createStudent(req: Request, res: Response, next: NextFunction) {
    const studentData = req.body;

    // perform validations
    await schemaValidation(req);

    logger.info('%j', studentData);
    const tempPassword = generator.generate({
      length: 8,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      strict: true,
    });
    const studentId = await generateStudentId();
    const user = await prisma.$transaction([
      prisma.student.create({
        data: {
          studentId: studentId,
          firstName: studentData.firstname,
          lastName: studentData.lastname,
          email: studentData.email,
        },
      }),
      prisma.user.create({
        data: {
          loginId: studentId,
          email: studentData.email,
          role: 'STUDENT',
          password: await hash(tempPassword, 12),
        },
      }),
    ]);
    // If user is created, add otp.
    if (user) {
      const otp = await prisma.otp.create({
        data: {
          otpCode: tempPassword,
          userId: studentId,
        },
      });
      // If otp was created, send email with verification link
      if (otp) {
        const token = generateAuthToken(user[1]);
        const filteredUser = _.pick(user[1], ['email']);
        let message = studentInviteTemplate(
          studentId,
          configValues.ACCOUNT_CONFIRMATION_URL + '/' + token.accessToken,
          otp.otpCode
        );
        const mailOptions: mailOptionsInterface = {
          to: filteredUser.email,
          subject: EMAIL_ACTIVATION_SUBJECT,
          html: message,
        };
        // transporter.sendMail(mailOptions);
      }
    }
    const filteredUser = _.pick(user[1], ['email']);
    const response = {
      ...user[0],
      ...filteredUser,
    };

    return ResponseUtil.sendResponse(
      res,
      'Student created successfully',
      response
    );
  }

  async uploadStdInfo(req: Request, res: Response, next: NextFunction) {
    if (!req.files || !req.files.length) {
      return ResponseUtil.sendError(
        res,
        'File cannot be empty',
        StatusCodes.UNPROCESSABLE_ENTITY,
        ReasonPhrases.UNPROCESSABLE_ENTITY
      );
    }

    const currentDir = path.resolve(`src/uploads/students`);
    const response = await csvToDb(currentDir, 'student');

    return ResponseUtil.sendResponse(
      res,
      'Student information upload successful',
      response
    );
  }

  async createLecturer(req: Request, res: Response, next: NextFunction) {
    const lecturerData = req.body;

    // perform validations
    await schemaValidation(req);

    const tempPassword = generator.generate({
      length: 8,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      strict: true,
    });
    const lecturerId = await generateLecturerId();
    const user = await prisma.$transaction([
      prisma.lecturer.create({
        data: {
          staffId: lecturerId,
          firstName: lecturerData.firstname,
          lastName: lecturerData.lastname,
          email: lecturerData.email,
        },
      }),
      prisma.user.create({
        data: {
          loginId: lecturerId,
          email: lecturerData.email,
          role: 'LECTURER',
          password: await hash(tempPassword, 12),
        },
      }),
    ]);
    // If user is created, add otp
    if (user) {
      const otp = await prisma.otp.create({
        data: {
          otpCode: tempPassword,
          userId: lecturerId,
        },
      });

      if (otp) {
        // If otp was created, send email with verification link
        const token = generateAuthToken(user[1]);
        const filteredUser = _.pick(user[1], ['email']);
        let message = lecturerInviteTemplate(
          lecturerId,
          configValues.ACCOUNT_CONFIRMATION_URL + '/' + token.accessToken,
          otp.otpCode
        );
        const mailOptions: mailOptionsInterface = {
          to: filteredUser.email,
          subject: EMAIL_ACTIVATION_SUBJECT,
          html: message,
        };
        transporter.sendMail(mailOptions);
      }
    }

    const filteredUser = _.pick(user[1], ['email']);
    const response = {
      ...user[0],
      ...filteredUser,
    };

    return ResponseUtil.sendResponse(
      res,
      'Lecturer created successfully',
      response
    );
  }

  async uploadLecInfo(req: Request, res: Response, next: NextFunction) {
    if (!req.files || !req.files.length) {
      return ResponseUtil.sendError(
        res,
        'File cannot be empty',
        StatusCodes.UNPROCESSABLE_ENTITY,
        ReasonPhrases.UNPROCESSABLE_ENTITY
      );
    }

    const currentDir = path.resolve(`src/uploads/lecturers`);

    const response = await csvToDb(currentDir, 'lecturer');

    return ResponseUtil.sendResponse(
      res,
      'Lecturer information upload successful',
      response
    );
  }

  async getLecturers(req: Request, res: Response, next: NextFunction) {
    const lecturers = await prisma.lecturer.findMany();
    return ResponseUtil.sendResponse(res, 'List of Lecturers', lecturers);
  }

  async getStudents(req: Request, res: Response, next: NextFunction) {
    const students = await prisma.student.findMany();
    return ResponseUtil.sendResponse(res, 'List of Students', students);
  }

  async getAssignments(req: Request, res: Response, next: NextFunction) {
    const assignments = await prisma.assignment.findMany();
    return ResponseUtil.sendResponse(
      res,
      'Assignments fetched successfully',
      assignments
    );
  }

  async getSubmissions(req: Request, res: Response, next: NextFunction) {
    const assignments = await prisma.studentsOnAssignments.findMany({
      where: {
        status: true,
      },
    });
    return ResponseUtil.sendResponse(
      res,
      'Submissions fetched successfully',
      assignments
    );
  }
}
