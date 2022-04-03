import GeneralService from "src/services/general-service";
import { IAppointmentService } from "src/interfaces/IAppointmentService";
import IAll from "src/interfaces/IAll";

class AppointmentServiceService extends GeneralService<IAll, IAppointmentService> {
  async deleteItemsByAppointmentId(id: string, t?: any): Promise<void> {
    await this.model.destroy({
      where: { appointment_id: id },
      transaction: t
    });
  }

  async deleteItemsByServiceId(id: string, t?: any):Promise<void> {
    await this.model.destroy({
      where: { service_id: id },
      transaction: t
    });
  }
}

export default new AppointmentServiceService('appointment_service');