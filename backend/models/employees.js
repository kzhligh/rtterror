const { DataTypes } = require('sequelize');
const { sequelize } = require('../modules/sequelize.js');
const { Service } = require('./service.js');

const Employee = sequelize.define(
  'employees',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    speciality: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = { Employee };
