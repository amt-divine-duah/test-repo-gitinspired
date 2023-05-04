/*
  Warnings:

  - You are about to drop the column `status` on the `assignments` table. All the data in the column will be lost.
  - Added the required column `status` to the `StudentsOnAssignments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentsOnAssignments" ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "assignments" DROP COLUMN "status",
ALTER COLUMN "updatedAt" DROP NOT NULL;
