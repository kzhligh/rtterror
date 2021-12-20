import serviceRouter from '../service';
import comboRouter from '../combo';

const useSpy = jest.fn();

jest.doMock('express', () => ({
  Router: () => ({
    use: useSpy,
  }),
}));

jest.mock('../service', () => jest.fn());
jest.mock('../combo', () => jest.fn());

describe('should test server configuration', () => {
  it('should use router', () => {
    require('../index.ts');
    expect(useSpy).toHaveBeenCalledWith('/services', serviceRouter);
    expect(useSpy).toHaveBeenCalledWith('/combos', comboRouter);
  });
});
