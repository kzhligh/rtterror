import { Model } from 'sequelize';

export default class GeneralModel extends Model {
  static async createItem(itemInfo: any): Promise<any | undefined> {
    try {
      return await this.create(itemInfo);
    } catch (error) {
      console.log('GeneralModel/createItem()/ERROR: ', error);
    }
  }

  static async getAllItems(): Promise<any | undefined> {
    try {
      return await this.findAll({ raw: true });
    } catch (error) {
      console.log('GeneralModel/getAllItems()/ERROR: ', error);
    }
  }

  static async getItemById(id: string): Promise<any | undefined> {
    try {
      return await this.findByPk(id, { raw: true });
    } catch (error) {
      console.log('GeneralModel/getItemById()/ERROR: ', error);
    }
  }

  // TODO - check the return value and try to retrieve dataValues only
  static async updateItem(updateInfo: any): Promise<any | undefined> {
    try {
      const { id } = updateInfo;
      await this.update(updateInfo, {
        where: {
          id: id,
        },
      });
      return this.findByPk(id, { raw: true });
    } catch (error) {
      console.log('GeneralModel/getItemById()/ERROR: ', error);
    }
  }

  static async deleteItemById(id: string): Promise<number | undefined> {
    try {
      const numberOfDeletion = await this.destroy({
        where: {
          id: id,
        },
      });
      if (numberOfDeletion === 1) {
        return numberOfDeletion;
      } else if (numberOfDeletion === 0) {
        throw new Error(`ERROR - no item is found with the id: ${id}`);
      } else {
        throw new Error(
          `ERROR - multiple items have been found with the id ${id}`
        );
      }
    } catch (error) {
      console.log('GeneralModel/deleteItemById()/ERROR: ', error);
    }
  }
}
