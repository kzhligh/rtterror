import { Model } from 'sequelize';
import sequelize from '../modules/sequelize';
import ServiceModel from './service';
import ComboModel from './combo';

export default class ServiceComboModel extends Model {}

ServiceComboModel.init(
  {},
  {
    sequelize,
    timestamps: true,
    tableName: 'service_combo',
    modelName: 'service_combo',
  }
);

ServiceModel.belongsToMany(ComboModel, {
  through: ServiceComboModel,
  foreignKey: 'service_id',
});
ComboModel.belongsToMany(ServiceModel, {
  through: ServiceComboModel,
  foreignKey: 'combo_id',
});
