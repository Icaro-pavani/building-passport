import { Router } from "express";
import { getResidentLists } from "../controllers/listController.js";
import validToken from "../middlewares/validToken.js";

const listRouter = Router();

listRouter.get("/lists", validToken, getResidentLists);

export default listRouter;
