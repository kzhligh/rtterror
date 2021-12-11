import { DataTypes } from 'sequelize/types';
import sequelize from 'src/modules/sequelize';

require('./customer');

jest.mock('src/modules/sequelize');

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
          type: DataTypes.ENUM<string>('M', 'F', 'N/A'),
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
          type: DataTypes.ENUM<string>('SMS', 'email'),
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
