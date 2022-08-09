/*
  Warnings:

  - You are about to drop the column `residentId` on the `residentGuests` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "residentGuests" DROP CONSTRAINT "residentGuests_residentId_fkey";

-- AlterTable
ALTER TABLE "residentGuests" DROP COLUMN "residentId";
