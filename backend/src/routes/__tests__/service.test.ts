import express from 'express';
import cors from 'cors';
import { Server } from 'http';
import request, { SuperTest } from 'supertest';
import serviceRouter from '../service';

jest.useFakeTimers('legacy');

jest.mock('../../models/service', () => ({
  init: jest.fn(),
}));

jest.mock('../../services/service-service', () => ({
  getAllValidItems: () =>
    Promise.resolve({ method: 'getAllValidItems', value: null }),
  getItemById: (id: number) =>
    Promise.resolve({ method: 'getItemById', value: id }),
  createItem: (content: any) =>
    Promise.resolve({ method: 'createItem', value: content }),
  updateItem: (content: any) =>
    Promise.resolve({ method: 'updateItem', value: content }),
  updateItemById: (id: number, content: any) =>
    Promise.resolve({ method: 'updateItemById', value: content }),
}));

let req: SuperTest<request.Test>;
let server: Server;

beforeAll(() => {
  const app = express();
  app.use(express.json());
  app.use('/services', serviceRouter);
  server = app.listen(5000);
  req = request(app);
});

afterAll(() => {
  server.close();
});

describe('Service Routes', () => {
  const pathService = '/services';
  it(`should route get(${pathService}) to getAllValidItems`, async () => {
    const response = await req.get('/services').expect(200);

    expect(response.body.method).toBe('getAllValidItems');
  });

  const pathServiceNonExistentId = '/services/0';
  it(`should route get(${pathServiceNonExistentId}) to getItemById`, async () => {
    const response = await req.get(pathServiceNonExistentId).expect(200);

    expect(response.body.method).toBe('getItemById');
    expect(response.body.value).toBe('0');
  });

  it(`should route post(${pathService}) to createItem`, async () => {
    const response = await req.post(pathService).expect(200);

    expect(response.body.method).toBe('createItem');
  });

  it(`should route put(${pathService}) to updateItem`, async () => {
    const response = await req.put(pathService).expect(200);

    expect(response.body.method).toBe('updateItem');
  });

  it(`should route delete(${pathServiceNonExistentId}) with json to updateItemById`, async () => {
    const response = await req
      .del(pathServiceNonExistentId)
      .send({ hidden: true })
      .expect(200);

    expect(response.body.method).toBe('updateItemById');
    expect(response.body.value.hidden).toBe(true);
  });

  const pathServiceNonExistentIdBlock = '/services/block/0';
  it(`should route put(${pathServiceNonExistentIdBlock}) to `, async () => {
    const response = await req
      .put(pathServiceNonExistentIdBlock)
      .send({ blocked: true })
      .expect(200);

    expect(response.body.method).toBe('updateItemById');
    expect(response.body.value.blocked).toBe(true);
  });

  const pathServiceNonExistentIdUnblock = '/services/unblock/0';
  it(`should respond to ${pathServiceNonExistentIdUnblock} put nonexistent with 400`, async () => {
    const response = await req
      .put(pathServiceNonExistentIdUnblock)
      .send({ blocked: false })
      .expect(200);

    expect(response.body.method).toBe('updateItemById');
    expect(response.body.value.blocked).toBe(false);
  });
});
