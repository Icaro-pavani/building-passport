import residentRepository from "../repositories/residentRepository.js";

async function getAllResidents(buildingId: number) {
  return await residentRepository.findByBuildingId(buildingId);
}

const residentService = { getAllResidents };
export default residentService;
