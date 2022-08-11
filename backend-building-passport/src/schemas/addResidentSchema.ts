import { Resident } from "@prisma/client";
import Joi from "joi";

export type AddResidentData = Omit<
  Resident,
  "id" | "buildingId" | "email" | "password" | "isLiving"
>;

const addResidentSchema = Joi.object<AddResidentData>({
  name: Joi.string().required(),
  apartment: Joi.string().required(),
  cpf: Joi.string()
    .pattern(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/)
    .required(),
});

export default addResidentSchema;
