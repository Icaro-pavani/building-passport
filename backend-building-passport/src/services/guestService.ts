import QRCode from "qrcode";
import sgMail from "@sendgrid/mail";
import Cryptr from "cryptr";
import { unprocessableError } from "../middlewares/handleErrorsMiddleware.js";
import guestRepository from "../repositories/guestRepository.js";
import { GuestUpdateData } from "../schemas/guestSchema.js";
import tokenAPI from "../utils/tokenAPI.js";
import buildingRepository from "../repositories/buildingRepository.js";
import { Building, Guest, List } from "@prisma/client";
import listRepository from "../repositories/listRepository.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const cryptr = new Cryptr(process.env.CRYPTRKEY);

async function getGuestListInfo(guestToken: string) {
  const { guestListInfo } = await checkGuestToken(guestToken);
  if (!!guestListInfo.guest.cpf) {
    guestListInfo.guest.cpf = cryptr.decrypt(guestListInfo.guest.cpf);
  }

  return guestListInfo;
}

async function confirmAndUpdateGuest(
  guestToken: string,
  guestInfo: GuestUpdateData
) {
  const { guestListInfo, building } = await checkGuestToken(guestToken);
  const { listId, guestId } = guestListInfo;
  guestInfo.cpf = cryptr.encrypt(guestInfo.cpf);
  await guestRepository.updateGuestInfo(guestId, guestInfo);
  await guestRepository.updateListConfirmation(listId, guestId);
  const QrcodeData = JSON.stringify({
    listId,
    guestId,
    buildingId: building.id,
  });

  const list = await listRepository.findOneById(listId);

  const qrcode = await QRCode.toDataURL(QrcodeData);
  sendEmail(guestListInfo.guest, building, list, qrcode);
  return qrcode;
}

async function checkGuestToken(token: string) {
  const { listId, guestId, buildingId } = await tokenAPI.decryptGuestToken(
    token
  );
  const guestListInfo = await guestRepository.getGuestListByIds(
    listId,
    guestId
  );

  const building = await buildingRepository.findBuildingById(buildingId);

  if (!guestListInfo || !building) {
    throw unprocessableError("Invalid guest token!");
  }

  return { guestListInfo, building };
}

function sendEmail(guest: Guest, building: Building, list: List, url: string) {
  const message = {
    to: guest.email,
    from: process.env.SENDER_EMAIL,
    subject: `Building Passport - Confirma????o de presen??a para o/a ${list.title}`,
    html: `
        <p>Voc?? confirmou sua presen??a para a/o <strong>${list.title}</strong> que acontecer?? no dia ${list.date} ??s ${list.hour}.</p>
        <p>Endere??o: ${building.name} (${building.street}, ${building.number} - ${building.district} - ${building.city}/${building.state}).</p>
        <p>Voc?? conseguir?? liberar a portaria para acesso ao condom??nio, por meio desse <a href="${process.env.FRONT_URL}/qrcode?src=${url}" target="_blank">QRCode</a>, uma ??nica vez no dia do evento.</p>
        `,
  };

  sgMail
    .send(message)
    .then(() => console.log("Mail sent successfully"))
    .catch((error) => console.log(error));
}

const guestService = { getGuestListInfo, confirmAndUpdateGuest };
export default guestService;
