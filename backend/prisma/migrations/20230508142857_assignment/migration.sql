/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `StudentsOnAssignments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StudentsOnAssignments_studentId_key" ON "StudentsOnAssignments"("studentId");
