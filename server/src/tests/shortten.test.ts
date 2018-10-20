import { encode, decode } from './../utils/shortten';

describe('Shortten', () => {
  it('should be a Bijective function', done => {
    const numToEncode = 10;
    const encoded = encode(numToEncode);
    expect(encoded).toBeDefined();
    expect(typeof encoded).toBe('string');
    const decoded = decode(encoded);
    expect(decoded).toBeDefined();
    expect(typeof decoded).toBe('number');
    // the "real" test
    expect(numToEncode).toEqual(decoded);
    done();
  })
});