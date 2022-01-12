import { Model } from 'sequelize';
import GeneralService from './general-service';
import { IService, IServiceDto } from '../interfaces/IService';
import sequelize from "src/modules/sequelize";
import internal from "stream";

class ServiceService extends GeneralService<IService, IServiceDto> {
  private readonly employeeModel: any;

  constructor(
      serviceModelName: string,
      employeeModelName: string,
  ) {
    super(serviceModelName);
    this.employeeModel = sequelize.model(employeeModelName)
  }

  async getAllValidItems(): Promise<IService[]> {
    try {
      const allItems = await this.model.findAll({
        where: {
          hidden: false,
        },
        include: this.employeeModel
      });
      const jsonItems: IService[] = allItems.map((item: Model) => {
        return item.toJSON() as IService;
      });
      return jsonItems;
    } catch (error) {
      console.error('ServiceService/getAllValidItems()/ERROR: ', error);
      throw error;
    }
  }

  async createItem(itemInfo: IServiceDto): Promise<IService> {
    console.log('createItem()/itemInfo: ', itemInfo);
    const t = await sequelize.transaction();
    try {
      const { employee_ids, ...serviceInfo } = itemInfo;
      const newService = await this.model.create(serviceInfo, { transaction: t });
      if (employee_ids) {
        console.log('createItem()/employee_ids: ', employee_ids);
        for (const employeeId of employee_ids) {
          const employeeItem = await this.employeeModel.findByPk(employeeId);
          await newService.addEmployee(employeeItem, { transaction: t });
        }
      }
      await t.commit();
      return await this.getItemById(newService.getDataValue('id'));
    } catch (error) {
      console.error('ServiceService/createItem()/ERROR: ', error);
      await t.rollback();
      throw error;
    }
  }

  async getItemById(id: string): Promise<IService> {
    try {
      return (await this.model.findByPk(id, { include: this.employeeModel })).toJSON() as IService;
    } catch (error) {
      console.error('ServiceService/getItemById()/ERROR: ', error);
      throw error;
    }
  }
}

export default new ServiceService('service', 'employee');
