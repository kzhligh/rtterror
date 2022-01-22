import serviceRouter from '../service';
import comboRouter from '../combo';
import { customerRouter } from '../customer.route';

const useSpy = jest.fn();

jest.doMock('express', () => ({
  Router: () => ({
    use: useSpy,
    get: jest.fn()
  }),
}));

jest.mock('../service', () => jest.fn());
jest.mock('../combo', () => jest.fn());
jest.mock('../customer.route', () => jest.fn());

describe('should test server configuration', () => {
  it('should use router', () => {
    require('../index.ts');
    expect(useSpy).toHaveBeenCalledWith('/services', serviceRouter);
    expect(useSpy).toHaveBeenCalledWith('/combos', comboRouter);
    expect(useSpy).toHaveBeenCalledWith('/customer', customerRouter);
  });
});
