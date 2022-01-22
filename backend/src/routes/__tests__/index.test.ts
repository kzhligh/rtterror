import serviceRouter from '../service';
import comboRouter from '../combo';
import { customerRouter } from '../customer.route';

const spyRouterInstance = jest.fn();

jest.doMock('express', () => ({
  Router: () => ({
    use: spyRouterInstance,
    get: jest.fn()
  }),
}));

jest.mock('../service', () => jest.fn());
jest.mock('../combo', () => jest.fn());
jest.mock('../customer.route', () => jest.fn());

describe('should test server configuration', () => {
  it('should use router', () => {
    require('../index.ts');
    expect(spyRouterInstance).toHaveBeenCalledWith('/services', serviceRouter);
    expect(spyRouterInstance).toHaveBeenCalledWith('/combos', comboRouter);
    expect(spyRouterInstance).toHaveBeenCalledWith('/customer', customerRouter);
  });
});
