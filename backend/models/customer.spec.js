const { sequelize } = require('../modules/sequelize');
const { DataTypes } = require('sequelize');
require('./customer');

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
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
