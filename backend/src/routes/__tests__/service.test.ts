import express from 'express';
import { Server } from 'http';
import request, { SuperTest } from 'supertest';
import serviceRouter from '../service';

jest.useFakeTimers('legacy');

jest.mock('../../models/service', () => ({
  init: jest.fn(),
}));

const okServiceCode = 'valid-service-code';
const pathOkServiceCode = '/' + okServiceCode;
const errorServiceCode = 'bad-service-code';
const pathErrorServiceCode = '/' + errorServiceCode;
const pathService = '/services';
const getAllValidItemsMethodName = 'getAllValidItems';
const getItemsByServiceCodeMethodName = 'getItemsByServiceCode';
const createItemsMethodName = 'createItems';
const updateItemsMethodName = 'updateItems';
const hideItemsByServiceCodeMethodName = 'hideItemsByServiceCode';
const blockUnblockServicesMethodName = 'blockUnblockServices';
jest.mock('../../services/service-service', () => ({
  getAllValidItems: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({ method: getAllValidItemsMethodName, value: null })
    ),
  getItemsByServiceCode: jest
    .fn()
    .mockImplementationOnce((serviceCode: string) =>
      Promise.resolve({
        method: getItemsByServiceCodeMethodName,
        value: serviceCode,
      })
    )
    .mockImplementationOnce(() => Promise.reject(errorServiceCode)),
  createItems: (content: any) =>
    Promise.resolve({ method: createItemsMethodName, value: content }),
  updateItems: (content: any) =>
    Promise.resolve({ method: updateItemsMethodName, value: content }),
  hideItemsByServiceCode: jest
    .fn()
    .mockImplementationOnce(() => Promise.reject(errorServiceCode))
    .mockImplementationOnce((_serviceCode: string, _content: any) =>
      Promise.resolve({
        method: hideItemsByServiceCodeMethodName,
        value: { hidden: true },
      })
    ),
  blockUnblockServices: jest
    .fn()
    .mockImplementationOnce((_serviceCode: string, _content: any) =>
      Promise.resolve({
        method: blockUnblockServicesMethodName,
        value: { blocked: true },
      })
    )
    .mockImplementationOnce((_serviceCode: string, _content: any) =>
      Promise.resolve({
        method: blockUnblockServicesMethodName,
        value: { blocked: false },
      })
    )
    .mockImplementationOnce(() => Promise.reject(errorServiceCode)),
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

describe('Service Routing with RESTful Parameters', () => {
  it(`should route get(${pathService}) to getAllValidItems`, async () => {
    const response = await req.get('/services').expect(200);

    expect(response.body.method).toEqual('getAllValidItems');
  });

  it(`should route get(${pathService +
    pathOkServiceCode}) to ${getItemsByServiceCodeMethodName}`, async () => {
    const response = await req.get(pathService + pathOkServiceCode).expect(200);

    expect(response.body.method).toEqual(getItemsByServiceCodeMethodName);
    expect(response.body.value).toBe(okServiceCode);
  });

  it(`should route get(${pathService +
    pathErrorServiceCode}) to fail ${getItemsByServiceCodeMethodName}`, async () => {
    const response = await req
      .get(pathService + pathErrorServiceCode)
      .expect(400);

    expect(response.body.method).toBeUndefined();
    expect(response.body.value).toBeUndefined();
  });

  it(`should route post(${pathService}) to ${createItemsMethodName}`, async () => {
    const response = await req.post(pathService).expect(200);

    expect(response.body.method).toEqual(createItemsMethodName);
  });

  it(`should route put(${pathService}) to ${updateItemsMethodName}`, async () => {
    const response = await req.put(pathService).expect(200);

    expect(response.body.method).toEqual(updateItemsMethodName);
  });

  it(`should route delete(${pathService +
    pathErrorServiceCode}) non existent id with json to fail ${hideItemsByServiceCodeMethodName}`, async () => {
    const response = await req
      .del(pathService + pathErrorServiceCode)
      .send({ hidden: true })
      .expect(400);

    expect(response.body.method).toBeUndefined();
    expect(response.body.value).toBeUndefined();
  });

  it(`should route delete(${pathService +
    pathOkServiceCode}) with json to ${hideItemsByServiceCodeMethodName}`, async () => {
    const response = await req
      .del(pathService + pathOkServiceCode)
      .send({ hidden: true })
      .expect(200);

    expect(response.body.method).toEqual(hideItemsByServiceCodeMethodName);
    expect(response.body.value.hidden).toBe(true);
  });

  it(`should route put(${pathService +
    pathOkServiceCode +
    '/block'}) to ${blockUnblockServicesMethodName} with status=200 and blocked:true`, async () => {
    const response = await req
      .put(pathService + pathOkServiceCode + '/block')
      .send({ blocked: true })
      .expect(200);

    expect(response.body.method).toEqual(blockUnblockServicesMethodName);
    expect(response.body.value.blocked).toBe(true);
  });

  it(`should route put${pathService +
    pathOkServiceCode +
    '/unblock'} to ${blockUnblockServicesMethodName} with status=200 and blocked:false`, async () => {
    const response = await req
      .put(pathService + pathOkServiceCode + '/unblock')
      .send({ blocked: false })
      .expect(200);

    expect(response.body.method).toEqual(blockUnblockServicesMethodName);
    expect(response.body.value.blocked).toBe(false);
  });

  it(`should route put${pathService +
    pathErrorServiceCode +
    '/unblock'} to ${blockUnblockServicesMethodName} with status=400`, async () => {
    const response = await req
      .put(pathService + pathErrorServiceCode + '/unblock')
      .send({ blocked: false })
      .expect(400);

    expect(response.body.method).toBeUndefined;
    expect(response.body.value).toBeUndefined;
  });
});
