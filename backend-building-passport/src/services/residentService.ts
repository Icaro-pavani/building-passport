import bcrypt from "bcrypt";
import listRepository from "../repositories/listRepository.js";
import residentRepository from "../repositories/residentRepository.js";
import { AddResidentData } from "../schemas/addResidentSchema.js";

async function getAllLivingResidents(buildingId: number) {
  return await residentRepository.findByBuildingId(buildingId);
}

async function getAllBuildingResidents(buildingId: number) {
  return await residentRepository.findAllResidentsByBuildingId(buildingId);
}

async function addNewResident(
  buildingId: number,
  residentInfo: AddResidentData
) {
  const SALT = 13;
  const addResidentData = { ...residentInfo, buildingId };
  addResidentData.cpf = bcrypt.hashSync(addResidentData.cpf, SALT);

  await residentRepository.insert(addResidentData);
}

async function updateStatus(residentId: number, isLiving: boolean) {
  await residentRepository.updateStatus(isLiving, residentId);
}

async function deleteResident(residentId: number) {
  const lists = await listRepository.findAllListsByResidentId(residentId);

  for (let i = 0; i < lists.length; i++) {
    await listRepository.removeListGuestRealtionsByList(lists[i].id);
  }
  await listRepository.removeAllResidentLists(residentId);
  await residentRepository.remove(residentId);
}

const residentService = {
  getAllLivingResidents,
  getAllBuildingResidents,
  addNewResident,
  updateStatus,
  deleteResident,
};
export default residentService;
