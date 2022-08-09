import bcrypt from "bcrypt";

import {
  conflictError,
  unauthorizedError,
  unprocessableError,
} from "../middlewares/handleErrorsMiddleware.js";
import residentRepository from "../repositories/residentRepository.js";
import { LoginData } from "../schemas/loginSchema.js";
import { ResidentData } from "../schemas/residentSchema.js";
import tokenAPI from "../utils/tokenAPI.js";

async function signUpResident(residentInfo: ResidentData) {
  const SALT = 13;
  const registeredResident = await residentRepository.findById(residentInfo.id);

  if (!bcrypt.compareSync(residentInfo.cpf, registeredResident.cpf)) {
    throw conflictError("Wrong cpf informed!");
  }

  if (!!registeredResident.password) {
    throw unauthorizedError("Resident has already signed up!");
  }

  if (residentInfo.password !== residentInfo.confirmPassword) {
    unprocessableError("The password confirmation doesn't match!");
  }

  if (!registeredResident.isLiving) {
    throw unauthorizedError(
      "This resident is currently not living in the building!"
    );
  }

  const residentId = residentInfo.id;
  const residentSignUpData = {
    email: residentInfo.email,
    password: bcrypt.hashSync(residentInfo.password, SALT),
  };

  await residentRepository.register(residentId, residentSignUpData);
}

async function loginResident(loginInfo: LoginData) {
  const registeredResident = await residentRepository.findByEmail(
    loginInfo.email,
    loginInfo.buildingId
  );

  if (!registeredResident) {
    throw unprocessableError("Email not registered!");
  }

  if (!bcrypt.compareSync(loginInfo.password, registeredResident.password)) {
    throw unauthorizedError("Wrong password!");
  }

  return tokenAPI.generateToken(registeredResident.id);
}

const authService = { signUpResident, loginResident };
export default authService;
