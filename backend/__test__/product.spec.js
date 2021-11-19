const { sequelize } = require('../modules/sequelize');
const { DataTypes } = require('sequelize');
const { Product } = require('../models/product');

jest.mock('../modules/sequelize');

describe('Product Model', () => {
  it('should setup the product table', async () => {
    expect(sequelize.define).toHaveReturnedWith(sequelize.models.Product);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});