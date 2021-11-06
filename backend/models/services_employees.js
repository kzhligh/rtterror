const { DataTypes } = require('sequelize');
const { sequelize } = require('../modules/sequelize');
const { Service } = require('./service.js');
const { Employee } = require('./employees.js');

const ServiceEmployee = sequelize.define(
  'services_employees',
  {},
  {
    timestamps: true,
    freezeTableName: true,
  }
);

Employee.belongsToMany(Service, {
  through: 'services_employees'
});

Service.belongsToMany(Employee, {
  through: 'services_employees'
});

module.exports = { ServiceEmployee };