/*
  Warnings:

  - A unique constraint covering the columns `[assignmentId]` on the table `StudentsOnAssignments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "StudentsOnAssignments_studentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "StudentsOnAssignments_assignmentId_key" ON "StudentsOnAssignments"("assignmentId");
