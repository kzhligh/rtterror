import { Model } from 'sequelize';
import sequelize from "src/modules/sequelize";
import ServiceModel from "src/models/service";
import EmployeeModel from "src/models/employee";

export default class EmployeeServiceModel extends Model {}

EmployeeServiceModel.init(
    {},
    {
        sequelize,
        timestamps: true,
        tableName: 'employee_service',
        modelName: 'employee_service',
    }
);

ServiceModel.belongsToMany(EmployeeModel, {
    through: EmployeeServiceModel,
    foreignKey: 'service_id'
});

EmployeeModel.belongsToMany(ServiceModel, {
    through: EmployeeServiceModel,
    foreignKey: 'employee_id'
});