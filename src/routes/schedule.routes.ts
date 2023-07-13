import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import scheduleSchema from "../app/schemas/schedule.schema";
import ScheduleService from "../app/services/schedule.service";

const { getScheduleSchema, createScheduleSchema, updateScheduleSchema } =
  scheduleSchema;
const router = express.Router();
const service = new ScheduleService();

router.get("/", async (req, res, next) => {
  try {
    const schedules = await service.findAll();
    res.json(schedules);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getScheduleSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const schedule = await service.findOne(id);
      res.json(schedule);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/user/:userId",
  validatorHandler(getScheduleSchema, "params"),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const schedule = await service.findOneByIdUser(userId);
      res.json(schedule);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  "/",
  validatorHandler(createScheduleSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSchedule = await service.create(body);
      res.status(201).json(newSchedule);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getScheduleSchema, "params"),
  validatorHandler(updateScheduleSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const schedule = await service.update(id, body);
      res.json(schedule);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getScheduleSchema, "params"),
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
