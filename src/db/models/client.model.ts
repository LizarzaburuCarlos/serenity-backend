import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ClientType } from "../../app/types/client.type";

const CLIENT_TABLE = "CLIENT";

const ClientSchema: ModelAttributes<Client, ClientType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_client",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  lastName: {
    allowNull: false,
    field: "last_name",
    type: DataTypes.STRING(100),
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(70),
  },
  password: {
    allowNull: false,
    type: DataTypes.TEXT("tiny"),
  },
};

class Client extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.hasMany(models.RESERVE, {
      as: "reserve",
      foreignKey: "clientId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CLIENT_TABLE,
      modelName: CLIENT_TABLE,
      timestamps: false,
    };
  }
}

export default { CLIENT_TABLE, ClientSchema, Client };
