import sequelize from "../../libs/sequelize";
import boom from "@hapi/boom";
import { AcademicInformationType } from "../types/academic-information.type";

const { models } = sequelize;

class AcademicInformationService {
  constructor() {}

  async findAll() {
    const rta = await models.ACADEMIC_INFORMATION.findAll();
    return rta;
  }

  async findOne(id: string) {
    const academicInformation = await models.ACADEMIC_INFORMATION.findByPk(id);

    if (!academicInformation) {
      throw boom.notFound("Información académica no encontrada");
    }
    return academicInformation;
  }

  async findOneByIdUser(userId: string){
    const academicInformation = await models.ACADEMIC_INFORMATION.findOne({
      where: {
        userId: userId,
      },
    });
    if (!academicInformation) {
      throw boom.notFound("Información académica no encontrada para ese userId proporcionado");
    }
    return academicInformation;
  }

  async create(data: AcademicInformationType) {
    const newAcademicInformation = await models.ACADEMIC_INFORMATION.create(
      data
    );
    return newAcademicInformation;
  }

  async update(id: string, changes: AcademicInformationType) {
    const academicInformation = await this.findOne(id);
    const rta = await academicInformation.update(changes);

    return rta;
  }

  async delete(id: string) {
    const academicInformation = await this.findOne(id);
    await academicInformation.destroy();

    return { id };
  }
}

export default AcademicInformationService;
