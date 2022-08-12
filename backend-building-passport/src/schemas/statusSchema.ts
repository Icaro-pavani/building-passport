import Joi from "joi";

export interface UpdateData {
  isLiving: boolean;
}

const updateSchema = Joi.object<UpdateData>({
  isLiving: Joi.boolean().required(),
});

export default updateSchema;
