import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import academicInformationSchema from "../app/schemas/academic-information.schema";
import AcademicInformationService from "../app/services/academic-information.service";

const {
  getAcademicInformationSchema,
  createAcademicInformationSchema,
  updateAcademicInformationSchema,
} = academicInformationSchema;
const router = express.Router();
const service = new AcademicInformationService();

router.get("/", async (req, res, next) => {
  try {
    const academicInformations = await service.findAll();
    res.json(academicInformations);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getAcademicInformationSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const academicInformation = await service.findOne(id);
      res.json(academicInformation);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/user/:userId",
  validatorHandler(getAcademicInformationSchema, "params"),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const academicInformation = await service.findOneByIdUser(userId);
      res.json(academicInformation);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createAcademicInformationSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newAcademicInformation = await service.create(body);
      res.status(201).json(newAcademicInformation);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getAcademicInformationSchema, "params"),
  validatorHandler(updateAcademicInformationSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const academicInformation = await service.update(id, body);
      res.json(academicInformation);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getAcademicInformationSchema, "params"),
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
