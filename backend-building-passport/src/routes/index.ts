import { Router } from "express";
import authRouter from "./authRouter.js";
import buildingRouter from "./buildingRouter.js";
import guestRouter from "./guestRouter.js";
import listRouter from "./listRouter.js";
import newsRouter from "./newsRouter.js";
import residentRouter from "./residentRouter.js";

const router = Router();

router.use(authRouter);
router.use(buildingRouter);
router.use(residentRouter);
router.use(newsRouter);
router.use(listRouter);
router.use(guestRouter);

export default router;
