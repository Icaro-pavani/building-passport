import buildingRepository from "../repositories/buildingRepository.js";

async function obtainBuildings() {
  const buildings = await buildingRepository.findAll();
  return buildings;
}

const buildingService = { obtainBuildings };
export default buildingService;
