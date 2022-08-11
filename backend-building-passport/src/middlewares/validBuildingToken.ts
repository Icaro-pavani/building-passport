import { NextFunction, Request, Response } from "express";
import buildingRepository from "../repositories/buildingRepository.js";
import tokenAPI from "../utils/tokenAPI.js";

export default async function validBuildingToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization.replace("Bearer ", "").trim();
    if (!token) {
      return res.status(422).send("Missing token!");
    }

    const BuildingInfo = await tokenAPI.decryptToken(token);
    const building = await buildingRepository.findBuildingById(BuildingInfo.id);

    if (!building) {
      return res.status(401).send("Invalid Token Information!");
    }

    res.locals.building = building;
  } catch (error) {
    return res.status(401).send("Invalid Token Information!");
  }

  next();
}
