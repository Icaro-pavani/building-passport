import Joi from "joi";

export interface ResidentData {
  id: number;
  cpf: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const residentSchema = Joi.object<ResidentData>({
  id: Joi.number().integer().required(),
  cpf: Joi.string()
    .pattern(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export default residentSchema;
