import { Request, Response } from "express";
import buildingService from "../services/buildingService.js";

export async function getBuildinds(req: Request, res: Response) {
  const buildings = await buildingService.obtainBuildings();

  res.status(200).send({ buildings });
}
