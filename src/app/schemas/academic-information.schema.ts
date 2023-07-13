import Joi from "joi";
import { AcademicInformationType } from "../types/academic-information.type";

const id = Joi.number();
const title = Joi.string().min(2).max(150);
const institution = Joi.string().min(2).max(150);
const description = Joi.string();
const date = Joi.date();
const userId = Joi.number();

const createAcademicInformationSchema = Joi.object<
  Omit<AcademicInformationType, "id">,
  true
>({
  title: title.required(),
  institution: institution.required(),
  description: description.optional().empty("").allow(""),
  date: date.required(),
  userId: userId.required(),
});

const updateAcademicInformationSchema = Joi.object<
  Omit<AcademicInformationType, "id" | "userId">,
  true
>({
  title: title.required(),
  institution: institution.required(),
  description: description.optional().empty("").allow(""),
  date: date.required(),
});

const getAcademicInformationSchema = Joi.object({
  id: Joi.number(),
  userId: Joi.number(),
}).or("id", "userId").required();

export default {
  createAcademicInformationSchema,
  updateAcademicInformationSchema,
  getAcademicInformationSchema,
};
