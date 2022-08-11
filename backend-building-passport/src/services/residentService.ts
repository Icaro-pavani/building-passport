import residentRepository from "../repositories/residentRepository.js";

async function getAllLivingResidents(buildingId: number) {
  return await residentRepository.findByBuildingId(buildingId);
}

async function getAllBuildingResidents(buildingId: number) {
  return await residentRepository.findAllResidentsByBuildingId(buildingId);
}

const residentService = { getAllLivingResidents, getAllBuildingResidents };
export default residentService;
