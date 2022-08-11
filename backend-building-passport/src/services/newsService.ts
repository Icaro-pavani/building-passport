import newsRepository from "../repositories/newsRespository.js";
import { NewsData } from "../schemas/newsSchema.js";

async function getAllNewsByBuildingId(buildingId: number) {
  return await newsRepository.findNewsByBuilding(buildingId);
}

async function addNews(buildingId: number, newsInfo: NewsData) {
  const newsData = { ...newsInfo, buildingId };

  await newsRepository.insert(newsData);
}

async function deleteNews(newsId: number) {
  await newsRepository.remove(newsId);
}

const newsService = { getAllNewsByBuildingId, addNews, deleteNews };
export default newsService;
