import { prisma } from "../config/database.js";
import { GuestUpdateData } from "../schemas/guestSchema.js";
import { GuestData } from "../schemas/listSchema.js";

async function addGuest(guest: GuestData) {
  return prisma.guest.create({ data: guest });
}

async function getGuest(email: string) {
  return prisma.guest.findUnique({ where: { email } });
}

async function getGuestListByIds(listId: number, guestId: number) {
  return prisma.listGuest.findUnique({
    where: { listId_guestId: { listId, guestId } },
    include: { guest: true },
  });
}

async function updateGuestInfo(id: number, guestInfo: GuestUpdateData) {
  await prisma.guest.update({
    where: { id },
    data: guestInfo,
  });
}

async function updateListConfirmation(listId: number, guestId: number) {
  await prisma.listGuest.update({
    where: { listId_guestId: { listId, guestId } },
    data: { confirmed: true },
  });
}

const guestRepository = {
  addGuest,
  getGuest,
  getGuestListByIds,
  updateGuestInfo,
  updateListConfirmation,
};
export default guestRepository;
