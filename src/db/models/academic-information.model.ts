import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { AcademicInformationType } from "../../app/types/academic-information.type";
import userModel from "./user.model";

const ACADEMIC_INFORMATION_TABLE = "ACADEMIC_INFORMATION";

const AcademicInformationSchema: ModelAttributes<
  AcademicInformation,
  AcademicInformationType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_academic_information",
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  institution: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT("tiny"),
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
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

class AcademicInformation extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.USER, { as: "user" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ACADEMIC_INFORMATION_TABLE,
      modelName: ACADEMIC_INFORMATION_TABLE,
      timestamps: false,
    };
  }
}

export default {
  ACADEMIC_INFORMATION_TABLE,
  AcademicInformationSchema,
  AcademicInformation,
};
