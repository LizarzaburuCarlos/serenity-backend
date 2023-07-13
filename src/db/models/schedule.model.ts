import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ScheduleType } from "../../app/types/schedule.type";
import userModel from "./user.model";

const SCHEDULE_TABLE = "SCHEDULE";

const ScheduleSchema: ModelAttributes<Schedule, ScheduleType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_schedule",
    type: DataTypes.INTEGER,
  },
  days: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  dateStart: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  dateEnd: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  detail: {
    allowNull: true,
    type: DataTypes.TEXT("tiny"),
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

class Schedule extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.USER, { as: "user" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: SCHEDULE_TABLE,
      modelName: SCHEDULE_TABLE,
      timestamps: false,
    };
  }
}

export default { SCHEDULE_TABLE, ScheduleSchema, Schedule };
