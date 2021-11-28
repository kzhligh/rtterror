import {Model} from "sequelize";
import GeneralService from './general-service';
import { IService, IServiceDto } from '../interfaces/IService';

class ServiceService extends GeneralService<IService, IServiceDto> {
    async getAllValidItems(): Promise<IService[]> {
        try {
            const allItems = await this.model.findAll({
                where: {
                    hidden: false
                }
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
}

export default new ServiceService('service');
