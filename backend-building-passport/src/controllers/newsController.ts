import { Resident } from "@prisma/client";
import { Request, Response } from "express";
import newsService from "../services/newsService.js";

export async function getNewsByResident(req: Request, res: Response) {
  const resident: Resident = res.locals.resident;
  const news = await newsService.getAllNewsByBuildingId(resident.buildingId);

  res.status(200).send({ news });
}
