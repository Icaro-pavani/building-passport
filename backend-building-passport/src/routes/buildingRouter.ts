import { Router } from "express";
import {
  getBuildinds,
  loginBuildingAdm,
} from "../controllers/buildingControlle.js";
import validSchema from "../middlewares/validSchema.js";
import buildingSchema from "../schemas/buildingSchema.js";

const buildingRouter = Router();

buildingRouter.get("/buildings", getBuildinds);
buildingRouter.post("/buildings", validSchema(buildingSchema), loginBuildingAdm);

export default buildingRouter;
