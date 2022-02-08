import {
  IService,
  IServicesDto,
  IDurationsPrices,
} from '../../interfaces/IService';
import serviceService from '../service-service';

const durations_prices: IDurationsPrices[] = [
  { duration: 50, price: '20' },
  { duration: 100, price: '30' },
];

const mockCustomerDto: IServicesDto = {
  service_code: 'abc',
  name: 'jane',
  durations_prices: durations_prices,
};

const mockCustomer: IService = {
  id: '1234',
  blocked: false,
  hidden: false,
  service_code: 'xyz',
  name: 'john',
  duration: 50,
  price: '20',
};

const mockCustomers: Array<typeof mockCustomer> = [mockCustomer, mockCustomer];

jest.mock('sequelize', () => ({
  ...jest.requireActual('sequelize'),
  authenticate: jest.fn(),
  Model: jest.fn(),
}));

jest.mock('../../modules/sequelize', () => ({
  Sequelize: jest.fn(),
  model: jest.fn().mockImplementation(() => ({
    create: jest.fn().mockImplementation(() => ({
      toJSON: jest.fn().mockResolvedValue(mockCustomer),
    })),
    findAll: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          toJSON: jest.fn().mockResolvedValue(mockCustomer),
        },
        {
          toJSON: jest.fn().mockResolvedValue(mockCustomer),
        },
      ])
    ),
    findByPk: jest.fn().mockImplementation(() => ({
      toJSON: jest.fn().mockResolvedValue(mockCustomer),
    })),
    upsert: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          toJSON: jest.fn().mockResolvedValue(mockCustomer),
        },
        false,
      ])
    ),
    updateItem: jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockCustomer)),
    destroy: jest
      .fn()
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce(0),
  })),
  authenticate: jest.fn(() => {
    return Promise.resolve('value');
  }),
  transaction: jest.fn(() => ({ commit: jest.fn(), rollback: jest.fn() })),
}));

describe('Services for Service Module', () => {
  it('should create item and return new item', async () => {
    jest.spyOn(serviceService, 'createItem');

    serviceService.createItem(mockCustomerDto);
    expect(serviceService.createItem).toBeCalledWith(mockCustomerDto);
    expect(serviceService.createItem).toHaveReturnedWith(
      Promise.resolve(mockCustomer)
    );
  });

  it('should get all services in an array', async () => {
    jest.spyOn(serviceService, 'getAllItems');

    serviceService.getAllItems();
    expect(serviceService.getAllItems).toHaveReturnedWith(
      Promise.resolve(mockCustomers)
    );
  });

  it('should get service by ID as json', async () => {
    jest.spyOn(serviceService, 'getItemById');

    serviceService.getItemById('uuid1');
    expect(serviceService.getItemById).toReturnWith(
      Promise.resolve(mockCustomer)
    );
  });

  it('should update service', async () => {
    jest.spyOn(serviceService, 'updateItem');

    serviceService.updateItem(mockCustomer);
    expect(serviceService.updateItem).toBeCalledTimes(1);
    expect(serviceService.updateItem).toHaveReturnedWith(
      Promise.resolve(mockCustomer)
    );
  });

  it('should update service by ID', async () => {
    jest.spyOn(serviceService, 'updateItemById');

    serviceService.updateItemById('1234', mockCustomerDto);
    expect(serviceService.updateItemById).toHaveReturnedWith(
      Promise.resolve(mockCustomer)
    );
  });

  it('should delete service by ID', async () => {
    jest.spyOn(serviceService, 'deleteItemById');

    serviceService.deleteItemById('1234');
    expect(serviceService.deleteItemById).toHaveReturnedWith(
      Promise.resolve(mockCustomer)
    );
  });

  it('should get all valid services in an array', async () => {
    jest.spyOn(serviceService, 'getAllValidItems');

    serviceService.getAllValidItems();
    expect(serviceService.getAllValidItems).toReturnWith(
      Promise.resolve(mockCustomers)
    );
  });
});
