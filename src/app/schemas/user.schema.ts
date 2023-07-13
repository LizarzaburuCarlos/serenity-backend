import Joi from "joi";
import { UserType } from "../types/user.type";

const id = Joi.number();
const name = Joi.string().min(2).max(100);
const lastName = Joi.string().min(2).max(100);
const rol = Joi.string().max(50);
const email = Joi.string().min(2).max(70);
const password = Joi.string().min(2).max(70);

const createUserSchema = Joi.object<Omit<UserType, "id">, true>({
  name: name.required(),
  lastName: lastName.required(),
  rol: rol.optional(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object<
  Omit<UserType, "id" | "email" | "password">,
  true
>({
  name: name.required(),
  lastName: lastName.required(),
  rol: rol.optional(),
});

const getUserSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getUserByEmailAndPassword = Joi.object<
  { email: string; password: string },
  true
>({
  email: email.required(),
  password: password.required(),
});

export default {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  getUserByEmailAndPassword,
};
