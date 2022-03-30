import GeneralService from "src/services/general-service";
import { IAppointmentEmployee } from "src/interfaces/IAppointmentEmployee";
import IAll from "src/interfaces/IAll";

class AppointmentEmployeeService extends GeneralService<IAll, IAppointmentEmployee> {
  async deleteItemsByAppointmentId(id: string, t?: any): Promise<void> {
    await this.model.destroy({
      where: { appointment_id: id },
      transaction: t
    });
  }

  async deleteItemsByEmployeeId(id: string, t?: any): Promise<void> {
    await this.model.destroy({
      where: { employee_id: id },
      transaction: t
    });
  }
}

export default new AppointmentEmployeeService('appointment_employee');