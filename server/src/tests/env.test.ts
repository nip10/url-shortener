import dotenv from 'dotenv';

beforeAll(() => {
  dotenv.config();
});

describe('Env variables', () => {
  it('should have NODE_ENV defined', done => {
    const { NODE_ENV } = process.env;
    expect(NODE_ENV).toBeDefined();
    expect(typeof NODE_ENV).toBe('string');
    expect(NODE_ENV).toMatch(/^production|development|test$/);
    done();
  })
  it('should have PORT defined', done => {
    const { PORT } = process.env;
    expect(PORT).toBeDefined();
    const PORT_N = Number.parseInt(PORT, 10);
    expect(PORT_N > 0).toBeTruthy();
    done();
  })
  it('should have MONGODB_URI defined', done => {
    const { MONGODB_URI } = process.env;
    expect(MONGODB_URI).toBeDefined();
    expect(typeof MONGODB_URI).toBe('string');
    expect(MONGODB_URI.startsWith('mongodb://')).toBeTruthy();
    done();
  })
});