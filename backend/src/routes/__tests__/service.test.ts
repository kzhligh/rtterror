import express from 'express';
import { Server } from 'http';
import request, { SuperTest } from 'supertest';
import serviceRouter from '../service';

jest.useFakeTimers('legacy');

jest.mock('../../models/service', () => ({
  init: jest.fn(),
}));

jest.mock('../../services/service-service', () => ({
  getAllValidItems: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({ method: 'getAllValidItems', value: null })
    ),
  getItemById: jest
    .fn()
    .mockImplementationOnce((id: number) =>
      Promise.resolve({ method: 'getItemById', value: id })
    )
    .mockRejectedValueOnce(99),
  createItem: (content: any) =>
    Promise.resolve({ method: 'createItem', value: content }),
  updateItem: (content: any) =>
    Promise.resolve({ method: 'updateItem', value: content }),
  updateItemById: jest
    .fn()
    .mockImplementation((id: number, content: any) =>
      Promise.resolve({ method: 'updateItemById', value: content })
    )
    .mockRejectedValueOnce(99),
}));

const pathOkId = '/0';
const pathErrorId = '/99';
const pathService = '/services';

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
  it(`should route get(${pathService}) to getAllValidItems`, async () => {
    const response = await req.get('/services').expect(200);

    expect(response.body.method).toEqual('getAllValidItems');
  });

  it(`should route get(${pathService + pathOkId}) to getItemById`, async () => {
    const response = await req.get(pathService + pathOkId).expect(200);

    expect(response.body.method).toEqual('getItemById');
    expect(response.body.value).toBe('0');
  });

  it(`should route get(${pathService +
    pathErrorId}) to fail getItemById`, async () => {
    const response = await req.get(pathService + pathErrorId).expect(400);

    expect(response.body.method).toBeUndefined();
    expect(response.body.value).toBeUndefined();
  });

  it(`should route post(${pathService}) to createItem`, async () => {
    const response = await req.post(pathService).expect(200);

    expect(response.body.method).toEqual('createItem');
  });

  it(`should route put(${pathService}) to updateItem`, async () => {
    const response = await req.put(pathService).expect(200);

    expect(response.body.method).toEqual('updateItem');
  });

  it(`should route delete(${pathService +
    pathErrorId}) non existent id with json to fail updateItemById`, async () => {
    const response = await req
      .del(pathService + pathErrorId)
      .send({ hidden: true })
      .expect(400);

    expect(response.body.method).toBeUndefined();
    expect(response.body.value).toBeUndefined();
  });

  it(`should route delete(${pathService +
    pathOkId}) with json to updateItemById`, async () => {
    const response = await req
      .del(pathService + pathOkId)
      .send({ hidden: true })
      .expect(200);

    expect(response.body.method).toEqual('updateItemById');
    expect(response.body.value.hidden).toBe(true);
  });

  it(`should route put(${pathService +
    pathOkId +
    '/block'}) to updateItemById with status=200 and blocked:true`, async () => {
    const response = await req
      .put(pathService + pathOkId + '/block')
      .send({ blocked: true })
      .expect(200);

    expect(response.body.method).toEqual('updateItemById');
    expect(response.body.value.blocked).toBe(true);
  });

  it(`should route ${pathService +
    pathOkId +
    '/unblock'} to updateItemById with status=200 and blocked:false`, async () => {
    const response = await req
      .put(pathService + pathOkId + '/unblock')
      .send({ blocked: false })
      .expect(200);

    expect(response.body.method).toEqual('updateItemById');
    expect(response.body.value.blocked).toBe(false);
  });
});
