import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import handleErrors from "./middlewares/handleErrorsMiddleware.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(handleErrors);

export default app;
