import { unprocessableError } from "../middlewares/handleErrorsMiddleware.js";
import guestRepository from "../repositories/guestRepository.js";
import { GuestUpdateData } from "../schemas/guestSchema.js";
import tokenAPI from "../utils/tokenAPI.js";

async function getGuestListInfo(guestToken: string) {
  const guestListInfo = await checkGuestToken(guestToken);

  return guestListInfo;
}

async function confirmAndUpdateGuest(
  guestToken: string,
  guestInfo: GuestUpdateData
) {
  const guestListInfo = await checkGuestToken(guestToken);
  const { listId, guestId } = guestListInfo;
  await guestRepository.updateGuestInfo(guestId, guestInfo);
  await guestRepository.updateListConfirmation(listId, guestId);
}

async function checkGuestToken(token: string) {
  const { listId, guestId } = await tokenAPI.decryptGuestToken(token);
  const guestListInfo = await guestRepository.getGuestListByIds(
    listId,
    guestId
  );

  if (!guestListInfo) {
    throw unprocessableError("Invalid guest token!");
  }

  return guestListInfo;
}

const guestService = { getGuestListInfo, confirmAndUpdateGuest };
export default guestService;
