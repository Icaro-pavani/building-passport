import { Router } from "express";
import {
  addNewResident,
  getAllResidentsFromBuilding,
  getResidentsByBuilding,
} from "../controllers/residentController.js";
import validBuildingToken from "../middlewares/validBuildingToken.js";
import validSchema from "../middlewares/validSchema.js";
import addResidentSchema from "../schemas/addResidentSchema.js";

const residentRouter = Router();

residentRouter.get(
  "/residents",
  validBuildingToken,
  getAllResidentsFromBuilding
);
residentRouter.get("/residents/:id", getResidentsByBuilding);
residentRouter.post(
  "/residents",
  validBuildingToken,
  validSchema(addResidentSchema),
  addNewResident
);

export default residentRouter;
