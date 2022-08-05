import { prisma } from "../config/database.js";
import { ResidentData } from "../schemas/residentSchema.js";

type ResidentInfo = Omit<ResidentData, "confirmPassword">;

async function register(residentId: number, residentInfo: ResidentInfo) {
  return prisma.resident.update({
    where: { id: residentId },
    data: residentInfo,
  });
}

async function findById(id: number) {
  return prisma.resident.findUnique({ where: { id } });
}

const residentRepository = { register, findById };
export default residentRepository;
