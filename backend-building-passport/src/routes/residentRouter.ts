import { Router } from "express";
import {
  addNewResident,
  deleteResidentById,
  getAllResidentsFromBuilding,
  getResidentsByBuilding,
  updateResidentStatus,
} from "../controllers/residentController.js";
import validBuildingToken from "../middlewares/validBuildingToken.js";
import validSchema from "../middlewares/validSchema.js";
import addResidentSchema from "../schemas/addResidentSchema.js";
import updateSchema from "../schemas/statusSchema.js";

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
residentRouter.post(
  "/status/residents/:id",
  validBuildingToken,
  validSchema(updateSchema),
  updateResidentStatus
);
residentRouter.delete(
  "/delete/residents/:id",
  validBuildingToken,
  deleteResidentById
);

export default residentRouter;
