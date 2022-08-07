import Joi from "joi";

export interface LoginData {
  buildingId: number;
  email: string;
  password: string;
}

const loginSchema = Joi.object<LoginData>({
  buildingId: Joi.number().integer().greater(0).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default loginSchema;
