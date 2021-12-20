import ServiceModel from './service';
import ComboModel from './combo';
import ServiceComboModel from './service-combo';

const syncTables = async () => {
  try {
    await Promise.all([
      ServiceModel.sync({ alter: true }),
      ComboModel.sync({ alter: true }),
      ServiceComboModel.sync({ alter: true }),
    ]);
  } catch (error) {
    throw error;
  }
};
export default syncTables;
