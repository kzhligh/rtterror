import { Model } from "sequelize";
import GeneralService from "src/services/general-service";
import serviceEmployeeService from './service-employee-service';
import { IEmployee, IEmployeeDto } from "src/interfaces/IEmployee";
import sequelize from "src/modules/sequelize";

class EmployeeService extends GeneralService<IEmployee, IEmployeeDto>{
    private readonly serviceModel: any;
    // private readonly employeeServiceModel: any;

    constructor(
        employeeModelName: string,
        serviceModelName: string,
        // employeeServiceModelName: string
    ) {
        super(employeeModelName);
        this.serviceModel = sequelize.model(serviceModelName);
        // this.employeeServiceModel = sequelize.model(employeeServiceModelName);
    }
    async getAllItems(): Promise<IEmployee[]> {
        try {
            const allItems = await this.model.findAll({
                where: {
                    hidden: false
                },
                include: this.serviceModel
            });
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

    /*
    * this method will create an employee item in the database, including employee personal information, and associated services
    * @return the newly created employee object with associated services info
    * */
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

    async updateItem(itemInfo: IEmployee): Promise<IEmployee> {
        const t = await sequelize.transaction();
        try {
            const { id, service_ids, ...employeeInfo } = itemInfo;
            // update employee basic info
            const [ updatedEmployee, hasCreated ] = await this.model.upsert(
                { id: id, ...employeeInfo },
                { transaction: t }
            );
            if (hasCreated) throw Error(`ERROR - no such an employee with id ${id} has been found`);
            // update service-employee relationship
            await serviceEmployeeService.deleteItemByEmployeeId(id, t);
            if (service_ids && service_ids.length > 0) {
                for (const serviceId of service_ids) {
                    const serviceItem = await this.serviceModel.findByPk(serviceId);
                    await updatedEmployee.addService(serviceItem, { transaction: t });
                }
            }
            await t.commit();
            return await this.getItemById(id);
        } catch (error) {
            console.error('EmployeeService/updateItem()/error: ', error);
            await t.rollback();
            throw error;
        }
    }

    async hideItemById(id: string, updateFields: any): Promise<IEmployee[]> {
        const t = await sequelize.transaction();
        try {
            await this.model.update(updateFields, {
                where: {
                    id: id
                },
                transaction: t
            });
            await t.commit();
            return this.getAllItems();
        } catch (error) {
            console.error('EmployeeService/updateItemById()/ERROR: ', error);
            await t.rollback();
            throw error;
        }
    }
}

export default new EmployeeService('employee', 'service');