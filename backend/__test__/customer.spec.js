const { sequelize } = require('../modules/sequelize');
const { Customer } = require('../models/customer');

jest.mock('../modules/sequelize');

describe('Customer Model', () => {
  it('should setup the customer table', async () => {
    expect(sequelize.define).toHaveReturnedWith(sequelize.models.Customer);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
