import { DataTypes, Model } from 'sequelize';
import sequelize from 'src/modules/sequelize';
import { Customer as CustomerModel } from './customer.model';

export default class AppointmentModel extends Model {}

AppointmentModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rmq_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pro_rmq_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 60,
    },
    repeat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    cycle_start: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cycle_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '[]',
    },
    feedback: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: 'appointment',
    modelName: 'appointment',
  }
);

AppointmentModel.belongsTo(CustomerModel, {
  foreignKey: 'client_id',
  as: 'client',
});
CustomerModel.hasMany(AppointmentModel);
