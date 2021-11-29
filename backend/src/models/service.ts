import { Model, DataTypes } from 'sequelize';
import sequelize from '../modules/sequelize';

export default class ServiceModel extends Model{
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
      modelName: 'service'
  }
);
