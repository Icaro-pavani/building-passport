import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import validSchema from "../middlewares/validSchema.js";
import residentSchema from "../schemas/residentSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validSchema(residentSchema), signUp);

export default authRouter;
