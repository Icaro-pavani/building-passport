import { Request, Response } from "express";
import { LoginData } from "../schemas/loginSchema.js";
import { ResidentData } from "../schemas/residentSchema.js";
import authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
  const residentInfo: ResidentData = res.locals.body;
  await authService.signUpResident(residentInfo);

  res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
  const loginInfo: LoginData = res.locals.body;
  const token = await authService.loginResident(loginInfo);

  res.status(200).send({ token });
}
