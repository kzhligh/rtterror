import {Model} from "sequelize";
import GeneralService from "src/services/general-service";
import appointmentServiceService from './appointment-service-service';
import appointmentEmployeeService from './appointment-employee-service';
import {IAppointmentJson, IAppointmentDto} from "src/interfaces/IAppointment";
import sequelize from "src/modules/sequelize";

class AppointmentService extends GeneralService<IAppointmentJson, IAppointmentDto> {
  private readonly employeeModel: any;
  private readonly serviceModel: any;
  private readonly customerModel: any;

  constructor(
    appointmentModelName: string,
    employeeModelName: string,
    serviceModelName: string,
    customerModelName: string
  ) {
    super(appointmentModelName);
    this.employeeModel = sequelize.model(employeeModelName);
    this.serviceModel = sequelize.model(serviceModelName);
    this.customerModel = sequelize.model(customerModelName);
  }

  async createItem(itemDto: IAppointmentDto): Promise<IAppointmentJson> {
    const t = await sequelize.transaction();
    try {
      // data validation
      if (itemDto.repeat && (!itemDto.cycle_start || !itemDto.cycle_end))
        throw new Error('AppointmentService/createItem()/ERROR - cycle_start and cycle_end are mandatory fields if repeat field is TRUE')
      const { employee_ids, service_ids, client_id, status, ...appointmentInfo } = itemDto;
      const newAppointment = await this.model.create(
        { ...appointmentInfo, client_id: client_id, status: JSON.stringify(status) },
        { transaction: t }
      );
      for (const employeeId of employee_ids) {
        const employeeItem = await this.employeeModel.findByPk(employeeId);
        await newAppointment.addEmployee(employeeItem, { transaction: t });
      }
      for (const serviceId of service_ids) {
        const serviceItem = await this.serviceModel.findByPk(serviceId);
        await newAppointment.addService(serviceItem, { transaction: t });
      }
      await t.commit();
      return await this.getItemById(newAppointment.getDataValue('id'));
    } catch (error) {
      await t.rollback();
      console.error('AppointmentService/createItem()/ERROR: ', error);
      throw error
    }
  }

  async getAllValidItems(): Promise<IAppointmentJson[]> {
    try {
      const allItems = await this.model.findAll({
        where: { hidden: false },
        include: [this.employeeModel, this.serviceModel, {model: this.customerModel, as: 'Client'}]
      });
      return allItems.map((item: Model) => item.toJSON() as IAppointmentJson);
    } catch (error) {
      console.error('AppointmentService/getAllValidItems()/ERROR: ', error);
      throw error;
    }
  }

  async getItemById(id: string): Promise<IAppointmentJson> {
    try {
      const appointmentItem = await this.model.findByPk(id, { include: [this.employeeModel, this.serviceModel, {model: this.customerModel, as: 'Client'}] });
      return appointmentItem.toJSON() as IAppointmentJson
    } catch (error) {
      console.error('AppointmentService/getItemById()/ERROR: ', error);
      throw error;
    }
  }

  async getItemsByFilter(filter: any): Promise<IAppointmentJson[]> {
    try {
      const filteredItems = await this.model.findAll({
        where: { ...filter },
        include: [this.employeeModel, this.serviceModel, {model: this.customerModel, as: 'Client'}]
      });
      return filteredItems.map((item: Model) => item.toJSON() as IAppointmentJson);
    } catch (error) {
      console.error('AppointmentService/getItemsByFilter()/ERROR: ', error);
      throw error;
    }
  }

  async updateItem(itemInfo: IAppointmentJson): Promise<IAppointmentJson> {
    const t = await sequelize.transaction();
    try {
      const { id, employee_ids, service_ids, status, ...appointmentInfo } = itemInfo;
      const [ updatedAppointment, hasCreated ] = await this.model.upsert(
        { id: id, ...appointmentInfo, status: JSON.stringify(status) },
        { transaction: t }
      );
      if (hasCreated) throw new Error(`ERROR - no such an appointment with id ${id} has been found`);
      // delete appointment-service and appointment-employee relationships of given appointment id
      await appointmentEmployeeService.deleteItemsByAppointmentId(id, t);
      await appointmentServiceService.deleteItemsByAppointmentId(id, t);
      // add new relationships from given info
      if (employee_ids && employee_ids.length > 0) {
        for (let i = 0; i < employee_ids.length; i++) {
          const employeeItem = await this.employeeModel.findByPk(employee_ids[i]);
          updatedAppointment.addEmployee(employeeItem);
        }
      }
      if (service_ids && service_ids.length > 0) {
        for (let i = 0; i < service_ids.length; i++) {
          const serviceItem = await this.serviceModel.findByPk(service_ids[i]);
          updatedAppointment.addService(serviceItem);
        }
      }
      await t.commit();
      return await this.getItemById(id);
    } catch (error) {
      await t.rollback();
      console.error('AppointmentService/updateItem()/ERROR: ', error);
      throw error;
    }
    return await this.getItemById(itemInfo.id)
  }

  async hideItemById(id: string): Promise<void> {
    const t = await sequelize.transaction();
    try {
      await this.model.update(
        { hidden: true },
        { where: { id } }
      );
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.error('AppointmentService/hideItemById()/ERROR: ', error);
      throw error
    }
  }
}

export default new AppointmentService(
  'appointment',
  'employee',
  'service',
  'customers'
);