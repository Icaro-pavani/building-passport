import { Router } from "express";
import authRouter from "./authRouter.js";
import buildingRouter from "./buildingRouter.js";

const router = Router();

router.use(authRouter);
router.use(buildingRouter);

export default router;
