import Joi from "joi";
import { ClientType } from "../types/client.type";

const id = Joi.number();
const name = Joi.string().min(2).max(100);
const lastName = Joi.string().min(2).max(100);
const email = Joi.string().min(2).max(70);
const password = Joi.string().min(2).max(70);

const createClientSchema = Joi.object<Omit<ClientType, "id">, true>({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
});

const updateClientSchema = Joi.object<
  Omit<ClientType, "id" | "email" | "password">,
  true
>({
  name: name.required(),
  lastName: lastName.required(),
});

const getClientSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getClientByEmailAndPassword = Joi.object<
  { email: string; password: string },
  true
>({
  email: email.required(),
  password: password.required(),
});

export default {
  createClientSchema,
  updateClientSchema,
  getClientSchema,
  getClientByEmailAndPassword,
};
