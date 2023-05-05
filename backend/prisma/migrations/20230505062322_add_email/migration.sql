/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `lecturers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `lecturers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lecturers" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lecturers_email_key" ON "lecturers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");
