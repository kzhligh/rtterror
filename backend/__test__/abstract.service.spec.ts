import { Model, Transaction } from 'sequelize';
import sequelize from '../src/modules/sequelize';
import GeneralService from '../src/services/general-service';

class MockModelEntity extends Model {
  toJSON() {
    return {};
  }
}

jest.mock('sequelize');

describe('General service class', function () {
  let service: GeneralService<any, any>;

  beforeEach(() => {
    service = new GeneralService('bob');
    service.model = Model;
  });

  it('should be able to create an item', async function () {
    const mockItem = {};
    const t = new Transaction(sequelize, {});

    jest.spyOn(sequelize, 'transaction').mockResolvedValue(t);
    jest.spyOn(service, 'createItem');
    jest.spyOn(Model, 'create').mockResolvedValue(new MockModelEntity());

    expect(await service.createItem(mockItem)).toEqual({});
  });

  it('should be able to get all items', async function () {
    const mockItems = [new MockModelEntity()];

    jest.spyOn(Model, 'findAll').mockResolvedValue(mockItems);

    expect(await service.getAllItems()).toEqual([{}]);
    expect(Model.findAll).toBeCalled();
  });

  it('should be able to get item by id', async function () {
    const mockId = 'bob_id';
    const mockItem = new MockModelEntity();

    jest.spyOn(Model, 'findByPk').mockResolvedValue(mockItem);

    expect(await service.getItemById(mockId)).toEqual({});
    expect(Model.findByPk).toBeCalledWith(mockId);
  });

  it('should be able to update an item', async function () {
    const mockItem = {};
    const t = new Transaction(sequelize, {});

    jest.spyOn(sequelize, 'transaction').mockResolvedValue(t);
    jest
      .spyOn(Model, 'upsert')
      .mockResolvedValue([new MockModelEntity(), false]);

    expect(await service.updateItem(mockItem)).toEqual(mockItem);
    expect(sequelize.transaction).toBeCalled();
    expect(Model.upsert).toBeCalled();
  });

  it('should be able to update an item by id', async function () {
    const mockItem = {};
    const mockId = 'bob_id';
    const t = new Transaction(sequelize, {});

    jest.spyOn(sequelize, 'transaction').mockResolvedValue(t);
    jest
      .spyOn(Model, 'upsert')
      .mockResolvedValue([new MockModelEntity(), false]);

    expect(await service.updateItemById(mockId, {})).toEqual(mockItem);
    expect(sequelize.transaction).toBeCalled();
    expect(Model.upsert).toBeCalled();
  });

  it('should be able to delete an item by id', async function () {
    const mockNumberOfDeletions = 1;
    const mockId = 'bob_id';
    const t = new Transaction(sequelize, {});

    jest.spyOn(sequelize, 'transaction').mockResolvedValue(t);
    jest.spyOn(Model, 'destroy').mockResolvedValue(mockNumberOfDeletions);

    await service.deleteItemById(mockId);

    expect(sequelize.transaction).toBeCalled();
    expect(Model.destroy).toBeCalled();
  });

  it('should throw errors on exceptions that are caught', async () => {
    const transaction = new Transaction(sequelize, {});
    const mockError = { name: 'error', message: 'bob' };
    const mockId = 'bob_id';

    jest.spyOn(sequelize, 'transaction').mockResolvedValueOnce(transaction);
    jest.spyOn(Model, 'create').mockRejectedValue(mockError);
    jest.spyOn(Model, 'findAll').mockRejectedValue(mockError);
    jest.spyOn(Model, 'findByPk').mockRejectedValue(mockError);
    jest
      .spyOn(Model, 'upsert')
      .mockResolvedValue([new MockModelEntity(), true]);
    jest.spyOn(Model, 'destroy').mockResolvedValue(Infinity);

    try {
      expect(await service.createItem({})).toThrowError();
    } catch (error) {
      expect(error).toEqual(mockError);
    }

    try {
      expect(await service.getAllItems()).toThrowError();
    } catch (error) {
      expect(error).toEqual(mockError);
    }

    try {
      expect(await service.getItemById(mockId)).toThrowError();
    } catch (error) {
      expect(error).toEqual(mockError);
    }

    try {
      expect(await service.updateItem(mockId)).toThrowError();
    } catch (error) {
      expect(error).toBeDefined();
    }

    try {
      expect(await service.updateItemById(mockId, {})).toThrowError();
    } catch (error) {
      expect(error).toEqual(
        new Error(`ERROR - no item has been found with the id: ${mockId}`)
      );
    }

    try {
      expect(await service.deleteItemById(mockId)).toThrowError();
    } catch (error) {
      expect(error).toBeDefined();
    }

    try {
      jest.spyOn(Model, 'destroy').mockResolvedValue(0);
      expect(await service.deleteItemById(mockId)).toThrowError();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
