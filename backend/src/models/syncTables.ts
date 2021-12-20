import { Appointment } from './appointment.model';
import { Customer } from './customer.model';
import ServiceModel from './service';

const syncTables = async () => {
  try {
    await Promise.all([
      ServiceModel.sync({ alter: true }),
      Customer.sync({ alter: true }),
      Appointment.sync({ alter: true }),
    ]);
  } catch (error) {
    console.error(error);
  }
};
export default syncTables;
