/*
  Warnings:

  - You are about to drop the `Assignment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentsOnAssignments" DROP CONSTRAINT "StudentsOnAssignments_assignmentId_fkey";

-- DropTable
DROP TABLE "Assignment";

-- CreateTable
CREATE TABLE "assignments" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "uniqueCode" TEXT,
    "isPublished" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentsOnAssignments" ADD CONSTRAINT "StudentsOnAssignments_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
