import { Model } from 'sequelize';
import sequelize from 'src/modules/sequelize';
import AppointmentModel from 'src/models/appointment';
import EmployeeModel from 'src/models/employee';

export default class AppointmentEmployeeModel extends Model {}

AppointmentEmployeeModel.init(
  {},
  {
    sequelize,
    timestamps: true,
    tableName: 'appointment_employee',
    modelName: 'appointment_employee',
  }
);

AppointmentModel.belongsToMany(EmployeeModel, {
  through: AppointmentEmployeeModel,
  foreignKey: 'appointment_id',
});

EmployeeModel.belongsToMany(AppointmentModel, {
  through: AppointmentEmployeeModel,
  foreignKey: 'employee_id',
});
