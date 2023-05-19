-- AlterTable
ALTER TABLE "StudentsOnAssignments" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "StudentsOnAssignments_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Submissions" (
    "snapshotName" TEXT NOT NULL,
    "relationId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Submissions_snapshotName_key" ON "Submissions"("snapshotName");

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "StudentsOnAssignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
