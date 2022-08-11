import { prisma } from "../config/database.js";

async function findAll() {
  return prisma.building.findMany();
}

async function findBuildingById(id: number) {
  return prisma.building.findUnique({ where: { id } });
}

async function findBuildingIdByKey(key: string) {
  return prisma.buildingKey.findUnique({ where: { key } });
}

const buildingRepository = { findAll, findBuildingById, findBuildingIdByKey };
export default buildingRepository;
