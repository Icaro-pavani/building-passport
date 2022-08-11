import { prisma } from "../config/database.js";

async function findNewsByBuilding(buildingId: number) {
  return prisma.new.findMany({
    orderBy: [{ id: "desc" }],
    where: { buildingId },
    take: 5,
  });
}

const newsRepository = { findNewsByBuilding };
export default newsRepository;
