const { sequelize } = require('../modules/sequelize');
const { DataTypes } = require('sequelize');
const { Customer } = require('../models/customer');

jest.mock('../modules/sequelize');

describe('Customer Model', () => {
  it('should setup the customer table', async () => {
    expect(sequelize.define).toBeCalledWith(
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
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
