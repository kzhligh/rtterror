import {Model} from "sequelize";
import GeneralService from "src/services/general-service";
import {IAppointmentJson, IAppointmentObj, IAppointmentDto} from "src/interfaces/IAppointment";
import sequelize from "src/modules/sequelize";

class AppointmentService extends GeneralService<IAppointmentJson, IAppointmentDto> {
  private readonly employeeModel: any;
  private readonly serviceModel: any;

  constructor(
    appointmentModelName: string,
    employeeModelName: string,
    serviceModelName: string
  ) {
    super(appointmentModelName);
    this.employeeModel = sequelize.model(employeeModelName);
    this.serviceModel = sequelize.model(serviceModelName);
  }

  async getAllValidItems(): Promise<IAppointmentJson[]> {
    try {
      const allItems = await this.model.findAll({
        where: { hidden: false },
        include: [this.employeeModel, this.serviceModel]
      });
      return allItems.map((item: Model) => item.toJSON() as IAppointmentJson);
    } catch (error) {
      console.error('AppointmentService/getAllValidItems()/ERROR: ', error);
      throw error;
    }
  }

  async getItemsByFilter(filter: any): Promise<IAppointmentJson[]> {
    try {
      const filteredItems = await this.model.findAll({
        where: { ...filter },
        include: [this.employeeModel, this.serviceModel]
      });
      return filteredItems.map((item: Model) => item.toJSON() as IAppointmentJson);
    } catch (error) {
      console.error('AppointmentService/getItemsByFilter()/ERROR: ', error);
      throw error;
    }
  }

  async hideAppointmentById(id: string): Promise<void> {
    const t = await sequelize.transaction();
    try {
      await this.model.update(
        { hidden: true },
        { where: { id } }
      );
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.error('AppointmentService/hideAppointmentById()/ERROR: ', error);
      throw error
    }
  }
}

export default new AppointmentService('appointment', 'employee', 'service');