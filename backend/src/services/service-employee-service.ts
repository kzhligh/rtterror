import GeneralService from './general-service';
import { IEmployeeService } from '../interfaces/IEmployeeService';
import IAll from '../interfaces/IAll';

class ServiceEmployeeService extends GeneralService<IAll, IEmployeeService>{
    async deleteItemByServiceId(serviceId: string, t?: any): Promise<void> {
        await this.model.destroy({
            where: {
                service_id: serviceId
            },
            transaction: t
        });
    }
}

export default new ServiceEmployeeService('employee_service');