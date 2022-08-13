import { jest } from "@jest/globals";
import bcrypt from "bcrypt";
import residentRepository from "../../src/repositories/residentRepository.js";
import residentService from "../../src/services/authService.js";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("authorization suite", () => {
  it("given resident information, sign up", async () => {
    jest.spyOn(bcrypt, "compareSync").mockImplementation(() => true);
    jest
      .spyOn(residentRepository, "findById")
      .mockImplementation((): any => ({ isLiving: true }));
    jest
      .spyOn(residentRepository, "register")
      .mockImplementation((): any => true);
    jest.spyOn(bcrypt, "hashSync").mockImplementation(() => "teste");

    const resident = {
      id: 1,
      cpf: "89217389217",
      email: "test@test.cc",
      password: "test",
      confirmPassword: "test",
    };

    const promise = await residentService.signUpResident(resident);
    expect(bcrypt.compareSync).toBeCalledTimes(1);
    expect(bcrypt.hashSync).toBeCalledTimes(1);
    expect(residentRepository.findById).toBeCalledTimes(1);
    expect(residentRepository.register).toBeCalledTimes(1);
  });

  it("given resident information with wrong cpf, fail sign up", () => {
    jest.spyOn(bcrypt, "compareSync").mockImplementation(() => false);
    jest
      .spyOn(residentRepository, "findById")
      .mockImplementation((): any => ({ isLiving: true }));

    const resident = {
      id: 1,
      cpf: "89217389217",
      email: "test@test.cc",
      password: "test",
      confirmPassword: "test",
    };

    const promise = residentService.signUpResident(resident);
    expect(promise).rejects.toEqual({
      type: "conflict",
      message: "Wrong cpf informed!",
    });
  });

  it("given resident information already registered, fail sign up", () => {
    jest.spyOn(bcrypt, "compareSync").mockImplementation(() => true);
    jest
      .spyOn(residentRepository, "findById")
      .mockImplementation((): any => ({ isLiving: true, password: true }));

    const resident = {
      id: 1,
      cpf: "89217389217",
      email: "test@test.cc",
      password: "test",
      confirmPassword: "test",
    };

    const promise = residentService.signUpResident(resident);
    expect(promise).rejects.toEqual({
      type: "unauthorized",
      message: "Resident has already signed up!",
    });
  });

  it("given resident information with missmatch password and confirmation, fail sign up", () => {
    jest.spyOn(bcrypt, "compareSync").mockImplementation(() => true);
    jest
      .spyOn(residentRepository, "findById")
      .mockImplementation((): any => ({ isLiving: true }));

    const resident = {
      id: 1,
      cpf: "89217389217",
      email: "test@test.cc",
      password: "test",
      confirmPassword: "test12",
    };

    const promise = residentService.signUpResident(resident);
    expect(promise).rejects.toEqual({
      type: "unprocessable",
      message: "The password confirmation doesn't match!",
    });
  });

  it("given resident information that is not living in the building, fail sign up", () => {
    jest.spyOn(bcrypt, "compareSync").mockImplementation(() => true);
    jest
      .spyOn(residentRepository, "findById")
      .mockImplementation((): any => ({ isLiving: false }));

    const resident = {
      id: 1,
      cpf: "89217389217",
      email: "test@test.cc",
      password: "test",
      confirmPassword: "test",
    };

    const promise = residentService.signUpResident(resident);
    expect(promise).rejects.toEqual({
      type: "unauthorized",
      message: "This resident is currently not living in the building!",
    });
  });

  it("given resident login information, log in resident", async () => {
    jest
      .spyOn(residentRepository, "findByEmail")
      .mockImplementation((): any => ({
        id: 1,
      }));
    jest.spyOn(bcrypt, "compareSync").mockImplementation(() => true);

    const residentInfo = {
      email: "test@test.cc",
      password: "test",
      buildingId: 1,
    };

    const promise = await residentService.loginResident(residentInfo);
    expect(residentRepository.findByEmail).toBeCalledTimes(1);
    expect(promise).not.toBeNull();
  });

  it("given resident login information with e-mail not registered, fail to log in resident", () => {
    jest
      .spyOn(residentRepository, "findByEmail")
      .mockImplementation((): any => false);
    jest.spyOn(bcrypt, "compareSync").mockImplementation(() => true);

    const residentInfo = {
      email: "test@test.cc",
      password: "test",
      buildingId: 1,
    };

    const promise = residentService.loginResident(residentInfo);
    expect(promise).rejects.toEqual({
      type: "unprocessable",
      message: "Email not registered!",
    });
  });

  it("given resident login information with wrong password, fail to log in resident", () => {
    jest
      .spyOn(residentRepository, "findByEmail")
      .mockImplementation((): any => ({ id: 1 }));
    jest.spyOn(bcrypt, "compareSync").mockImplementation(() => false);

    const residentInfo = {
      email: "test@test.cc",
      password: "test",
      buildingId: 1,
    };

    const promise = residentService.loginResident(residentInfo);
    expect(promise).rejects.toEqual({
      type: "unauthorized",
      message: "Wrong password!",
    });
  });
});
