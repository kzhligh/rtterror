import { CustomerService } from '../src/services/customer.service';
import { Customer } from '../src/models/customer.model';
import Appointment from '../src/models/appointment';
import { Op, Sequelize, Transaction, Model } from 'sequelize';

const mockCustomer = {
  firstName: 'mock first name',
  lastName: 'mock last name',
  email: 'mock@email.com',
  dob: '1997-11-17',
  gender: 'M',
  address: 'mock address',
  postalCode: 'mock postal code',
  phone: 'mock phone number',
};

const mockCustomerRow = {
  id: 'mock id',
  ...mockCustomer,
};

const mockNumber = 1;

jest.mock('sequelize');
jest.mock('../src/models/customer.model', () => ({
  Customer: {
    create: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve<typeof mockCustomerRow>(mockCustomerRow)
      ),
    findAll: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve<Array<typeof mockCustomerRow>>([mockCustomerRow])
      ),
    findByPk: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve<typeof mockCustomerRow>(mockCustomerRow)
      ),
    destroy: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve<number>([mockCustomerRow].length)
      ),
    upsert: jest
      .fn()
      .mockImplementation(() => Promise.resolve<typeof Model>(Model)),
    count: jest
      .fn()
      .mockImplementation(() => Promise.resolve<number>(mockNumber)),
  },
}));

