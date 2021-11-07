const { DataTypes } = require('sequelize');
const { sequelize } = require('../modules/sequelize');
const { Service } = require('./service.js');
const { Employee } = require('./employees.js');

const ServiceEmployee = sequelize.define(
  'services_employees',
  {
    // employee_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   references: {
    //     model: 'services_employees',
    //     key: 'id',
    //   },
    // },
    // service_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   references: {
    //     model: 'services',
    //     key: 'id',
    //   },
    // },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

Employee.belongsToMany(Service, {
  through: ServiceEmployee,
  // foreignKey: 'id',
  // as: 'service',
});

Service.belongsToMany(Employee, {
  through: ServiceEmployee,
  // foreignKey: 'id',
  // as: 'employees',
});

module.exports = { ServiceEmployee };
