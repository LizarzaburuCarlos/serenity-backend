import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ReserveType } from "../../app/types/reserve.type";
import userModel from "./user.model";
import clientModel from "./client.model";

const RESERVE_TABLE = "RESERVE";

const ReserveSchema: ModelAttributes<Reserve, ReserveType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_reserve",
    type: DataTypes.INTEGER,
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT("tiny"),
  },
  modality: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  state: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  clientId: {
    allowNull: false,
    field: "client_id_client",
    type: DataTypes.INTEGER,
    references: {
      model: clientModel.CLIENT_TABLE,
      key: "id_client",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  userId: {
    allowNull: false,
    field: "user_id_user",
    type: DataTypes.INTEGER,
    references: {
      model: userModel.USER_TABLE,
      key: "id_user",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
};

class Reserve extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CLIENT, { as: "client" });

    this.belongsTo(models.USER, { as: "user" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: RESERVE_TABLE,
      modelName: RESERVE_TABLE,
      timestamps: false,
    };
  }
}

export default { RESERVE_TABLE, ReserveSchema, Reserve };
