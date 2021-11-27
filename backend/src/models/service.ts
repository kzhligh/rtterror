import { DataTypes } from 'sequelize';
import sequelize from '../modules/sequelize';
import GeneralModel from './model';
import { IService } from '../interfaces/IService';

export default class ServiceModel extends GeneralModel {
  static async getAllItems(): Promise<IService[] | undefined> {
    try {
      const allItems = await this.findAll({
        where: {
          hidden: false,
        },
      });
      const result = allItems.map((item) => {
        let itemJson = item.toJSON() as IService;
        return itemJson;
      });
      return allItems.length > 0 ? result : undefined;
    } catch (error) {
      console.error('ServiceClass/getAllItems()/ERROR: ', error);
      throw error;
    }
  }
}

ServiceModel.init(
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
    sequelize,
    timestamps: true,
    tableName: 'service',
  }
);
