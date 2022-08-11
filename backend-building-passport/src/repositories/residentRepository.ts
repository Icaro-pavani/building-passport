import { Resident } from "@prisma/client";
import { prisma } from "../config/database.js";
import { ResidentData } from "../schemas/residentSchema.js";

type ResidentInfo = Omit<ResidentData, "confirmPassword" | "cpf" | "id">;

type AddResidentInfo = Omit<Resident, "id" | "email" | "password" | "isLiving">;

async function register(residentId: number, residentInfo: ResidentInfo) {
  return prisma.resident.update({
    where: { id: residentId },
    data: residentInfo,
  });
}

async function findById(id: number) {
  return prisma.resident.findUnique({ where: { id } });
}

async function findByEmail(email: string, buildingId: number) {
  return prisma.resident.findUnique({
    where: { residentByEmail: { email, buildingId } },
  });
}

async function findByBuildingId(buildingId: number) {
  return prisma.resident.findMany({ where: { buildingId, isLiving: true } });
}

async function findAllResidentsByBuildingId(buildingId: number) {
  return prisma.resident.findMany({
    orderBy: [{ name: "asc" }],
    where: { buildingId },
  });
}

async function insert(residentInfo: AddResidentInfo) {
  return prisma.resident.create({
    data: residentInfo,
  });
}

const residentRepository = {
  register,
  findById,
  findByEmail,
  findByBuildingId,
  findAllResidentsByBuildingId,
  insert,
};
export default residentRepository;
