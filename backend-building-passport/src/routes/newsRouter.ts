import { Router } from "express";
import {
  getNewsByBuilding,
  getNewsByResident,
} from "../controllers/newsController.js";
import validBuildingToken from "../middlewares/validBuildingToken.js";
import validToken from "../middlewares/validToken.js";

const newsRouter = Router();

newsRouter.get("/news", validToken, getNewsByResident);
newsRouter.get("/buildings/news", validBuildingToken, getNewsByBuilding);

export default newsRouter;
