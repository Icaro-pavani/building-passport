import Joi from "joi";
import { Guest } from "@prisma/client";

export type GuestData = Omit<Guest, "id" | "cpf" | "cel">;

export interface ListData {
  title: string;
  numberGuests: number;
  date: string;
  hour: string;
  guests: GuestData[];
}

const listSchema = Joi.object<ListData>({
  title: Joi.string().required(),
  numberGuests: Joi.number().integer().required(),
  date: Joi.string()
    .pattern(/^([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])$/)
    .required(),
  hour: Joi.string()
    .pattern(/^([0-1][0-9]|2[0-3]):([0-5][0-9])/)
    .required(),
  guests: Joi.array().items(
    Joi.object<GuestData>({
      email: Joi.string().email().required(),
      name: Joi.string().required(),
    })
  ),
});

export default listSchema;
