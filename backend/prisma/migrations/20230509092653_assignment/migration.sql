/*
  Warnings:

  - A unique constraint covering the columns `[uniqueCode]` on the table `assignments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lecturerId` to the `assignments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assignments" ADD COLUMN     "lecturerId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "assignments_uniqueCode_key" ON "assignments"("uniqueCode");

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "lecturers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
