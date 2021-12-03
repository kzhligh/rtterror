const { sequelize } = require('../modules/sequelize');
const { DataTypes } = require('sequelize');

const Appointment = sequelize.define(
  'appointments',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    plan: {
      type: DataTypes.STRING,
    },
    therapist: {
      type: DataTypes.STRING,
    },
    branchLocation: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
    },
    feedback: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM(['COMPLETED', 'CANCELLED', 'NO_SHOW']),
    },
    cancellationTime: {
      type: DataTypes.DATE,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  Appointment,
};
