/*
  Warnings:

  - Changed the type of `deadline` on the `assignments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "assignments" DROP COLUMN "deadline",
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;