describe('Customer Service', () => {
  const sequelize = new Sequelize('mock db', 'mock credential');
  let customerService: CustomerService;

  beforeEach(() => {
    customerService = new CustomerService(sequelize);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be frozen', () => {
    expect(Object.isFrozen(CustomerService)).toBe(true);
  });

  it('should be able to create a new customer', async () => {
    jest.spyOn(Customer, 'create');

    expect(await customerService.createCustomer(mockCustomer)).toEqual(
      mockCustomerRow
    );
    expect(Customer.create).toBeCalledTimes(1);
    expect(Customer.create).toBeCalledWith(mockCustomer);
  });

  it('should be able to retrieve the list of customers', async () => {
    jest.spyOn(Customer, 'findAll');

    expect(await customerService.getAllCustomers()).toEqual([mockCustomerRow]);
    expect(Customer.findAll).toBeCalledTimes(1);
    expect(Customer.findAll).toBeCalledWith({ order: undefined });
  });

  it('should be able to retrieve a sorted list of customers based on a provided column', async () => {
    const mockSortOption = 'mock column';
    jest.spyOn(Customer, 'findAll');

    expect(await customerService.getAllCustomers(mockSortOption)).toEqual([
      mockCustomerRow,
    ]);
    expect(Customer.findAll).toBeCalledTimes(1);
    expect(Customer.findAll).toBeCalledWith({
      order: [[mockSortOption, 'ASC']],
    });
  });

  it('should be able to retrieve a customer based on pk', async () => {
    const mockPk = mockCustomerRow.id;
    jest.spyOn(Customer, 'findByPk');

    expect(await customerService.getCustomerById(mockPk)).toEqual(
      mockCustomerRow
    );
    expect(Customer.findByPk).toBeCalledTimes(1);
    expect(Customer.findByPk).toBeCalledWith(mockPk);
  });

  it('should be able to delete customers and return remaining customers', async () => {
    const deletedCustomerArg = [mockCustomerRow.id];
    const t = new Transaction(sequelize, {});
    jest.spyOn(sequelize, 'transaction').mockImplementationOnce(async () => t);
    jest.spyOn(Customer, 'destroy');
    jest
      .spyOn(Customer, 'findAll')
      .mockImplementationOnce(() => Promise.resolve(new Array()));

    expect(await customerService.deleteCustomers(deletedCustomerArg)).toEqual(
      []
    );
    expect(sequelize.transaction).toBeCalledTimes(1);
    expect(Customer.destroy).toBeCalledWith({
      where: {
        [Op.or]: deletedCustomerArg.map((id) => ({ id })),
      },
      transaction: t,
    });
    expect(Customer.destroy).toBeCalledTimes(1);
    expect(Customer.findAll).toBeCalledWith({
      order: undefined,
      transaction: t,
    });
    expect(Customer.findAll).toBeCalledTimes(1);
  });

  it('should return customers on empty delete', async () => {
    const emptyList: Array<string | number> = [];
    const t = new Transaction(sequelize, {});

    jest.spyOn(sequelize, 'transaction').mockImplementationOnce(async () => t);
    jest.spyOn(Customer, 'destroy');
    jest.spyOn(Customer, 'findAll');

    expect(await customerService.deleteCustomers(emptyList)).toEqual([
      mockCustomerRow,
    ]);
    expect(sequelize.transaction).toBeCalledTimes(1);
    expect(Customer.destroy).toBeCalledWith({
      where: {
        [Op.or]: emptyList.map((id) => ({ id })),
      },
      transaction: t,
    });
    expect(Customer.destroy).toBeCalledTimes(1);
    expect(Customer.findAll).toBeCalledWith({
      order: undefined,
      transaction: t,
    });
    expect(Customer.findAll).toBeCalledTimes(1);
  });

  it('should rollback the changes applied during the transaction while attempting to delete customers', async () => {
    const emptyList: Array<string | number> = [];
    const t = new Transaction(sequelize, {});
    const mockException = new Error('mock error message');

    jest.spyOn(sequelize, 'transaction').mockImplementationOnce(async () => t);
    jest
      .spyOn(Customer, 'destroy')
      .mockImplementationOnce(() => Promise.reject(mockException));
    jest.spyOn(Customer, 'findAll');

    try {
      expect(await customerService.deleteCustomers(emptyList)).toThrowError(
        mockException
      );
    } catch (error) {
      expect(error).toEqual(mockException);
      expect(sequelize.transaction).toBeCalledTimes(1);
      expect(Customer.destroy).toBeCalledWith({
        where: {
          [Op.or]: emptyList.map((id) => ({ id })),
        },
        transaction: t,
      });
      expect(Customer.destroy).toBeCalledTimes(1);
      expect(Customer.findAll).not.toBeCalled();
      expect(t.rollback).toBeCalledTimes(1);
    }
  });

  it('should be able to update a customer', async () => {
    jest.spyOn(Customer, 'upsert');

    expect(await customerService.updateCustomer(mockCustomerRow)).toEqual(
      Model
    );
    expect(Customer.upsert).toBeCalledTimes(1);
    expect(Customer.upsert).toBeCalledWith(mockCustomerRow);
  });

  it('should be able to search based on first name, last name, phone or email columns', async () => {
    const mockQuery = 'mock query';
    jest.spyOn(Customer, 'findAll');

    expect(await customerService.searchCustomer(mockQuery)).toEqual([
      mockCustomerRow,
    ]);
    expect(Customer.findAll).toBeCalledWith({
      where: {
        [Op.or]: {
          firstName: {
            [Op.startsWith]: mockQuery,
          },
          lastName: {
            [Op.startsWith]: mockQuery,
          },
          client_id: {
            [Op.startsWith]: mockQuery,
          },
          phone: {
            [Op.startsWith]: mockQuery,
          },
        },
      },
    });
    expect(Customer.findAll).toBeCalledTimes(1);
  });

  it('should be able to check for duplicate customers with the same values in the names column', async () => {
    const mockNames = ['mock first name', 'mock last name'] as const;
    const [firstName, lastName] = mockNames;
    jest.spyOn(Customer, 'count');

    expect(await customerService.checkDuplicateCustomer(...mockNames)).toEqual({
      duplicate: true,
    });
    expect(Customer.count).toBeCalledWith({
      where: {
        [Op.and]: {
          firstName,
          lastName,
        },
      },
    });
    expect(Customer.count).toBeCalledTimes(1);
  });

  it('should be able to retrieve a customer with its appointments', async () => {
    const mockPk = 'mock pk';
    jest.spyOn(Customer, 'findByPk');

    expect(await customerService.getCustomerWithAppointments(mockPk)).toEqual(
      mockCustomerRow
    );
    expect(Customer.findByPk).toBeCalledWith(mockPk, {
      include: Appointment,
    });
    expect(Customer.findByPk).toBeCalledTimes(1);
  });
});
