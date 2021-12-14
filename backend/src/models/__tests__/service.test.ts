import { DataTypes } from 'sequelize';

const mSequelize = {};

jest.mock('../../modules/sequelize', () => {
  return mSequelize;
});

const modelStaticMethodMocks = {
  init: jest.fn(),
};

jest.doMock('sequelize', () => {
  class MockModel {
    public static init(attributes: any, options: any) {
      modelStaticMethodMocks.init(attributes, options);
    }
  }
  return {
    ...jest.requireActual('sequelize'),
    Model: MockModel,
  };
});

describe('Service Model', () => {
  it('should setup the service table', async () => {
    await import('../service');
    expect(modelStaticMethodMocks.init).toBeCalledWith(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        service_code: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
        },
        treatment_type: {
          type: DataTypes.STRING,
        },
        duration: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        price: {
          type: DataTypes.STRING,
          allowNull: false,
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
          defaultValue: false,
        },
        hidden: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize: mSequelize,
        timestamps: true,
        tableName: 'service',
        modelName: 'service',
      }
    );
  });
});
