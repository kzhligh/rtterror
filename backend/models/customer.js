const { DataTypes } = require('sequelize');
const sequelize = require('../modules/sequelizeClient.js');

const Customer = sequelize.define(
  'customers',
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
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Customer;
