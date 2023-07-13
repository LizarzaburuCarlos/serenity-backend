import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import clientSchema from "../app/schemas/client.schema";
import ClientService from "../app/services/client.service";

const {
  getClientSchema,
  createClientSchema,
  updateClientSchema,
  getClientByEmailAndPassword,
} = clientSchema;
const router = express.Router();
const service = new ClientService();

router.get("/", async (req, res, next) => {
  try {
    const clients = await service.findAll();
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:email/:password",
  validatorHandler(getClientByEmailAndPassword, "params"),
  async (req, res, next) => {
    try {
      const { email, password } = req.params;
      const client = await service.findByEmailAndPassword(email, password);
      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validatorHandler(getClientSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const client = await service.findOne(id);
      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createClientSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newClient = await service.create(body);
      res.status(201).json(newClient);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getClientSchema, "params"),
  validatorHandler(updateClientSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const client = await service.update(id, body);
      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getClientSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
