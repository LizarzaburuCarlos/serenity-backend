import sequelize from "../../libs/sequelize";
import boom from "@hapi/boom";
import { ReserveType } from "../types/reserve.type";

const { models } = sequelize;

class ReserveService {
  constructor() {}

  async findAll() {
    const rta = await models.RESERVE.findAll();
    return rta;
  }

  async findOne(id: string) {
    const reserve = await models.RESERVE.findByPk(id);

    if (!reserve) {
      throw boom.notFound("Reserva no encontrada");
    }
    return reserve;
  }

  async create(data: ReserveType) {
    const newReserve = await models.RESERVE.create(data);
    return newReserve;
  }

  async update(id: string, changes: ReserveType) {
    const reserve = await this.findOne(id);
    const rta = await reserve.update(changes);

    return rta;
  }

  async updateState(id: string, state: string) {
    const reserve = await this.findOne(id);
    const values = reserve.dataValues;
    const rta = await reserve.update({ ...values, state });

    return rta;
  }

  async delete(id: string) {
    const reserve = await this.findOne(id);
    await reserve.destroy();

    return { id };
  }

  async findByClient(clientId: string) {
    const reserves = await models.RESERVE.findAll({
      where: {
        clientId: clientId,
      },
    });

    if (reserves.length === 0) {
      throw boom.notFound(
        "No se encontraron reservas para el ID de cliente proporcionado"
      );
    }

    return reserves;
  }
  async findByUser(userId: string) {
    const reserves = await models.RESERVE.findAll({
      where: {
        userId: userId,
      },
      include: [{ model: models.CLIENT, as: "client" }],
    });

    if (reserves.length === 0) {
      throw boom.notFound(
        "No se encontraron reservas para el ID de usario proporcionado"
      );
    }

    return reserves;
  }
}

export default ReserveService;
