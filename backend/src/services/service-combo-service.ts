import { Model } from 'sequelize';
import GeneralService from './general-service';
import { IServiceCombo } from '../interfaces/IServiceCombo';
import IAll from '../interfaces/IAll';

class ServiceComboService extends GeneralService<IAll, IServiceCombo> {
  async getServiceIdsByComboId(comboId: string): Promise<string[]> {
    try {
      const allItems = await this.model.findAll({
        where: {
          combo_id: comboId,
        },
      });
      console.log('it works!!!!');
      return allItems.map((item: Model) => {
        return item.getDataValue('service_id');
      });
    } catch (error) {
      console.error(
        'ServiceComboService/getServiceIdsByComboId()/ERROR: ',
        error
      );
      throw error;
    }
  }

  async deleteItemsByComboIdAndServiceIds(
    comboId: string,
    serviceIds: string[],
    t: any
  ): Promise<number> {
    try {
      let numberOfDeletion = 0;
      for (const serviceId of serviceIds) {
        const deletion = await this.model.destroy({
          where: {
            combo_id: comboId,
            service_id: serviceId,
          },
          transaction: t,
        });
        numberOfDeletion += deletion;
      }
      return numberOfDeletion;
    } catch (error) {
      console.error(
        'ServiceComboService/deleteItemsByComboIdAndServiceIds()/ERROR: ',
        error
      );
      await t.rollback();
      throw error;
    }
  }

  async addItemsByComboIdAndServiceIds(
    comboId: string,
    serviceIds: string[],
    t: any
  ): Promise<number> {
    try {
      let numberOfAdd = 0;
      for (const serviceId of serviceIds) {
        const newItemInfo = {
          combo_id: comboId,
          service_id: serviceId,
        };
        await this.model.create(newItemInfo, { transaction: t });
        numberOfAdd++;
      }
      return numberOfAdd;
    } catch (error) {
      console.error(
        'ServiceComboService/addItemsByComboIdAndServiceIds()/ERROR: ',
        error
      );
      await t.rollback();
      throw error;
    }
  }
}

export default new ServiceComboService('service_combo');
