import { Router } from "express";
import { getBuildinds } from "../controllers/buildingControlle.js";

const buildingRouter = Router();

buildingRouter.get("/buildings", getBuildinds);

export default buildingRouter;
