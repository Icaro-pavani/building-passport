import { prisma } from "../config/database.js";
import { ResidentData } from "../schemas/residentSchema.js";

type ResidentInfo = Omit<ResidentData, "confirmPassword" | "cpf" | "id">;

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

const residentRepository = {
  register,
  findById,
  findByEmail,
  findByBuildingId,
  findAllResidentsByBuildingId,
};
export default residentRepository;
