import { DataTypes } from 'sequelize';
import sequelize from 'src/modules/sequelize';
import Appointment from 'src/models/appointment';

export const Customer = sequelize.define(
  'customers',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: '',
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
    city: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    unit: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    confirmationType: {
      type: DataTypes.ENUM<string>('SMS', 'email'),
    },
    balance: {
      type: DataTypes.FLOAT,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
    notes: {
      type: DataTypes.STRING,
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
Appointment?.belongsTo(Customer, { as: 'client', foreignKey: 'client_id' });
