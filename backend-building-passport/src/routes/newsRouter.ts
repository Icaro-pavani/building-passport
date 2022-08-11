import { Router } from "express";
import {
  addNewsToBuilding,
  getNewsByBuilding,
  getNewsByResident,
} from "../controllers/newsController.js";
import validBuildingToken from "../middlewares/validBuildingToken.js";
import validSchema from "../middlewares/validSchema.js";
import validToken from "../middlewares/validToken.js";
import newsSchema from "../schemas/newsSchema.js";

const newsRouter = Router();

newsRouter.get("/news", validToken, getNewsByResident);
newsRouter.get("/buildings/news", validBuildingToken, getNewsByBuilding);
newsRouter.post(
  "/news",
  validBuildingToken,
  validSchema(newsSchema),
  addNewsToBuilding
);

export default newsRouter;
