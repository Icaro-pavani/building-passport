import { BuildingKey } from "@prisma/client";
import Joi from "joi";

export type BuildingData = Omit<BuildingKey, "id" | "buildingId">;

const buildingSchema = Joi.object<BuildingData>({
  key: Joi.string().required(),
});

export default buildingSchema;
