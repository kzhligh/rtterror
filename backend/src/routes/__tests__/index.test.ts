import serviceRouter from '../service';
import comboRouter from '../combo';
import { customerRouter } from '../customer.route';
import employeeRouter from '../employee';

const spyRouterInstance = jest.fn();

jest.doMock('express', () => ({
  Router: () => ({
    use: spyRouterInstance,
    get: jest.fn(),
  }),
}));

jest.mock('../service', () => jest.fn());
jest.mock('../combo', () => jest.fn());
jest.mock('../customer.route', () => jest.fn());
jest.mock('../employee', () => jest.fn());

describe('should test server configuration', () => {
  require('../index.ts');

  it('should route /services to Service Router', () => {
    expect(spyRouterInstance).toHaveBeenCalledWith('/services', serviceRouter);
  });

  it('should route /combos to Combo Router', () => {
    expect(spyRouterInstance).toHaveBeenCalledWith('/combos', comboRouter);
  });

  it('should route /customer to Customer Router', () => {
    expect(spyRouterInstance).toHaveBeenCalledWith('/customer', customerRouter);
  });

  it('should route /employees to Employee Router', () => {
    expect(spyRouterInstance).toHaveBeenCalledWith(
      '/employees',
      employeeRouter
    );
  });
});
