import { New } from "@prisma/client";
import { prisma } from "../config/database.js";

type AddNewsData = Omit<New, "id" | "createAt">;

async function findNewsByBuilding(buildingId: number) {
  return prisma.new.findMany({
    orderBy: [{ id: "desc" }],
    where: { buildingId },
    take: 5,
  });
}

async function insert(newsData: AddNewsData) {
  return prisma.new.create({
    data: newsData,
  });
}

async function remove(id: number) {
  return prisma.new.delete({ where: { id } });
}

const newsRepository = { findNewsByBuilding, insert, remove };
export default newsRepository;
