import GeneralService from './general-service';
import { IService, IServiceDto } from '../interfaces/IService';
import ServiceModel from '../models/service';

class ServiceService extends GeneralService<IService, IServiceDto> {
  async hideItemById(id: string): Promise<IService | undefined> {
    try {
      const hiddenService = await this.Model.getItemById(id);
      hiddenService.hidden = true;
      const updatedService = await this.Model.updateItem(hiddenService);
      return updatedService ? (updatedService as IService) : undefined;
    } catch (error) {
      console.log('ServiceService/hideItemById()/ERROR: ', error);
    }
  }

  async blockItemById(id: string): Promise<IService | undefined> {
    try {
      const blockedItem = await this.Model.getItemById(id);
      blockedItem.blocked = true;
      console.log('the blocked item: ', blockedItem);
      const updatedItem = await this.Model.updateItem(blockedItem);
      return updatedItem ? (updatedItem as IService) : undefined;
    } catch (error) {
      console.log('ServiceService/blockItemById()/ERROR: ', error);
    }
  }

  async unblockItemById(id: string): Promise<IService | undefined> {
    try {
      const unblockedItem = await this.Model.getItemById(id);
      unblockedItem.blocked = false;
      console.log('the blocked item: ', unblockedItem);
      const updatedItem = await this.Model.updateItem(unblockedItem);
      return updatedItem ? (updatedItem as IService) : undefined;
    } catch (error) {
      console.log('ServiceService/unblockItemById()/ERROR: ', error);
    }
  }
}

export default new ServiceService(ServiceModel);
