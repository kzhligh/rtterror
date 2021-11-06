const { DataTypes } = require('sequelize');
const { sequelize } = require('../modules/sequelize');
const { Service } = require('./service');
const { Combo } = require('../models/combo');

const Service_Combo = sequelize.define(
  'service_combo',
  {
    quantity: {
      type: DataTypes.INTEGER,
      required: true,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

Service.belongsToMany(Combo, { through: Service_Combo });
Combo.belongsToMany(Service, { through: Service_Combo });

module.exports = { Service_Combo };
