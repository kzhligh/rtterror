import { Model } from "sequelize";
import GeneralService from "src/services/general-service";
import { IEmployee, IEmployeeDto } from "src/interfaces/IEmployee";
import sequelize from "src/modules/sequelize";

class EmployeeService extends GeneralService<IEmployee, IEmployeeDto>{
    private readonly serviceModel: any;
    private readonly employeeServiceModel: any;

    constructor(
        employeeModelName: string,
        serviceModelName: string,
        employeeServiceModelName: string
    ) {
        super(employeeModelName);
        this.serviceModel = sequelize.model(serviceModelName);
        this.employeeServiceModel = sequelize.model(employeeServiceModelName);
    }
    async getAllItems(): Promise<IEmployee[]> {
        try {
            const allItems = await this.model.findAll({ include: this.serviceModel });
            return allItems.map((employee: Model) => {
                return employee.toJSON() as IEmployee;
            });
        } catch (error) {
            console.error('EmployeeService/getAllItems()/error: ', error);
            throw error;
        }
    }

    async getItemById(id: string): Promise<IEmployee> {
        try {
            const employee =  await this.model.findByPk(id, { include: this.serviceModel });
            return employee.toJSON() as IEmployee;
        } catch (error) {
            console.error('EmployeeService/getItemById()/error: ', error);
            throw error;
        }
    }

    async createItem(itemInfo: IEmployeeDto): Promise<IEmployee> {
        const t = await sequelize.transaction();
        try {
            const { service_ids, ...employeeInfo } = itemInfo;
            const newEmployee = await this.model.create(employeeInfo, { transaction: t });
            if (service_ids) {
                for (const serviceId of service_ids) {
                    const serviceItem = await this.serviceModel.findByPk(serviceId);
                    await newEmployee.addService(serviceItem, { transaction: t });
                }
            }
            await t.commit();
            return await this.getItemById(newEmployee.getDataValue('id'));
        } catch (error) {
            console.error('EmployeeService/createItem()/error: ', error);
            await t.rollback();
            throw error;
        }
    }

    // async addServicesToEmployee(service_ids: string[], employeeId: string): Promise<IEmployee> {
    //     const t = await sequelize.transaction();
    //     try {
    //         let employee = await this.model.findByPk(employeeId, { include: this.serviceModel });
    //         const serviceList =
    //     }
    // }

}

export default new EmployeeService('employee', 'service', 'employee_service');