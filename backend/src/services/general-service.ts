import sequelize from "../modules/sequelize";
import { Model } from "sequelize";
import IAll from "../interfaces/IAll";

export default class GeneralService<T extends IAll, TDto> {

  public model: any;

  constructor(modelName: string) {
    this.model = sequelize.model(modelName);
  }

  async createItem(itemInfo: TDto): Promise<T> {
    const t = await sequelize.transaction();
    try {
      const newItem = await this.model.create(itemInfo);
      await t.commit();
      return newItem.toJSON() as T;
    } catch (error) {
      console.log('GeneralService/createItem()/ERROR: ', error);
      await t.rollback();
      throw error;
    }
  }

  async getAllItems(): Promise<T[]> {
    console.log('GeneralService/getAllItems()')
    try {
      const allItems = await this.model.findAll();
      const jsonItems = allItems.map((item: Model) => {
        return item.toJSON();
      });
      return jsonItems as T[];
    } catch (error) {
      console.log('GeneralService/getAllItems()/ERROR: ', error);
      throw error;
    }
  }

  async getItemById(id: string): Promise<T> {
    try {
      return (await this.model.findByPk(id)).toJSON() as T;
    } catch (error) {
      console.log('GeneralService/getItemById()/ERROR: ', error);
      throw error;
    }
  }

  async updateItem(updateInfo: T): Promise<T> {
    const t = await sequelize.transaction();
    try {
      const [updatedItem, created] = await this.model.upsert(updateInfo, { transaction: t });
      if (created) {
        throw new Error(`ERROR - no item has been found with the id: ${updateInfo.id}`)
      }
      await t.commit()
      return updatedItem.toJSON() as T;
    } catch (error) {
      console.log('GeneralService/updateItem()/ERROR: ', error);
      await t.rollback();
      throw error;
    }
  }

  async updateItemById(id: string, updateFields: any): Promise<T> {
    const updateInfo = {
      ...updateFields,
      id: id
    };
    try {
      return this.updateItem(updateInfo);
    } catch (error) {
      console.log('GeneralService/updateItemById()/ERROR: ', error);
      throw error;
    }
  }

  async deleteItemById(id: string): Promise<void> {
    const t = await sequelize.transaction();
    try {
      const numberOfDeletion = await this.model.destroy({
        where: {
          id: id
        },
        transaction: t
      });
      if (numberOfDeletion === 0) {
        throw new Error(`ERROR - no item has been found with the id: ${id}`);
      } else if (numberOfDeletion > 1) {
        throw new Error(`ERROR - database error, multiple items have been found with the id: ${id}`);
      } else {
        await t.commit();
      }
    } catch (error) {
      console.log('GeneralService/updateItem()/ERROR: ', error);
      await t.rollback();
      throw error;
    }
  }
}
