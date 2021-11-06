const { DataTypes } = require('sequelize');
const { sequelize } = require('../modules/sequelize');

const Combo = sequelize.define(
  'combos',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    serviceCode: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    total_duration: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    barcode: {
      type: DataTypes.STRING,
    },
    sms_description: {
      type: DataTypes.STRING,
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      required: true,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = { Combo };
