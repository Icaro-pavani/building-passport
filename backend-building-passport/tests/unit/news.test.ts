import { jest } from "@jest/globals";
import newsRepository from "../../src/repositories/newsRepository.js";
import newsService from "../../src/services/newsService.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("news tests suite", () => {
  it("with building id, should get the news", async () => {
    jest
      .spyOn(newsRepository, "findNewsByBuilding")
      .mockImplementation((): any => [{ news: "test" }]);
    const buildingId = 2;

    const promise = await newsService.getAllNewsByBuildingId(buildingId);
    expect(promise).toHaveLength(1);
    expect(newsRepository.findNewsByBuilding).toBeCalledTimes(1);
  });

  it("with building id and news information, should add a news", async () => {
    jest.spyOn(newsRepository, "insert").mockImplementation((): any => true);
    const buildingId = 2;

    const newsData = {
      title: "test",
      description: "test and test",
    };

    const promise = await newsService.addNews(buildingId, newsData);
    expect(newsRepository.insert).toBeCalledTimes(1);
  });

  it("with news id, should delete a news", async () => {
    jest.spyOn(newsRepository, "remove").mockImplementation((): any => true);
    const newsId = 1;

    const promise = await newsService.deleteNews(newsId);
    expect(newsRepository.remove).toBeCalledTimes(1);
  });
});
