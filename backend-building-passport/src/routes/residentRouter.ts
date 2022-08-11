import { Router } from "express";
import {
  getAllResidentsFromBuilding,
  getResidentsByBuilding,
} from "../controllers/residentController.js";
import validBuildingToken from "../middlewares/validBuildingToken.js";

const residentRouter = Router();

residentRouter.get(
  "/residents",
  validBuildingToken,
  getAllResidentsFromBuilding
);
residentRouter.get("/residents/:id", getResidentsByBuilding);

export default residentRouter;
