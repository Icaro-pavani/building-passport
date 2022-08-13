import { jest } from "@jest/globals";
import residentRepository from "../../src/repositories/residentRepository.js";
import residentService from "../../src/services/residentService.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Residents test suite", () => {
  it("should get all residents that are living in the building", async () => {
    jest
      .spyOn(residentRepository, "findByBuildingId")
      .mockImplementation((): any => true);

    const buildingId = 1;

    const promise = await residentService.getAllLivingResidents(buildingId);
    expect(residentRepository.findByBuildingId).toBeCalledTimes(1);
    expect(promise).toEqual(true);
  });

  it("should get all residents registered in the building", async () => {
    jest
      .spyOn(residentRepository, "findAllResidentsByBuildingId")
      .mockImplementation((): any => true);

    const buildingId = 1;

    const promise = await residentService.getAllBuildingResidents(buildingId);
    expect(residentRepository.findAllResidentsByBuildingId).toBeCalledTimes(1);
    expect(promise).toEqual(true);
  });

  it("given resident id and status, should update this status", async () => {
    jest
      .spyOn(residentRepository, "updateStatus")
      .mockImplementation((): any => true);

    const residentId = 1;
    const isLiving = true;

    const promise = await residentService.updateStatus(residentId, isLiving);
    expect(residentRepository.updateStatus).toBeCalledTimes(1);
  });

  it("given resident id, should delete resident", async () => {
    jest
      .spyOn(residentRepository, "remove")
      .mockImplementation((): any => true);

    const residentId = 1;

    const promise = await residentService.deleteResident(residentId);
    expect(residentRepository.remove).toBeCalledTimes(1);
  });

  it("given resident id, should delete resident", async () => {
    jest
      .spyOn(residentRepository, "insert")
      .mockImplementation((): any => true);

    const buildingId = 1;

    const residentInfo = {
      name: "test",
      apartment: "55A",
      cpf: "7123412987",
    };

    const promise = await residentService.addNewResident(
      buildingId,
      residentInfo
    );
    expect(residentRepository.insert).toBeCalledTimes(1);
  });
});
