import { Router } from "express";
import authRouter from "./authRouter.js";
import buildingRouter from "./buildingRouter.js";
import newsRouter from "./newsRouter.js";
import residentRouter from "./residentRouter.js";

const router = Router();

router.use(authRouter);
router.use(buildingRouter);
router.use(residentRouter);
router.use(newsRouter);

export default router;
