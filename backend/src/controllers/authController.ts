import { Request, Response } from "express";
import { ResidentData } from "../schemas/residentSchema.js";
import authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
  const residentInfo: ResidentData = res.locals.body;
  await authService.signUpResident(residentInfo);

  res.sendStatus(201);
}
