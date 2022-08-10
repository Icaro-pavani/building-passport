import { Request, Response } from "express";
import { unprocessableError } from "../middlewares/handleErrorsMiddleware.js";
import { GuestUpdateData } from "../schemas/guestSchema.js";
import guestService from "../services/guestService.js";

export async function getGuestFromToken(req: Request, res: Response) {
  const guestToken = req.headers.authorization.replace("Bearer ", "").trim();
  if (!guestToken) {
    throw unprocessableError("Missing Token!");
  }
  const guestListInfo = await guestService.getGuestListInfo(guestToken);

  res.status(200).send({ guestListInfo });
}

export async function confirmGuest(req: Request, res: Response) {
  const guestInfo: GuestUpdateData = res.locals.body;
  const guestToken = req.headers.authorization.replace("Bearer ", "").trim();
  if (!guestToken) {
    throw unprocessableError("Missing Token!");
  }

  await guestService.confirmAndUpdateGuest(guestToken, guestInfo);

  res.sendStatus(200);
}
