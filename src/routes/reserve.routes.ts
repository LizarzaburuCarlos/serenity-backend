import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import reserveSchema from "../app/schemas/reserve.schema";
import ReserveService from "../app/services/reserve.service";

const {
  getReserveSchema,
  createReserveSchema,
  updateReserveSchema,
  updateReserveStateSchema,
} = reserveSchema;
const router = express.Router();
const service = new ReserveService();

router.get("/", async (req, res, next) => {
  try {
    const reserves = await service.findAll();
    res.json(reserves);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getReserveSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const reserve = await service.findOne(id);
      res.json(reserve);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createReserveSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newReserve = await service.create(body);
      res.status(201).json(newReserve);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getReserveSchema, "params"),
  validatorHandler(updateReserveSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const reserve = await service.update(id, body);
      res.json(reserve);
    } catch (error) {
      next(error);
    }
  }
);


router.get(
  "/client/:id",
  validatorHandler(getReserveSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const reserves = await service.findByClient(id);
      res.json(reserves);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/user/:id",
  validatorHandler(getReserveSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const reserves = await service.findByUser(id);
      res.json(reserves);
    } catch (error) {
      next(error);
    }
  }
);
//MODALITY: MORNING, AFTERNOON, NIGHT
//STATE: PENDING, ACCEPTED, REFUSED, DONE
router.put(
  "/state/:id",
  validatorHandler(getReserveSchema, "params"),
  validatorHandler(updateReserveStateSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const reserve = await service.updateState(id, body.state);
      res.json(reserve);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getReserveSchema, "params"),
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
