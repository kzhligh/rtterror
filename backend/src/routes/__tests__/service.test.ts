import express from 'express';
import cors from 'cors';
import request, { SuperTest } from 'supertest';
import serviceRouter from '../service';

jest.useFakeTimers('legacy');

jest.mock('../../models/service', () => ({
  init: jest.fn(),
}));

jest.mock('../../services/service-service', () => ({
  getAllValidItems: () => Promise.resolve({method: 'getAllValidItems', value: null}),
  getItemById: (id: number) => Promise.resolve({method: 'getItemById', value: id}),
  createItem: (content: any) => Promise.resolve({method: 'createItem', value: content}),
  updateItem: (content: any) => Promise.resolve({method: 'updateItem', value: content}),
  updateItemById: (id: number, content: any) => Promise.resolve({method: 'updateItemById', value: content}),
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

  const pathService = '/services';
  it(`should route get(${pathService}) to getAllValidItems`, async () => {
    const response = await server
    .get('/services')
    .expect(200);

    expect(response.body.method).toBe('getAllValidItems');
  });

  const pathServiceNonExistentId = '/services/0';
  it(`should route get(${pathServiceNonExistentId}) to getItemById`, async () => {
    const response = await server
    .get(pathServiceNonExistentId)
    .expect(200);

    expect(response.body.method).toBe('getItemById');
    expect(response.body.value).toBe('0');
  });

  it(`should route post(${pathService}) to createItem`, async () => {
    const response = await server
    .post(pathService)
    .expect(200);

    expect(response.body.method).toBe('createItem');
  });

  it(`should route put(${pathService}) to updateItem`, async () => {
    const response = await server
    .put(pathService)
    .expect(200);

    expect(response.body.method).toBe('updateItem');
  });

  it(`should route delete(${pathServiceNonExistentId}) with json to updateItemById`, async () => {
    const response = await server
    .del(pathServiceNonExistentId)
    .send({ hidden: true })
    .expect(200);

    expect(response.body.method).toBe('updateItemById');
    expect(response.body.value.hidden).toBe(true);
  });

  const pathServiceNonExistentIdBlock = '/services/block/0';
  it(`should route put(${pathServiceNonExistentIdBlock}) to `, async () => {
    const response = await server
    .put(pathServiceNonExistentIdBlock)
    .send({ blocked: true })
    .expect(200);

    expect(response.body.method).toBe('updateItemById');
    expect(response.body.value.blocked).toBe(true);
  });

  const pathServiceNonExistentIdUnblock = '/services/unblock/0';
  it(`should respond to ${pathServiceNonExistentIdUnblock} put nonexistent with 400`, async () => {
    const response = await server
    .put(pathServiceNonExistentIdUnblock)
    .send({ blocked: false })
    .expect(200);

    expect(response.body.method).toBe('updateItemById');
    expect(response.body.value.blocked).toBe(false);
  });

});
