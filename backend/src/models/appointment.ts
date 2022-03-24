import {DataTypes, Model} from "sequelize";
import sequelize from "src/modules/sequelize";

export default class AppointmentModel extends Model {
}

AppointmentModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  rmq_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  client_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pro_rmq_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 60
  },
  repeat: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  cycle_start: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cycle_end: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  feedback: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hidden: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  timestamps: true,
  tableName: 'appointment',
  modelName: 'appointment'
})