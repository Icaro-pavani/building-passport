import { Router } from "express";
import { login, signUp } from "../controllers/authController.js";
import validSchema from "../middlewares/validSchema.js";
import loginSchema from "../schemas/loginSchema.js";
import residentSchema from "../schemas/residentSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validSchema(residentSchema), signUp);
authRouter.post("/login", validSchema(loginSchema), login);

export default authRouter;
