const { sequelize } = require('../modules/sequelize');
const { DataTypes } = require('sequelize');
const { Service } = require('../models/service');

jest.mock('../modules/sequelize');

describe('Service Model', () => {
  it('should setup the service table', async () => {
    expect(sequelize.define).toHaveReturnedWith(sequelize.models.Service);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});