import serviceRouter from '../service';

const useSpy = jest.fn();

jest.doMock('express', () => ({
    Router: () => ({
        use: useSpy,
    }),
}));

jest.mock('../service', () => jest.fn());

describe('should test server configuration', () => {
    it('should use router', () => {
        require('../index.ts');
        expect(useSpy).toHaveBeenCalledWith('/services', serviceRouter);
    });
});