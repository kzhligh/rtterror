import { DataTypes } from 'sequelize';
import sequelize from 'src/modules/sequelize';
import { Appointment } from './appointment.model';

export const Customer = sequelize.define(
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
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
    timestamps: false,
    freezeTableName: true,
  }
);

Customer?.hasMany(Appointment);
Appointment?.belongsTo(Customer);
