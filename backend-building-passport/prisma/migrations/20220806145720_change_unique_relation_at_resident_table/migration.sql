/*
  Warnings:

  - A unique constraint covering the columns `[cpf,buildingId]` on the table `residents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,buildingId]` on the table `residents` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "residents_cpf_key";

-- DropIndex
DROP INDEX "residents_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "residents_cpf_buildingId_key" ON "residents"("cpf", "buildingId");

-- CreateIndex
CREATE UNIQUE INDEX "residents_email_buildingId_key" ON "residents"("email", "buildingId");
