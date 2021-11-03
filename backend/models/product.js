const { DataTypes } = require('sequelize');
const { sequelize } = require('../modules/sequelize');

const Product = sequelize.define(
  'products',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    inventory: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = { Product };
