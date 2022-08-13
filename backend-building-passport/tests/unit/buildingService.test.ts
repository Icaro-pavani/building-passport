import { jest } from "@jest/globals";
import buildingRepository from "../../src/repositories/buildingRepository.js";
import buildingService from "../../src/services/buildingService.js";
import tokenAPI from "../../src/utils/tokenAPI.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("building service test suite", () => {
  it("obtain buildings informations", async () => {
    jest
      .spyOn(buildingRepository, "findAll")
      .mockImplementation((): any => [{ id: 1 }]);
    const promise = await buildingService.obtainBuildings();
    expect(promise).toHaveLength(1);
    expect(promise[0]).toEqual({ id: 1 });
  });

  it("obtain building info by api key", async () => {
    jest
      .spyOn(buildingRepository, "findBuildingIdByKey")
      .mockImplementation((): any => true);
    jest.spyOn(tokenAPI, "generateToken").mockReturnValue("testeToken");

    const key = "teste1teste";

    const promise = await buildingService.getBuildingByKey(key);
    expect(promise).toEqual("testeToken");
  });

  it("invalid api key, fail to get building informations", () => {
    jest
      .spyOn(buildingRepository, "findBuildingIdByKey")
      .mockImplementation((): any => false);

    const key = "teste1teste";

    const promise = buildingService.getBuildingByKey(key);
    expect(promise).rejects.toEqual({
      type: "unprocessable",
      message: "Invalid API Key!",
    });
  });
});
