import { jest } from "@jest/globals";
import QRCode from "qrcode";
import sgMail from "@sendgrid/mail";
import buildingRepository from "../../src/repositories/buildingRepository.js";
import guestRepository from "../../src/repositories/guestRepository.js";
import listRepository from "../../src/repositories/listRepository.js";
import guestService from "../../src/services/guestService.js";
import tokenAPI from "../../src/utils/tokenAPI.js";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTRKEY);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("guest service test suite", () => {
  it("with guest token, obtain guest informations", async () => {
    jest
      .spyOn(tokenAPI, "decryptGuestToken")
      .mockImplementation((): any => ({ token: "teste" }));
    jest
      .spyOn(guestRepository, "getGuestListByIds")
      .mockImplementation((): any => ({
        guest: { cpf: cryptr.encrypt("1234") },
      }));
    jest
      .spyOn(buildingRepository, "findBuildingById")
      .mockImplementation((): any => true);
    const guestToken = "test";

    const promise = await guestService.getGuestListInfo(guestToken);
    expect(tokenAPI.decryptGuestToken).toBeCalledTimes(1);
    expect(guestRepository.getGuestListByIds).toBeCalledTimes(1);
    expect(buildingRepository.findBuildingById).toBeCalledTimes(1);
    expect(promise).toEqual({ guest: { cpf: "1234" } });
  });

  it("with invalid guest token, fail to obtain guest informations", () => {
    jest
      .spyOn(tokenAPI, "decryptGuestToken")
      .mockImplementation((): any => ({ token: "teste" }));
    jest
      .spyOn(guestRepository, "getGuestListByIds")
      .mockImplementation((): any => ({
        guest: { cpf: cryptr.encrypt("1234") },
      }));
    jest
      .spyOn(buildingRepository, "findBuildingById")
      .mockImplementation((): any => false);
    const guestToken = "test";

    const promise = guestService.getGuestListInfo(guestToken);
    expect(promise).rejects.toEqual({
      type: "unprocessable",
      message: "Invalid guest token!",
    });
  });

  it("with guest token and guest information, confirm guest informations and presence", async () => {
    jest
      .spyOn(tokenAPI, "decryptGuestToken")
      .mockImplementation((): any => ({ token: "teste" }));
    jest
      .spyOn(guestRepository, "getGuestListByIds")
      .mockImplementation((): any => ({
        listId: 1,
        guestId: 2,
        guest: { email: "test@test.cc" },
      }));
    jest
      .spyOn(guestRepository, "updateGuestInfo")
      .mockImplementation((): any => ({ listId: 1, guestId: 2 }));
    jest
      .spyOn(guestRepository, "updateListConfirmation")
      .mockImplementation((): any => ({ listId: 1, guestId: 2 }));
    jest
      .spyOn(buildingRepository, "findBuildingById")
      .mockImplementation((): any => ({ id: 1 }));
    jest
      .spyOn(listRepository, "findOneById")
      .mockImplementation((): any => ({ id: 1 }));
    jest;
    jest
      .spyOn(sgMail, "send")
      .mockImplementation(async (): Promise<any> => true);
    jest.spyOn(QRCode, "toDataURL").mockImplementation(() => "test");

    const guestToken = "test";

    const guestInfo = {
      name: "test",
      email: "teste@teste.cc",
      cpf: "2893789127",
    };

    const promise = await guestService.confirmAndUpdateGuest(
      guestToken,
      guestInfo
    );
    expect(tokenAPI.decryptGuestToken).toBeCalledTimes(1);
    expect(guestRepository.getGuestListByIds).toBeCalledTimes(1);
    expect(guestRepository.updateGuestInfo).toBeCalledTimes(1);
    expect(guestRepository.updateListConfirmation).toBeCalledTimes(1);
    expect(buildingRepository.findBuildingById).toBeCalledTimes(1);
    expect(listRepository.findOneById).toBeCalledTimes(1);
    expect(promise).toEqual("test");
  });
});
