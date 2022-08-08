import listRepository from "../repositories/listRepository.js";

async function getAllResidentList(residentId: number) {
  return await listRepository.findAllListsByResidentId(residentId);
}

const listService = { getAllResidentList };
export default listService;
