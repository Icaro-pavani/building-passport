import { Request, Response } from "express";
import residentService from "../services/residentService.js";

export async function getResidentsByBuilding(req: Request, res: Response) {
  const buildingId: number = parseInt(req.params.id);
  const residents = await residentService.getAllResidents(buildingId);

  res.status(200).send({ residents });
}
