import { Model, DataTypes } from 'sequelize';
import sequelize from '../modules/sequelize';

export default class ComboModel extends Model {}

ComboModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.STRING,
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
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'combo',
    modelName: 'combo',
  }
);
