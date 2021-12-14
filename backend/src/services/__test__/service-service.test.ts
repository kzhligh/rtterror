import serviceService from '../service-service';

jest.mock('sequelize', () => ({
  ...jest.requireActual('sequelize'),
  authenticate: jest.fn(),
  Model: jest.fn(),
}));

jest.mock('../../modules/sequelize', () => ({
  Sequelize: jest.fn(),
  model: jest.fn(() => ({
    findAll: jest.fn(() => Promise.resolve([])),
  })),
  authenticate: jest.fn(() => {
    return Promise.resolve('value');
  }),
}));

const getAllValidItems = jest.spyOn(serviceService, 'getAllValidItems');

describe('Services for Service Module', () => {
  it.only('should get all valid items as json', async () => {
    serviceService.getAllValidItems();
    expect(getAllValidItems).toHaveReturnedWith(Promise.resolve({}));
  });
});
