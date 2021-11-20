const { syncAllTables } = require('../models/syncTables')

jest.mock('../models/syncTables');

describe('Service Model', () => {
  it('should setup the service table', async () => {
    expect(syncAllTables).not.toThrow();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});