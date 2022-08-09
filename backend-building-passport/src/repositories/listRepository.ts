import { List } from "@prisma/client";
import { prisma } from "../config/database.js";

export type AddListData = Omit<List, "id" | "residentId">;

async function findAllListsByResidentId(residentId: number) {
  return prisma.list.findMany({
    orderBy: [{ id: "desc" }],
    where: { residentId },
    include: {
      listGuest: {
        select: { guest: {} },
      },
    },
  });
}

async function findOneById(id: number) {
  return prisma.list.findUnique({
    where: { id },
    include: {
      listGuest: {
        include: { guest: {} },
      },
    },
  });
}

async function addNewList(residentId: number, listInfo: AddListData) {
  return prisma.list.create({
    data: { ...listInfo, residentId },
  });
}

async function findListByNameAndResidentId(title: string, residentId: number) {
  return prisma.list.findUnique({
    where: {
      listIdentifier: { title, residentId },
    },
  });
}

async function createListGuestRelations(
  listGuests: { listId: number; guestId: number }[]
) {
  return prisma.listGuest.createMany({
    data: listGuests,
  });
}

const listRepository = {
  findAllListsByResidentId,
  addNewList,
  findListByNameAndResidentId,
  createListGuestRelations,
  findOneById,
};
export default listRepository;