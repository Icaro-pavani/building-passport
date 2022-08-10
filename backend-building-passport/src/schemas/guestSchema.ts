import { Guest } from "@prisma/client";
import Joi from "joi";

export type GuestUpdateData = Omit<Guest, "id" | "cel">;

const guestSchema = Joi.object<GuestUpdateData>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  cpf: Joi.string()
    .pattern(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/)
    .required(),
});

export default guestSchema;
