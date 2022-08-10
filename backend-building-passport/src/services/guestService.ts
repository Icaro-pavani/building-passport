import QRCode from "qrcode";
import sgMail from "@sendgrid/mail";
import { unprocessableError } from "../middlewares/handleErrorsMiddleware.js";
import guestRepository from "../repositories/guestRepository.js";
import { GuestUpdateData } from "../schemas/guestSchema.js";
import tokenAPI from "../utils/tokenAPI.js";
import buildingRepository from "../repositories/buildingRepository.js";
import { Building, Guest, List } from "@prisma/client";
import listRepository from "../repositories/listRepository.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function getGuestListInfo(guestToken: string) {
  const { guestListInfo } = await checkGuestToken(guestToken);

  return guestListInfo;
}

async function confirmAndUpdateGuest(
  guestToken: string,
  guestInfo: GuestUpdateData
) {
  const { guestListInfo, building } = await checkGuestToken(guestToken);
  const { listId, guestId } = guestListInfo;
  await guestRepository.updateGuestInfo(guestId, guestInfo);
  await guestRepository.updateListConfirmation(listId, guestId);
  const QrcodeData = JSON.stringify({
    listId,
    guestId,
    buildingId: building.id,
  });

  const list = await listRepository.findOneById(listId);

  QRCode.toDataURL(QrcodeData)
    .then((url) => {
      sendEmail(guestListInfo.guest, building, list, url);
    })
    .catch((err) => {
      console.log(err);
    });
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
    subject: `Buildgin Passport - Confirmação de presença para o/a ${list.title}`,
    html: `
        <p>Você confirmou sua presença para a/o <strong>${list.title}</strong> que acontecerá no dia ${list.date} às ${list.hour}.</p>
        <p>Endereço: ${building.name} (${building.street}, ${building.number} - ${building.district} - ${building.city}/${building.state}).</p>
        <p>Você conseguirá liberar a portaria para acesso ao condomínio, por meio desse <a href="http://localhost:3000/qrcode?src=${url}" target="_blank">QRCode</a>, uma única vez no dia do evento.</p>
        `,
  };

  sgMail
    .send(message)
    .then(() => console.log("Mail sent successfully"))
    .catch((error) => console.log(error));
}

const guestService = { getGuestListInfo, confirmAndUpdateGuest };
export default guestService;
