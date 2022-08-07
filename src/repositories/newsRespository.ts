import { prisma } from "../config/database.js";

async function findNewsByBuilding(buildingId: number) {
  return prisma.new.findMany({ where: { buildingId } });
}

const newsRepository = { findNewsByBuilding };
export default newsRepository;
