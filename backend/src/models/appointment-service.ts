import { Model } from "sequelize";
import sequelize from "src/modules/sequelize";
import AppointmentModel from "src/models/appointment";
import ServiceModel from "src/models/service";

export default class AppointmentServiceModel extends Model {}

AppointmentServiceModel.init(
  {},
  {
    sequelize,
    timestamps: true,
    tableName: 'appointment_service',
    modelName: 'appointment_service',
  }
);

AppointmentModel.belongsToMany(ServiceModel, {
  through: AppointmentServiceModel,
  foreignKey: 'appointment_id'
});

ServiceModel.belongsToMany(AppointmentModel, {
  through: AppointmentServiceModel,
  foreignKey: 'service_id'
});