import GeneralService from './general-service';
import { IEmployeeService } from '../interfaces/IEmployeeService';
import IAll from '../interfaces/IAll';

class ServiceEmployeeService extends GeneralService<IAll, IEmployeeService>{
    async deleteItemsByServiceId(serviceId: string, t?: any): Promise<void> {
        await this.model.destroy({
            where: {
                service_id: serviceId
            },
            transaction: t
        });
    }

    async deleteItemByEmployeeId(employeeId: string, t?: any): Promise<void> {
        let queryOption: any = {};
        if (t) queryOption.transaction = t
        await this.model.destroy({
            where: {
                employee_id: employeeId
            },
            queryOption
        });
    }
}

export default new ServiceEmployeeService('employee_service');