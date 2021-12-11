import express from 'express';
import cors from 'cors';
import request, { SuperTest } from 'supertest';
import serviceRouter from '../service';

jest.useFakeTimers('legacy');

jest.mock('../../models/service', () => ({
  init: jest.fn(),
}));

jest.mock('../../services/service-service', () => ({
  getAllValidItems: () => Promise.resolve({}),
}));

let server: SuperTest<request.Test>;

beforeAll(() => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use('/services', serviceRouter);
  app.listen(5000);
  server = request(app);
});

describe('Service Routes', () => {
  it('should respond to /services', async () => {
    await server.get('/services').expect(200);
  });
});
