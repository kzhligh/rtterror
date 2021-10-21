const Sequelize = require('sequelize/lib/sequelize');
require('./sequelize');

jest.mock('sequelize/lib/sequelize', () => {
  const mockClient = {
    authenticate: jest.fn(),
    define: jest.fn(),
  };

  return jest.fn(() => mockClient);
});

describe('sequelize Node.js client setup', () => {
  it('should setup client correctly', () => {
    expect(Sequelize).toHaveBeenCalled();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
