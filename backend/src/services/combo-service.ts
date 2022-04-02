import { Model } from 'sequelize';
import GeneralService from './general-service';
import { ICombo, IComboDto } from '../interfaces/ICombo';
import sequelize from '../modules/sequelize';
import serviceComboService from './service-combo-service';

class ComboService extends GeneralService<ICombo, IComboDto> {
  public serviceComboModel: any;
  public serviceModel: any;

  constructor (
    comboModelName: string,
    serviceModelName: string,
    serviceComboModelName: string
  ) {
    super(comboModelName);
    this.serviceModel = sequelize.model(serviceModelName);
    this.serviceComboModel = sequelize.model(serviceComboModelName);
  }

  async getAllItems (): Promise<ICombo[]> {
    try {
      const allItems = await this.model.findAll({ include: this.serviceModel });
      return allItems.map((item: Model) => {
        return item.toJSON() as ICombo;
      });
    } catch (error) {
      console.error('ComboService/getAllItems()/ERROR: ', error);
      throw error;
    }
  }

  async getItemById (id: string): Promise<ICombo | null> {
    try {
      const comboItem = await this.model.findByPk(id, {
        include: this.serviceModel,
      });
      return comboItem?.toJSON() ?? (null as ICombo | null);
    } catch (error) {
      console.error('ComboService/getItemById()/ERROR: ', error);
      throw error;
    }
  }

  async createItem (itemInfo: IComboDto): Promise<ICombo | null> {
    const t = await sequelize.transaction();
    try {
      const { service_ids, ...comboInfo } = itemInfo;
      const newCombo = await this.model.create(comboInfo, { transaction: t });
      for (const serviceId of service_ids) {
        let serviceItem = await this.serviceModel.findByPk(serviceId);
        await newCombo.addService(serviceItem, { transaction: t });
      }
      await t.commit();
      return await this.getItemById(newCombo.getDataValue('id'));
    } catch (error) {
      console.error('ComboService/createItem()/ERROR: ', error);
      await t.rollback();
      throw error;
    }
  }

  async updateItem (comboObj: ICombo): Promise<ICombo | null> {
    const t = await sequelize.transaction();
    try {
      const { id, service_ids, ...comboInfo } = comboObj;
      const [numberOfUpdates] = await this.model.update(comboInfo, {
        where: {
          id: id,
        },
        transaction: t,
      });
      if (numberOfUpdates === 0) {
        throw new Error(`ERROR - no item has been found with the id: ${id}`);
      }

      // update services info
      const oldServiceIds = await serviceComboService.getServiceIdsByComboId(
        id
      );
      let deleteIds: string[] = [];
      let addIds: string[] = [];
      if (!service_ids || service_ids.length === 0) {
        deleteIds = oldServiceIds;
      } else {
        deleteIds = oldServiceIds.filter((oldId) => {
          return !service_ids.includes(oldId);
        });
        addIds = service_ids.filter((newId) => {
          return !oldServiceIds.includes(newId);
        });
      }

      await serviceComboService.deleteItemsByComboIdAndServiceIds(
        id,
        deleteIds,
        t
      );

      await serviceComboService.addItemsByComboIdAndServiceIds(id, addIds, t);
      await t.commit();
      return this.getItemById(id);
    } catch (error) {
      console.error('ComboService/updateItem()/ERROR: ', error);
      await t.rollback();
      throw error;
    }
  }

  async updateItemById (id: string, updateFields: any): Promise<ICombo | null> {
    const t = await sequelize.transaction();
    try {
      await this.model.update(updateFields, {
        where: {
          id: id,
        },
        transaction: t,
      });
      await t.commit();
      return this.getItemById(id);
    } catch (error) {
      console.error('GeneralService/updateItemById()/ERROR: ', error);
      await t.rollback();
      throw error;
    }
  }

  async deleteItemById (id: string): Promise<void> {
    const t = await sequelize.transaction();
    try {
      await this.model.destroy({
        where: {
          id: id,
        },
        transaction: t,
        cascade: true,
      });
      await t.commit();
    } catch (error) {
      console.error('ComboService/deleteItemById()/ERROR: ', error);
      await t.rollback();
      throw error;
    }
  }

  async deleteItemsByServiceId (serviceId: string, t?: any): Promise<void> {
    let allComboIds = await this.serviceComboModel.findAll({
      where: {
        service_id: serviceId,
      },
    });
    allComboIds = allComboIds.map((item: Model) =>
      item.getDataValue('combo_id')
    );

    for (const comboId of allComboIds) {
      await this.model.destroy({
        where: {
          id: comboId,
        },
        transaction: t,
      });
    }

    const leftComboIds = await this.serviceComboModel.findAll({
      where: {
        service_id: serviceId,
      },
    });
    if (leftComboIds.length > 0)
      console.error(leftComboIds.length + ' has left undeleted.');
  }
}

export default new ComboService('combo', 'service', 'service_combo');
