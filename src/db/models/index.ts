import { Sequelize } from "sequelize";
import userModel from "./user.model";
import clientModel from "./client.model";
import scheduleModel from "./schedule.model";
import reserveModel from "./reserve.model";
import academicInformationModel from "./academic-information.model";

const { User, UserSchema } = userModel;
const { Client, ClientSchema } = clientModel;
const { Schedule, ScheduleSchema } = scheduleModel;
const { Reserve, ReserveSchema } = reserveModel;
const { AcademicInformation, AcademicInformationSchema } =
  academicInformationModel;

export const setupModels = (sequelize: Sequelize) => {
  User.init(UserSchema, User.config(sequelize));
  Client.init(ClientSchema, Client.config(sequelize));
  Schedule.init(ScheduleSchema, Schedule.config(sequelize));
  Reserve.init(ReserveSchema, Reserve.config(sequelize));
  AcademicInformation.init(
    AcademicInformationSchema,
    AcademicInformation.config(sequelize)
  );

  User.associate(sequelize.models);
  Client.associate(sequelize.models);
  Schedule.associate(sequelize.models);
  Reserve.associate(sequelize.models);
  AcademicInformation.associate(sequelize.models);
};
