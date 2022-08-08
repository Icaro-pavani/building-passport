import { Router } from "express";
import { addNewList, getResidentLists } from "../controllers/listController.js";
import validSchema from "../middlewares/validSchema.js";
import validToken from "../middlewares/validToken.js";
import listSchema from "../schemas/listSchema.js";

const listRouter = Router();

listRouter.get("/lists", validToken, getResidentLists);
listRouter.post("/lists", validToken, validSchema(listSchema), addNewList);

export default listRouter;
