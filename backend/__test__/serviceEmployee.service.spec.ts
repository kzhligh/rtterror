import { Model, ModelCtor, Transaction } from 'sequelize';
import sequelize from '../src/modules/sequelize';
import EmployeeServiceModel from '../src/models/employee-service';
import serviceEmployeeService from '../src/services/service-employee-service';
import EmployeeModel from 'src/models/employee';

jest.mock('sequelize');
jest
  .spyOn(sequelize, 'model')
  .mockImplementation((modelName: string): ModelCtor<Model<any, any>> => {
    switch (modelName) {
      case 'employee_service':
        return EmployeeServiceModel;
      case 'employee':
        return EmployeeModel;
      default:
        return EmployeeServiceModel;
    }
  });

describe('ServiceEmployee service class', () => {
  beforeAll(() => {
    serviceEmployeeService.model = EmployeeServiceModel;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should able to delete items by service id', async function () {
    const mockId = 'mockId';

    jest.spyOn(serviceEmployeeService, 'deleteItemsByServiceId');
    jest.spyOn(EmployeeServiceModel, 'destroy');

    await serviceEmployeeService.deleteItemsByServiceId(mockId);
    expect(serviceEmployeeService.deleteItemsByServiceId).toBeCalledWith(
      mockId
    );
    expect(EmployeeServiceModel.destroy).toBeCalledWith({
      where: {
        service_id: mockId,
      },
    });
  });

  it('should be able to delete items by their id', async function () {
    const mockId = 'mockId';
    const transaction = new Transaction(sequelize, {});
    const queryOption = { transaction };

    jest.spyOn(serviceEmployeeService, 'deleteItemByEmployeeId');
    jest.spyOn(EmployeeServiceModel, 'destroy');

    await serviceEmployeeService.deleteItemByEmployeeId(mockId, transaction);
    expect(serviceEmployeeService.deleteItemByEmployeeId).toBeCalledWith(
      mockId,
      transaction
    );
    expect(EmployeeServiceModel.destroy).toBeCalledWith({
      where: {
        employee_id: mockId,
      },
      queryOption,
    });
  });
});
