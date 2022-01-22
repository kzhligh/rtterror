const mSequelize = {};

jest.mock('../../modules/sequelize', () => {
  return mSequelize;
});

const modelStaticMethodMocks = {
  init: jest.fn(),
};

jest.doMock('sequelize', () => {
  class MockModel {
    public static init(attributes: any, options: any) {
      modelStaticMethodMocks.init(attributes, options);
    }
  }
  return {
    ...jest.requireActual('sequelize'),
    Model: MockModel,
  };
});

describe('Service Model', () => {
  it('should setup the service table', async () => {
    await import('../service');
    expect(modelStaticMethodMocks.init).toBeCalledTimes(1);
  });
});
