import { Building, Guest, List, Resident } from "@prisma/client";
import {
  conflictError,
  unprocessableError,
} from "../middlewares/handleErrorsMiddleware.js";
import guestRepository from "../repositories/guestRepository.js";
import listRepository, { AddListData } from "../repositories/listRepository.js";
import { ListData } from "../schemas/listSchema.js";
import tokenAPI from "../utils/tokenAPI.js";
import sgMail from "@sendgrid/mail";
import buildingRepository from "../repositories/buildingRepository.js";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function getAllResidentList(residentId: number) {
  return await listRepository.findAllListsByResidentId(residentId);
}

async function addList(resident: Resident, listInfo: ListData) {
  if (listInfo.numberGuests !== listInfo.guests.length) {
    throw unprocessableError(
      "Number of guests and guests informations don't have the sema size!"
    );
  }

  const registeredList = await listRepository.findListByNameAndResidentId(
    listInfo.title,
    resident.id
  );
  if (!!registeredList) {
    throw conflictError("This list already exist!");
  }

  const guests: Guest[] = [];
  for (let i = 0; i < listInfo.numberGuests; i++) {
    const guestInfo = await guestRepository.getGuest(listInfo.guests[i].email);
    if (!guestInfo) {
      guests.push(await guestRepository.addGuest(listInfo.guests[i]));
    } else {
      guests.push(guestInfo);
    }
  }

  const listData: AddListData = {
    title: listInfo.title,
    date: listInfo.date,
    hour: listInfo.hour,
    numberGuests: listInfo.numberGuests,
  };
  const createdList = await listRepository.addNewList(resident.id, listData);
  const building = await buildingRepository.findBuildingById(
    resident.buildingId
  );

  let listGuestRelations: { listId: number; guestId: number }[] = [];
  for (let i = 0; i < listInfo.numberGuests; i++) {
    const token = tokenAPI.generateGuestToken(createdList.id, guests[i].id);
    listGuestRelations.push({ listId: createdList.id, guestId: guests[i].id });
    sendEmail(guests[i], building, createdList, resident.name, token);
  }

  await listRepository.createListGuestRelations(listGuestRelations);
}

function sendEmail(
  guest: Guest,
  building: Building,
  list: List,
  residentName: string,
  token: string
) {
  const message = {
    to: guest.email,
    from: process.env.SENDER_EMAIL,
    subject: `Buildgin Passport - Você foi Convidado para o/a ${list.title}`,
    text: `
      ${residentName} gostaria de convidar para a/o ${list.title} que acontecerá no dia ${list.date} às ${list.hour}.
      Endereço: ${building.name} (${building.street}, ${building.number} - ${building.district} - ${building.city}/${building.state})
      Para confirmar sua participação acesse aqui.
      `,
    html: `
      <p>${residentName} gostaria de convidar para a/o <strong>${list.title}</strong> que acontecerá no dia ${list.date} às ${list.hour}.</p>
      <p>Endereço: ${building.name} (${building.street}, ${building.number} - ${building.district} - ${building.city}/${building.state}).</p>
      <p>Para confirmar sua participação e poder acessar o condomínio acesse <a href="http://localhost:3000/guests?code=${token}" target="_blank">aqui</a>.</p>
      `,
  };

  sgMail
    .send(message)
    .then(() => console.log("Mail sent successfully"))
    .catch((error) => console.log(error));
}

async function obtainOneList(residentId: number, listId: number) {
  const list = await listRepository.findOneById(listId);
  if (list.residentId !== residentId) {
    throw conflictError("The event doesn't belong to this resident!");
  }

  return list;
}

const listService = { getAllResidentList, addList, obtainOneList };
export default listService;
