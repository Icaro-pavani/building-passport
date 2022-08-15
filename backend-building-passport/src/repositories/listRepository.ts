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

async function removeListGuestRealtionsByList(listId: number) {
  return prisma.listGuest.deleteMany({ where: { listId } });
}

async function removeAllResidentLists(residentId: number) {
  return prisma.list.deleteMany({ where: { residentId } });
}

const listRepository = {
  findAllListsByResidentId,
  addNewList,
  findListByNameAndResidentId,
  createListGuestRelations,
  findOneById,
  removeListGuestRealtionsByList,
  removeAllResidentLists,
};
export default listRepository;
