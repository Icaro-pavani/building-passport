import { jest } from "@jest/globals";
import QRCode from "qrcode";
import sgMail from "@sendgrid/mail";
import buildingRepository from "../../src/repositories/buildingRepository.js";
import guestRepository from "../../src/repositories/guestRepository.js";
import listRepository from "../../src/repositories/listRepository.js";
import listService from "../../src/services/listService.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("List tests suite", () => {
  it("with resident token, should get all lists of the resident", async () => {
    jest
      .spyOn(listRepository, "findAllListsByResidentId")
      .mockImplementation((): any => [1, 2]);
    const residentId = 2;

    const promise = await listService.getAllResidentList(residentId);
    expect(listRepository.findAllListsByResidentId).toBeCalledTimes(1);
    expect(promise).toHaveLength(2);
    expect(promise).toEqual([1, 2]);
  });

  it("with resident token and list id, should get one specific list", async () => {
    jest
      .spyOn(listRepository, "findOneById")
      .mockImplementation((): any => ({ residentId: 2 }));
    const residentId = 2;
    const listId = 1;

    const promise = await listService.obtainOneList(residentId, listId);
    expect(listRepository.findOneById).toBeCalledTimes(1);
    expect(promise).toEqual({ residentId: 2 });
  });

  it("with resident token and wrong list id, should fail to get one specific list", () => {
    jest
      .spyOn(listRepository, "findOneById")
      .mockImplementation((): any => ({ residentId: 1 }));
    const residentId = 2;
    const listId = 1;

    const promise = listService.obtainOneList(residentId, listId);
    expect(promise).rejects.toEqual({
      type: "conflict",
      message: "The event doesn't belong to this resident!",
    });
  });

  it("with a new list informations and resident token, should create new list adding guests", async () => {
    jest
      .spyOn(listRepository, "findListByNameAndResidentId")
      .mockImplementation((): any => false);
    jest
      .spyOn(guestRepository, "getGuest")
      .mockImplementation((): any => false);
    jest.spyOn(guestRepository, "addGuest").mockImplementation((): any => ({
      id: 1,
      name: "teste",
      email: "testtest",
      cpf: null,
      cel: null,
    }));
    jest.spyOn(listRepository, "addNewList").mockImplementation((): any => ({
      id: 1,
      title: "test",
      residentId: 1,
      numberGuests: 2,
      date: "04/08",
      hour: "14:00",
    }));
    jest
      .spyOn(buildingRepository, "findBuildingById")
      .mockImplementation((): any => ({
        id: 1,
        name: "test",
        street: "test",
        number: "300",
        district: "test",
        city: "test",
        state: "test",
      }));
    jest
      .spyOn(listRepository, "createListGuestRelations")
      .mockImplementation((): any => true);
    jest
      .spyOn(sgMail, "send")
      .mockImplementation(async (): Promise<any> => true);

    const resident = {
      id: 1,
      name: "test",
      cpf: "38497",
      email: "test",
      password: "test",
      apartment: "33C",
      buildingId: 1,
      isLiving: true,
    };

    const listData = {
      title: "test",
      numberGuests: 2,
      date: "04/08",
      hour: "14:00",
      guests: [
        { name: "test1", email: "email1" },
        { name: "test2", email: "email2" },
      ],
    };

    const promise = await listService.addList(resident, listData);
    expect(listRepository.findListByNameAndResidentId).toBeCalledTimes(1);
    expect(guestRepository.getGuest).toBeCalledTimes(2);
    expect(guestRepository.addGuest).toBeCalledTimes(2);
    expect(listRepository.addNewList).toBeCalledTimes(1);
    expect(buildingRepository.findBuildingById).toBeCalledTimes(1);
    expect(listRepository.createListGuestRelations).toBeCalledTimes(1);
    expect(sgMail.send).toBeCalledTimes(2);
  });

  it("with a new list informations and resident token, should create new list without adding guests", async () => {
    jest
      .spyOn(listRepository, "findListByNameAndResidentId")
      .mockImplementation((): any => false);
    jest.spyOn(guestRepository, "getGuest").mockImplementation((): any => ({
      id: 1,
      name: "teste",
      email: "testtest",
      cpf: null,
      cel: null,
    }));
    jest.spyOn(guestRepository, "addGuest").mockImplementation((): any => ({
      id: 1,
      name: "teste",
      email: "testtest",
      cpf: null,
      cel: null,
    }));
    jest.spyOn(listRepository, "addNewList").mockImplementation((): any => ({
      id: 1,
      title: "test",
      residentId: 1,
      numberGuests: 2,
      date: "04/08",
      hour: "14:00",
    }));
    jest
      .spyOn(buildingRepository, "findBuildingById")
      .mockImplementation((): any => ({
        id: 1,
        name: "test",
        street: "test",
        number: "300",
        district: "test",
        city: "test",
        state: "test",
      }));
    jest
      .spyOn(listRepository, "createListGuestRelations")
      .mockImplementation((): any => true);
    jest
      .spyOn(sgMail, "send")
      .mockImplementation(async (): Promise<any> => true);

    const resident = {
      id: 1,
      name: "test",
      cpf: "38497",
      email: "test",
      password: "test",
      apartment: "33C",
      buildingId: 1,
      isLiving: true,
    };

    const listData = {
      title: "test",
      numberGuests: 2,
      date: "04/08",
      hour: "14:00",
      guests: [
        { name: "test1", email: "email1" },
        { name: "test2", email: "email2" },
      ],
    };

    const promise = await listService.addList(resident, listData);
    expect(listRepository.findListByNameAndResidentId).toBeCalledTimes(1);
    expect(guestRepository.getGuest).toBeCalledTimes(2);
    expect(guestRepository.addGuest).toBeCalledTimes(0);
    expect(listRepository.addNewList).toBeCalledTimes(1);
    expect(buildingRepository.findBuildingById).toBeCalledTimes(1);
    expect(listRepository.createListGuestRelations).toBeCalledTimes(1);
    expect(sgMail.send).toBeCalledTimes(2);
  });

  it("with different number of guests and guests informations, should fail to create new list", () => {
    const resident = {
      id: 1,
      name: "test",
      cpf: "38497",
      email: "test",
      password: "test",
      apartment: "33C",
      buildingId: 1,
      isLiving: true,
    };

    const listData = {
      title: "test",
      numberGuests: 1,
      date: "04/08",
      hour: "14:00",
      guests: [
        { name: "test1", email: "email1" },
        { name: "test2", email: "email2" },
      ],
    };

    const promise = listService.addList(resident, listData);
    expect(promise).rejects.toEqual({
      type: "unprocessable",
      message:
        "Number of guests and guests informations don't have the sema size!",
    });
  });

  it("with list name already registered by the resident, should fail to create new list", () => {
    jest
      .spyOn(listRepository, "findListByNameAndResidentId")
      .mockImplementation((): any => true);

    const resident = {
      id: 1,
      name: "test",
      cpf: "38497",
      email: "test",
      password: "test",
      apartment: "33C",
      buildingId: 1,
      isLiving: true,
    };

    const listData = {
      title: "test",
      numberGuests: 2,
      date: "04/08",
      hour: "14:00",
      guests: [
        { name: "test1", email: "email1" },
        { name: "test2", email: "email2" },
      ],
    };

    const promise = listService.addList(resident, listData);
    expect(promise).rejects.toEqual({
      type: "conflict",
      message: "This list already exist!",
    });
  });
});
