import { prisma } from "../config/database.js";

async function findAllListsByResidentId(residentId: number) {
  return prisma.list.findMany({ where: { residentId } });
}

const listRepository = { findAllListsByResidentId };
export default listRepository;
