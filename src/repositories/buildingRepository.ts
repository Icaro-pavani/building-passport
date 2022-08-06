import { prisma } from "../config/database.js";

async function findAll() {
  return prisma.building.findMany();
}

const buildingRepository = { findAll };
export default buildingRepository;
