describe('Server config object', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if a .env file is not present', () => {
    jest.mock('dotenv', () => ({
      config: jest.fn().mockReturnValue({ error: 'mock' }),
    }));
    expect(() => require('.')).toThrow();
  });

  it('should throw not an error if a .env file is present', () => {
    jest.mock('dotenv', () => ({
      config: jest.fn().mockReturnValue({ error: '' }),
    }));
    expect(() => require('.')).not.toThrow();
  });
});
