import Joi from "joi";
import { ReserveType } from "../types/reserve.type";

const id = Joi.number();
const date = Joi.date();
const description = Joi.string();
const modality = Joi.string().min(2).max(150);
const state = Joi.string().min(2).max(100);
const clientId = Joi.number();
const userId = Joi.number();

const createReserveSchema = Joi.object<Omit<ReserveType, "id">, true>({
  date: date.required(),
  description: description.optional().empty("").allow(""),
  modality: modality.required(),
  state: state.required(),
  clientId: clientId.required(),
  userId: userId.required(),
});

const updateReserveSchema = Joi.object<
  Omit<ReserveType, "id" | "clientId" | "userId">,
  true
>({
  date: date.required(),
  description: description.optional().empty("").allow(""),
  modality: modality.required(),
  state: state.required(),
});

const updateReserveStateSchema = Joi.object<{ state: string }, true>({
  state: state.required(),
});

const getReserveSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createReserveSchema,
  updateReserveSchema,
  updateReserveStateSchema,
  getReserveSchema,
};
