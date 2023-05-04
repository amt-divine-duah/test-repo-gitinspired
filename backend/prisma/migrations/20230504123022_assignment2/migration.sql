/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Assignment` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "createdAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
