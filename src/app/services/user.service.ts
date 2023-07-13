import sequelize from "../../libs/sequelize";
import boom from "@hapi/boom";
import { UserType } from "../types/user.type";

const { models } = sequelize;

class UserService {
  constructor() {}

  async findAll() {
    const rta = await models.USER.findAll();
    return rta;
  }

  async findOne(id: string) {
    const user = await models.USER.findByPk(id);

    if (!user) {
      throw boom.notFound("Usuario no encontrado");
    }
    return user;
  }

  async findByEmailAndPassword(email: string, password: string) {
    const user = await models.USER.findOne({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw boom.notFound("Usuario no encontrado");
    }
    return user;
  }

  async create(data: UserType) {
    const newUser = await models.USER.create(data);
    return newUser;
  }

  async update(id: string, changes: UserType) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);

    return rta;
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    await user.destroy();

    return { id };
  }
}

export default UserService;
