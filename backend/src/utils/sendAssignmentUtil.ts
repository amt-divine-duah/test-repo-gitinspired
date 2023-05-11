import transporter from "../configs/nodemailerConfig";
import { ASSIGNMENT_EMAIL_SUBJECT } from "../constants/messages";
import { mailOptionsInterface } from "../interfaces/mailOptionsInterface";
import { assignmentInviteTemplate } from "../templates/assignmentInviteTemplate";

/**
 *
 * @param assignmentInfo Object with assignment information
 * @param students Array of object containing information on invited students to be used in student array
 */
export default async function sendAssignment(
  assignmentInfo: {
    title: any;
    deadline?: string;
    uniqueCode?: string;
    link?: string;
  },
  students: string | any[]
) {
  for (let i = 0; i < students.length; i++) {
    const mailOptions: mailOptionsInterface = {
      to: students[i].email,
      subject: ASSIGNMENT_EMAIL_SUBJECT + assignmentInfo.title,
      html: assignmentInviteTemplate(assignmentInfo, students[i]),
    };
    await transporter.sendMail(mailOptions);
  }
}
