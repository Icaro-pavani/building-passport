import Joi from "joi";

export interface NewsData {
  title: string;
  description: string;
}

const newsSchema = Joi.object<NewsData>({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export default newsSchema;
