import app from '../../server';
import request from 'supertest';

jest.useFakeTimers('legacy');

jest.mock('sequelize', () => ({
  ...jest.requireActual('sequelize'),
  authenticate: jest.fn(),
  Model: jest.fn(),
}));

jest.mock('../../modules/sequelize', () => ({
  Sequelize: jest.fn(),
  model: jest.fn(),
  authenticate: jest.fn(() => {
  return Promise.resolve('value');
}),
}));

jest.mock('../../models/service', () => ({
  init: jest.fn(),
}));

jest.mock('../../models/syncTables');

jest.mock('../../services/service-service', () => ({
  getAllValidItems: () => Promise.resolve({}),
}));

describe('Service Routes', () => {
  it('should respond to /services', async () => {
    const server = request(app);
    await server.get('/api/v1/services').expect(200);
  });
});
