const { DataTypes } = require('sequelize');
const { sequelize } = require('../modules/sequelize.js');
const { Appointment } = require('./appointment.js');

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
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.ENUM(['M', 'F', 'N/A']),
    },
    address: {
      type: DataTypes.STRING,
    },
    postalCode: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    confirmationType: {
      type: DataTypes.ENUM(['SMS', 'email']),
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Customer?.hasMany(Appointment);
Appointment?.belongsTo(Customer);

module.exports = { Customer };
