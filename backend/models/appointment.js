const { sequelize } = require('../modules/sequelize');
const { DataTypes } = require('sequelize');

const Appointment = sequelize.define('appointments', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'customers',
      key: 'id',
    },
  },
});

module.exports = {
  Appointment,
};
