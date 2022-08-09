import newsRepository from "../repositories/newsRespository.js";

async function getAllNewsByBuildingId(buildingId: number) {
  return await newsRepository.findNewsByBuilding(buildingId);
}

const newsService = { getAllNewsByBuildingId };
export default newsService;
