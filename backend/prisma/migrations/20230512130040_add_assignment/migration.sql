-- DropForeignKey
ALTER TABLE "StudentsOnAssignments" DROP CONSTRAINT "StudentsOnAssignments_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentsOnAssignments" DROP CONSTRAINT "StudentsOnAssignments_studentId_fkey";

-- DropForeignKey
ALTER TABLE "assignments" DROP CONSTRAINT "assignments_lecturerId_fkey";

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "lecturers"("staffId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnAssignments" ADD CONSTRAINT "StudentsOnAssignments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("studentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnAssignments" ADD CONSTRAINT "StudentsOnAssignments_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
