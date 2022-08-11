import { Request, Response } from "express";
import { BuildingData } from "../schemas/buildingSchema.js";
import buildingService from "../services/buildingService.js";

export async function getBuildinds(req: Request, res: Response) {
  const buildings = await buildingService.obtainBuildings();

  res.status(200).send({ buildings });
}

export async function loginBuildingAdm(req: Request, res: Response) {
  const { key }: BuildingData = res.locals.body;
  const buildingToken = await buildingService.getBuildingByKey(key);

  res.status(200).send({ buildingToken });
}
