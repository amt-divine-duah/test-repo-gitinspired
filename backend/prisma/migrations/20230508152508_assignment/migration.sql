/*
  Warnings:

  - The primary key for the `StudentsOnAssignments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[studentId,assignmentId]` on the table `StudentsOnAssignments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "StudentsOnAssignments" DROP CONSTRAINT "StudentsOnAssignments_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "StudentsOnAssignments_studentId_assignmentId_key" ON "StudentsOnAssignments"("studentId", "assignmentId");
