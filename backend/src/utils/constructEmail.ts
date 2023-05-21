import transporter from '../configs/nodemailerConfig';
import { prisma } from '../configs/prismaConfig';
import { ASSIGNMENT_NOTIFICATION } from '../constants/messages';
import { mailOptionsInterface } from '../interfaces/mailOptionsInterface';
import generateEmail from '../templates/lecturerNotification';

export async function getEmailList() {
  //returns an array of submissions with different lecturers
  const newList = await prisma.lecturer.findMany({
    include: {
      Assignment: {
        include: {
          students: {
            where: {
              sent: false,
              status: false,
            },
            include: {
              student: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      },
    },
  });
  // type EmailList = typeof newList;

  //transform list, sort by lecturer
  // console.log(newList[0].Assignment[0].students);
  return newList;
}
export async function sendEmailToLecturer(lecturer) {
  const email = lecturer.email;
  const message = generateEmail(lecturer);
  const mailOptions: mailOptionsInterface = {
    to: email,
    subject: ASSIGNMENT_NOTIFICATION,
    html: message,
  };
  await transporter.sendMail(mailOptions);
}
