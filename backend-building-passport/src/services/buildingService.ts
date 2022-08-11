import { unprocessableError } from "../middlewares/handleErrorsMiddleware.js";
import buildingRepository from "../repositories/buildingRepository.js";
import tokenAPI from "../utils/tokenAPI.js";

async function obtainBuildings() {
  const buildings = await buildingRepository.findAll();
  return buildings;
}

async function getBuildingByKey(key: string) {
  const buildingKey = await buildingRepository.findBuildingIdByKey(key);
  if (!buildingKey) {
    throw unprocessableError("Invalid API Key!");
  }
  const buildingToken = tokenAPI.generateToken(buildingKey.buildingId);

  return buildingToken;
}

const buildingService = { obtainBuildings, getBuildingByKey };
export default buildingService;
