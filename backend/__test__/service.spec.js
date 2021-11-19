const { sequelize } = require('../modules/sequelize');
const { DataTypes } = require('sequelize');
const { Service } = require('../models/service');

jest.mock('../modules/sequelize');

describe('Service Model', () => {
  it('should setup the service table', async () => {
    expect(sequelize.define).toBeCalledWith(
      'services',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    treatment_type: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    price: {
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
      allowNull: false,
      default: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
    );
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});