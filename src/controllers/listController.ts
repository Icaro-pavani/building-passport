import { Resident } from "@prisma/client";
import { Request, Response } from "express";
import listService from "../services/listService.js";

export async function getResidentLists(req: Request, res: Response) {
  const resident: Resident = res.locals.resident;
  const lists = await listService.getAllResidentList(resident.id);

  res.status(200).send({ lists });
}
