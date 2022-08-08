/*
  Warnings:

  - A unique constraint covering the columns `[listId,guestId]` on the table `residentGuests` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `lists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hour` to the `lists` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "residentGuests" DROP CONSTRAINT "residentGuests_residentId_fkey";

-- AlterTable
ALTER TABLE "lists" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "hour" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "residentGuests" ALTER COLUMN "residentId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "residentGuests_listId_guestId_key" ON "residentGuests"("listId", "guestId");

-- AddForeignKey
ALTER TABLE "residentGuests" ADD CONSTRAINT "residentGuests_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "residents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
