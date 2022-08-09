import { prisma } from "../config/database.js";
import { GuestData } from "../schemas/listSchema.js";

async function addGuest(guest: GuestData) {
  return prisma.guest.create({ data: guest });
}

async function getGuest(email: string) {
  return prisma.guest.findUnique({ where: { email } });
}
const guestRepository = { addGuest, getGuest };
export default guestRepository;
