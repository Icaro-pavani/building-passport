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

async function findByEmail(email: string) {
  return prisma.resident.findFirst({ where: { email } });
}

const residentRepository = { register, findById, findByEmail };
export default residentRepository;
