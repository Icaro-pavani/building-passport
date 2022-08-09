import { Resident } from "@prisma/client";
import { Request, Response } from "express";
import { ListData } from "../schemas/listSchema.js";
import listService from "../services/listService.js";

export async function getResidentLists(req: Request, res: Response) {
  const resident: Resident = res.locals.resident;
  const lists = await listService.getAllResidentList(resident.id);

  res.status(200).send({ lists });
}

export async function addNewList(req: Request, res: Response) {
  const resident: Resident = res.locals.resident;
  const lists: ListData = res.locals.body;

  await listService.addList(resident, lists);

  res.sendStatus(201);
}
