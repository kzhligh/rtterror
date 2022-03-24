import { Transaction, Model, ModelCtor } from 'sequelize';
import sequelize from '../src/modules/sequelize';
import EmployeeModel from '../src/models/employee';
import ServiceModel from '../src/models/service';
import serviceEmployeeService from '../src/services/service-employee-service';

class MockEmployeeModel extends EmployeeModel {
  addService() {}
}

jest
  .spyOn(sequelize, 'model')
  .mockImplementation((modelName: string): ModelCtor<Model<any, any>> => {
    switch (modelName) {
      case 'employee':
        return EmployeeModel;
      case 'service':
        return ServiceModel;
      default:
        return EmployeeModel;
    }
  });

import employeeService from '../src/services/employee-service';

const mockEmployee = {
  first_name: 'mock',
  last_name: 'mock',
  dob: 'mock',
  sin: 'mock',
  address: 'mock',
  postal_code: 'mock',
  phone: 'mock',
  email: 'mock',
  title: 'mock',
  start_date: new Date(Date.now()),
  end_date: new Date(Date.now()),
  hidden: false,
  service_ids: ['mock'],
};

jest.mock('sequelize');
jest.mock('../src/services/service-employee-service');

describe('Employee Service', () => {
  beforeAll(() => {
    jest.mock('../src/models/employee', () => EmployeeModel.prototype);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to create a new employee', async () => {
    const transaction = new Transaction(sequelize, {});
    const mockEmployeeEntity = new MockEmployeeModel(mockEmployee);

    jest
      .spyOn(sequelize, 'transaction')
      .mockImplementationOnce(async () => transaction);
    jest
      .spyOn(EmployeeModel, 'create')
      .mockImplementationOnce(async () => mockEmployeeEntity);
    jest
      .spyOn(EmployeeModel, 'findByPk')
      .mockImplementationOnce(async () => mockEmployeeEntity);
    jest
      .spyOn(mockEmployeeEntity, 'toJSON')
      .mockImplementationOnce(async () => mockEmployee);
    jest
      .spyOn(ServiceModel, 'findByPk')
      .mockImplementationOnce(async () => mockEmployeeEntity);

    expect(await employeeService.createItem(mockEmployee)).toEqual(
      mockEmployee
    );
    expect(sequelize.transaction).toBeCalledTimes(1);
    expect(EmployeeModel.create).toBeCalledWith(
      (function () {
        const { service_ids, ...createValue } = mockEmployee;
        return createValue;
      })(),
      { transaction }
    );
    expect(EmployeeModel.findByPk).toBeCalled();
    expect(mockEmployeeEntity.toJSON).toBeCalled();
    expect(ServiceModel.findByPk).toBeCalled();
  });

  it('should be able to get all employees', async () => {
    const mockEmployeeEntity = new MockEmployeeModel(mockEmployee);

    jest
      .spyOn(EmployeeModel, 'findAll')
      .mockImplementationOnce(() => Promise.resolve([mockEmployeeEntity]));
    jest
      .spyOn(mockEmployeeEntity, 'toJSON')
      .mockImplementationOnce(() => mockEmployee);

    expect(await employeeService.getAllItems()).toEqual([mockEmployee]);
  });

  it('should be able to update employee by pk', async () => {
    const id = 'mockID';
    const mockEmployeeEntity = new MockEmployeeModel(mockEmployee);
    const { service_ids, ...mockEmployeeResult } = mockEmployee;
    const transaction = new Transaction(sequelize, {});

    jest.spyOn(sequelize, 'transaction').mockResolvedValueOnce(transaction);
    jest
      .spyOn(employeeService, 'getItemById')
      .mockResolvedValueOnce({ id, ...mockEmployee });
    jest
      .spyOn(EmployeeModel, 'upsert')
      .mockResolvedValueOnce([mockEmployeeEntity, false]);

    expect(await employeeService.updateItem({ id, ...mockEmployee })).toEqual({
      id,
      ...mockEmployee,
    });
    expect(sequelize.transaction).toBeCalled();
    expect(EmployeeModel.upsert).toBeCalledWith(
      { id, ...mockEmployeeResult },
      { transaction }
    );
    expect(EmployeeModel.findByPk).toBeCalledTimes(1);
  });

  it('should be able to handle thrown error when updating employee by pk', async () => {
    const id = 'mockID';
    const mockEmployeeEntity = new MockEmployeeModel(mockEmployee);
    const transaction = new Transaction(sequelize, {});

    jest.spyOn(sequelize, 'transaction').mockResolvedValueOnce(transaction);
    jest
      .spyOn(EmployeeModel, 'upsert')
      .mockResolvedValueOnce([mockEmployeeEntity, true]);

    try {
      expect(
        await employeeService.updateItem({ id, ...mockEmployee })
      ).toThrowError();
    } catch (error) {
      expect(error).toEqual(
        Error(`ERROR - no such an employee with id ${id} has been found`)
      );
    }
  });

  it('should be able to hide item by ID', async () => {
    const id = 'mockID';
    const t = new Transaction(sequelize, {});

    jest.spyOn(sequelize, 'transaction').mockResolvedValueOnce(t);
    jest
      .spyOn(employeeService, 'getAllItems')
      .mockResolvedValueOnce([{ id, ...mockEmployee }]);

    expect(await employeeService.hideItemById(id, mockEmployee)).toEqual([
      { id, ...mockEmployee },
    ]);
  });

  it('should be able to hide multiple items by ID', async () => {
    const mockIds = ['mockId'];
    const transaction = new Transaction(sequelize, {});

    jest.spyOn(sequelize, 'transaction').mockResolvedValueOnce(transaction);
    jest.spyOn(EmployeeModel, 'update').mockResolvedValueOnce([1]);
    jest.spyOn(employeeService, 'getAllItems').mockResolvedValueOnce([]);
    jest.spyOn(serviceEmployeeService, 'deleteItemByEmployeeId');

    expect(await employeeService.hideItemsByIds(mockIds)).toEqual([]);
    expect(sequelize.transaction).toBeCalledTimes(1);
    expect(employeeService.getAllItems).toBeCalled();
    expect(serviceEmployeeService.deleteItemByEmployeeId).toBeCalledTimes(
      mockIds.length
    );
  });

  it('should throw errors on exceptions that are caught', async () => {
    const transaction = new Transaction(sequelize, {});
    const mockError = { name: 'error', message: 'bob' };
    const mockId = 'mockID';

    jest.spyOn(EmployeeModel, 'create').mockRejectedValueOnce(mockError);
    jest.spyOn(EmployeeModel, 'findByPk').mockRejectedValueOnce(mockError);
    jest.spyOn(EmployeeModel, 'findAll').mockRejectedValueOnce(mockError);
    jest.spyOn(EmployeeModel, 'update').mockRejectedValue(mockError);
    jest
      .spyOn(sequelize, 'transaction')
      .mockImplementation(async () => transaction);
    jest.spyOn(console, 'error').mockImplementation(jest.fn);

    try {
      expect(await employeeService.createItem(mockEmployee)).toThrowError(
        mockError
      );
    } catch (error) {
      expect(error).toEqual(mockError);
    }
    try {
      expect(await employeeService.getItemById(mockId)).toThrowError(mockError);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
    try {
      expect(await employeeService.getAllItems()).toThrowError(mockError);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
    try {
      jest
        .spyOn(employeeService, 'updateItem')
        .mockRejectedValueOnce(mockError);
      expect(
        await employeeService.updateItem({ id: mockId, ...mockEmployee })
      ).toThrowError(mockError);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
    try {
      jest.spyOn(transaction, 'commit').mockRejectedValueOnce(mockError);
      expect(
        await employeeService.hideItemById(mockId, mockEmployee)
      ).toThrowError(mockError);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
    try {
      expect(await employeeService.hideItemsByIds([mockId])).toThrowError(
        mockError
      );
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });
});
