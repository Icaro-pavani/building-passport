import { Router } from "express";
import {
  confirmGuest,
  getGuestFromToken,
} from "../controllers/guestController.js";
import validSchema from "../middlewares/validSchema.js";
import guestSchema from "../schemas/guestSchema.js";

const guestRouter = Router();

guestRouter.get("/guest", getGuestFromToken);
guestRouter.post("/guest", validSchema(guestSchema), confirmGuest);

export default guestRouter;
