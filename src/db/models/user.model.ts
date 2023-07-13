import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { UserType } from "../../app/types/user.type";

const USER_TABLE = "USER";

const UserSchema: ModelAttributes<User, UserType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_user",
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
  rol: {
    allowNull: false,
    type: DataTypes.STRING(50),
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

class User extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.hasMany(models.SCHEDULE, {
      as: "schedule",
      foreignKey: "userId",
    });

    this.hasMany(models.RESERVE, {
      as: "reserve",
      foreignKey: "userId",
    });

    this.hasMany(models.ACADEMIC_INFORMATION, {
      as: "academicInformation",
      foreignKey: "userId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: USER_TABLE,
      timestamps: false,
    };
  }
}

export default { USER_TABLE, UserSchema, User };
