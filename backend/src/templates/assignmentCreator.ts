import { Assignment } from "@prisma/client";
import { prisma } from "../configs/prismaConfig";
/**
 *
 * @param assignment assignment information submitted by lecturer
 * @param students array of student ids submitted by lecturer
 */
export default async function createAssignment(
  assignment: Assignment,
  students: []
) {
  const created = [];
  const result = await prisma.assignment.create({
    data: {
      title: assignment.title,
      deadline: assignment.deadline,
      description: assignment.description,
      course: assignment.course,
      isPublished: false,
      status: false,
      students: {
        connect: students,
      },
    },
  });
}
