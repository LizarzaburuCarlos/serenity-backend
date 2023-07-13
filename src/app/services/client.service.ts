import sequelize from "../../libs/sequelize";
import boom from "@hapi/boom";
import { ClientType } from "../types/client.type";

const { models } = sequelize;

class ClientService {
  constructor() {}

  async findAll() {
    const rta = await models.CLIENT.findAll();
    return rta;
  }

  async findOne(id: string) {
    const client = await models.CLIENT.findByPk(id);

    if (!client) {
      throw boom.notFound("Usuario no encontrado");
    }
    return client;
  }

  async findByEmailAndPassword(email: string, password: string) {
    const client = await models.CLIENT.findOne({
      where: {
        email,
        password,
      },
    });

    if (!client) {
      throw boom.notFound("Usuario no encontrado");
    }
    return client;
  }

  async create(data: ClientType) {
    const newClient = await models.CLIENT.create(data);
    return newClient;
  }

  async update(id: string, changes: ClientType) {
    const client = await this.findOne(id);
    const rta = await client.update(changes);

    return rta;
  }

  async delete(id: string) {
    const client = await this.findOne(id);
    await client.destroy();

    return { id };
  }
}

export default ClientService;
