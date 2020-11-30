import randomString from '@/game/util/random-string.ts';

describe('randomString()', () => {
  it('Should return a string with length 7', () => {
    let str = randomString();

    expect(typeof str).toBe('string');
    expect(str.length).toBe(7);
  });
});
