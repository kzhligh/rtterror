import GeneralModel from '../models/model';
import { ModelCtor } from 'sequelize';

export default class GeneralService<T, TDto> {
  public Model: ModelCtor<GeneralModel>;

  constructor(Model: ModelCtor<GeneralModel>) {
    this.Model = Model;
  }

  async createItem(itemInfo: TDto): Promise<T | undefined> {
    try {
      return (await this.Model.createItem(itemInfo)) as T;
    } catch (error) {
      console.log('GeneralService/createItem()/ERROR: ', error);
    }
  }

  async getAllItems(): Promise<T[] | undefined> {
    try {
      return (await this.Model.getAllItems()) as T[];
    } catch (error) {
      console.log('GeneralService/getAllItems()/ERROR: ', error);
    }
  }

  async getItemById(id: string): Promise<T | undefined> {
    try {
      return (await this.Model.getItemById(id)) as T;
    } catch (error) {
      console.log('GeneralService/getItemById()/ERROR: ', error);
    }
  }

  async updateItem(updateInfo: TDto): Promise<T | undefined> {
    try {
      return (await this.Model.updateItem(updateInfo)) as T;
    } catch (error) {
      console.log('GeneralService/updateItem()/ERROR: ', error);
    }
  }

  async deleteItemById(id: string): Promise<number | undefined> {
    try {
      return await this.Model.deleteItemById(id);
    } catch (error) {
      console.log('GeneralService/updateItem()/ERROR: ', error);
    }
  }
}
