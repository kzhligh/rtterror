7const CustomerDAO = require('./customer');
const { Customer } = require('../models/customer');
const { sequelize } = require('../modules/sequelize');
const { Op } = require('sequelize');
const { Appointment } = require('../models/appointment');

jest.mock('../models/customer');

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

describe('Customer DAO', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => await sequelize.close());

  it('should be able to create a new customer', () => {
    jest.spyOn(CustomerDAO, 'createCustomer');

    CustomerDAO.createCustomer(mockCustomer);

    expect(Customer.create).toBeCalledWith(mockCustomer);
    expect(CustomerDAO.createCustomer).toBeCalledWith(mockCustomer);
    expect(CustomerDAO.createCustomer).toBeCalledTimes(1);
  });

  it('should be able to get all customers by default sorted by ID', () => {
    jest.spyOn(CustomerDAO, 'getAllCustomers');

    CustomerDAO.getAllCustomers();

    expect(Customer.findAll).toBeCalledWith({});
    expect(CustomerDAO.getAllCustomers).toBeCalledTimes(1);
  });

  it('should be able to get all customers sortedBy the specified field', () => {
    const mockSort = 'mock';
    jest.spyOn(CustomerDAO, 'getAllCustomers');

    CustomerDAO.getAllCustomers(mockSort);

    expect(Customer.findAll).toBeCalledWith({
      order: [[mockSort, 'ASC']],
    });
    expect(CustomerDAO.getAllCustomers).toBeCalledTimes(1);
    expect(CustomerDAO.getAllCustomers).toBeCalledWith(mockSort);
  });

  it('should be able to get a row based on the provided PK', () => {
    const pk = 'mock-pk';
    jest.spyOn(CustomerDAO, 'getCustomerByID');

    CustomerDAO.getCustomerByID(pk);

    expect(Customer.findByPk).toBeCalledWith(pk);
    expect(CustomerDAO.getCustomerByID).toBeCalledTimes(1);
  });

  it('should be able to delete customers and return the remaining rows', async () => {
    const mockIDsToBeDeleted = [1, 2, 3];
    jest.spyOn(CustomerDAO, 'deleteCustomers');
    Customer.findAll.mockResolvedValue([mockCustomer]);

    const remainingCustomers = await CustomerDAO.deleteCustomers(
      mockIDsToBeDeleted
    );

    expect(Customer.findAll).toBeCalledTimes(1);
    expect(CustomerDAO.deleteCustomers).toBeCalledWith(mockIDsToBeDeleted);
    expect(CustomerDAO.deleteCustomers).toBeCalledTimes(1);
    expect(remainingCustomers).toEqual([mockCustomer]);
  });

  it('should be able to rollback the transaction and throw the error on detecting a raised exception during customer delete', async () => {
    const mockErrorMessage = 'mock error message';
    const mockIDsToBeDeleted = [1, 2, 3];
    jest.spyOn(CustomerDAO, 'deleteCustomers');
    Customer.destroy.mockRejectedValueOnce(new Error(mockErrorMessage));

    try {
      await CustomerDAO.deleteCustomers(mockIDsToBeDeleted);
    } catch (error) {
      expect(error.message).toBe(mockErrorMessage);
    }

    expect(Customer.destroy).toBeCalledTimes(1);
    expect(Customer.findAll).not.toBeCalled();
    expect(CustomerDAO.deleteCustomers).toBeCalledWith(mockIDsToBeDeleted);
    expect(CustomerDAO.deleteCustomers).toBeCalledTimes(1);
  });

  it('should be able to update a customer properly', () => {
    jest.spyOn(CustomerDAO, 'updateCustomer');

    CustomerDAO.updateCustomer(mockCustomer);

    expect(Customer.upsert).toBeCalledWith(mockCustomer);
    expect(Customer.upsert).toBeCalledTimes(1);
    expect(CustomerDAO.updateCustomer).toBeCalledWith(mockCustomer);
    expect(CustomerDAO.updateCustomer).toBeCalledTimes(1);
  });

  it('should be able to search for a customer', () => {
    const mockQuery = 'mock';
    const mockSearchOptions = {
      where: {
        [Op.or]: {
          firstName: {
            [Op.startsWith]: mockQuery,
          },
          lastName: {
            [Op.startsWith]: mockQuery,
          },
          email: {
            [Op.startsWith]: mockQuery,
          },
          phone: {
            [Op.startsWith]: mockQuery,
          },
        },
      },
    };
    jest.spyOn(CustomerDAO, 'searchCustomer');

    CustomerDAO.searchCustomer(mockQuery);

    expect(CustomerDAO.searchCustomer).toBeCalledWith(mockQuery);
    expect(CustomerDAO.searchCustomer).toBeCalledTimes(1);
    expect(Customer.findAll).toBeCalledWith(mockSearchOptions);
    expect(Customer.findAll).toBeCalledTimes(1);
  });

  it('should be able to check for duplicates', () => {
    const firstName = 'mock first name';
    const lastName = 'mock last name';
    const mockSearchOptions = {
      where: {
        [Op.and]: {
          firstName,
          lastName,
        },
      },
    };
    jest.spyOn(CustomerDAO, 'checkDuplicateCustomer');

    CustomerDAO.checkDuplicateCustomer(firstName, lastName);

    expect(CustomerDAO.checkDuplicateCustomer).toBeCalledWith(
      firstName,
      lastName
    );
    expect(CustomerDAO.checkDuplicateCustomer).toBeCalledTimes(1);
    expect(Customer.count).toBeCalledWith(mockSearchOptions);
    expect(Customer.count).toBeCalledTimes(1);
  });

  it("should be able to perform joins on a customer's appointments", () => {
    const mockCustomerId = 'mock customer id';
    const mockMethodParam = {
      include: Appointment,
    };
    jest.spyOn(CustomerDAO, 'getCustomerWithAppointments');

    CustomerDAO.getCustomerWithAppointments(mockCustomerId, mockMethodParam);

    expect(CustomerDAO.getCustomerWithAppointments).toBeCalledWith(
      mockCustomerId,
      mockMethodParam
    );
    expect(CustomerDAO.getCustomerWithAppointments).toBeCalledTimes(1);
    expect(Customer.findByPk).toBeCalledWith(mockCustomerId, mockMethodParam);
    expect(Customer.findByPk).toBeCalledTimes(1);
  });
});
