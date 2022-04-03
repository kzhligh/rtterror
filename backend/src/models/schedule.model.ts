import sequelize from "src/modules/sequelize";
import {DataTypes} from "sequelize";
import EmployeeModel from "src/models/employee";

export const Schedule = sequelize.define(
    'schedules',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        start_date: {
            type: DataTypes.DATEONLY
        },
        end_date: {
            type: DataTypes.DATEONLY
        },
        start_time: {
            type: DataTypes.TIME
        },
        end_time: {
            type: DataTypes.TIME
        },
        action:{
            type: DataTypes.ENUM<string>('work', 'off'),
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

Schedule.belongsTo(EmployeeModel , {
    foreignKey: "employeeId",
});