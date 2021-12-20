import { Appointment } from './appointment.model';
import { Customer } from './customer.model';
import ServiceModel from './service';
import ComboModel from './combo';
import ServiceComboModel from './service-combo';

const syncTables = async () => {
  try {
    await Promise.all([
      ServiceModel.sync({ alter: true }),
      ComboModel.sync({ alter: true }),
      Appointment.sync({ alter: true }),
    ]);
    await ServiceComboModel.sync({ alter: true });
    await Customer.sync({ alter: true });
  } catch (error) {
    throw error;
  }
};
export default syncTables;
