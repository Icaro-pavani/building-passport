import { Router } from "express";
import authRouter from "./authRouter.js";
import buildingRouter from "./buildingRouter.js";
import residentRouter from "./residentRouter.js";

const router = Router();

router.use(authRouter);
router.use(buildingRouter);
router.use(residentRouter);

export default router;
