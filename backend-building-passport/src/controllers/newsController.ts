import { Building, Resident } from "@prisma/client";
import { Request, Response } from "express";
import { unprocessableError } from "../middlewares/handleErrorsMiddleware.js";
import { NewsData } from "../schemas/newsSchema.js";
import newsService from "../services/newsService.js";

export async function getNewsByResident(req: Request, res: Response) {
  const resident: Resident = res.locals.resident;
  const news = await newsService.getAllNewsByBuildingId(resident.buildingId);

  res.status(200).send({ news });
}

export async function getNewsByBuilding(req: Request, res: Response) {
  const building: Building = res.locals.building;
  const news = await newsService.getAllNewsByBuildingId(building.id);

  res.status(200).send({ news });
}

export async function addNewsToBuilding(req: Request, res: Response) {
  const building: Building = res.locals.building;
  const newsInfo: NewsData = res.locals.body;

  await newsService.addNews(building.id, newsInfo);

  res.sendStatus(201);
}

export async function deleteNewsFromBuilding(req: Request, res: Response) {
  const newsId: number = parseInt(req.params.id);
  if (!newsId) {
    throw unprocessableError("Invalid Id!");
  }

  await newsService.deleteNews(newsId);

  res.sendStatus(200);
}
