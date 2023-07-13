import sequelize from "../../libs/sequelize";
import boom from "@hapi/boom";
import { ScheduleType } from "../types/schedule.type";

const { models } = sequelize;

class ScheduleService {
  constructor() {}

  async findAll() {
    const rta = await models.SCHEDULE.findAll();
    return rta;
  }

  async findOne(id: string) {
    const schedule = await models.SCHEDULE.findByPk(id);

    if (!schedule) {
      throw boom.notFound("Horario no encontrado");
    }
    return schedule;
  }

  async findOneByIdUser(userId: string){
    const schedule = await models.SCHEDULE.findOne({
      where: {
        userId: userId,
      },
    });
    if (!schedule) {
      throw boom.notFound("Horario no encontrado para ese userId proporcionado");
    }
    return schedule;
  }


  async create(data: ScheduleType) {
    const newSchedule = await models.SCHEDULE.create(data);
    return newSchedule;
  }

  async update(id: string, changes: ScheduleType) {
    const schedule = await this.findOne(id);
    const rta = await schedule.update(changes);

    return rta;
  }

  async delete(id: string) {
    const schedule = await this.findOne(id);
    await schedule.destroy();

    return { id };
  }
}

export default ScheduleService;
