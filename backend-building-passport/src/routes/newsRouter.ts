import { Router } from "express";
import { getNewsByResident } from "../controllers/newsController.js";
import validToken from "../middlewares/validToken.js";

const newsRouter = Router();

newsRouter.get("/news", validToken, getNewsByResident);

export default newsRouter;
