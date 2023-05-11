-- CreateTable
CREATE TABLE "assignments" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "lecturerId" INTEGER NOT NULL,
    "uniqueCode" TEXT,
    "isPublished" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentsOnAssignments" (
    "studentId" INTEGER NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "assignments_uniqueCode_key" ON "assignments"("uniqueCode");

-- CreateIndex
CREATE UNIQUE INDEX "StudentsOnAssignments_studentId_assignmentId_key" ON "StudentsOnAssignments"("studentId", "assignmentId");

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "lecturers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnAssignments" ADD CONSTRAINT "StudentsOnAssignments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnAssignments" ADD CONSTRAINT "StudentsOnAssignments_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
