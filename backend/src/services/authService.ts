import bcrypt from "bcrypt";

import {
  conflictError,
  unauthorizedError,
  unprocessableError,
} from "../middlewares/handleErrorsMiddleware.js";
import residentRepository from "../repositories/residentRepository.js";
import { ResidentData } from "../schemas/residentSchema.js";

async function signUpResident(residentInfo: ResidentData) {
  const SALT = 13;
  const registeredResident = await residentRepository.findById(residentInfo.id);

  if (registeredResident.cpf !== residentInfo.cpf) {
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
  delete residentInfo.id;
  delete residentInfo.confirmPassword;

  residentInfo.password = bcrypt.hashSync(residentInfo.password, SALT);

  await residentRepository.register(residentId, residentInfo);
}

const authService = { signUpResident };
export default authService;
