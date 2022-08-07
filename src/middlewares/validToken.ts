import { NextFunction, Request, Response } from "express";
import residentRepository from "../repositories/residentRepository.js";
import tokenAPI from "../utils/tokenAPI.js";

export default async function validToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization.replace("Bearer ", "").trim();
    if (!token) {
      return res.status(422).send("Missing token!");
    }

    const residentInfo = await tokenAPI.decryptToken(token);
    const resident = await residentRepository.findById(residentInfo.id);

    if (!resident) {
      return res.status(401).send("Invalid Token Information!");
    }

    res.locals.resident = resident;
  } catch (error) {
    return res.status(401).send("Invalid Token Information!");
  }

  next();
}
