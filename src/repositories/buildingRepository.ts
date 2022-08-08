import { prisma } from "../config/database.js";

async function findAll() {
  return prisma.building.findMany();
}

async function findBuildingById(id: number) {
  return prisma.building.findUnique({ where: { id } });
}

const buildingRepository = { findAll, findBuildingById };
export default buildingRepository;
