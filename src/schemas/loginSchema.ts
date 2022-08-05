import Joi from "joi";

export interface LoginData {
  email: string;
  password: string;
}

const loginSchema = Joi.object<LoginData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default loginSchema;
