import { Router } from "express";
import { getResidentsByBuilding } from "../controllers/residentController.js";

const residentRouter = Router();

residentRouter.get("/residents/:id", getResidentsByBuilding);

export default residentRouter;
