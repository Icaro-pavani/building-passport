import { Building } from "@prisma/client";
import { Request, Response } from "express";
import { unprocessableError } from "../middlewares/handleErrorsMiddleware.js";
import residentService from "../services/residentService.js";

export async function getResidentsByBuilding(req: Request, res: Response) {
  const buildingId: number = parseInt(req.params.id);
  if (!buildingId) {
    throw unprocessableError("Invalid Id!");
  }
  const residents = await residentService.getAllLivingResidents(buildingId);

  res.status(200).send({ residents });
}

export async function getAllResidentsFromBuilding(req: Request, res: Response) {
  const building: Building = res.locals.building;

  const residents = await residentService.getAllBuildingResidents(building.id);

  res.status(200).send({ residents });
}
