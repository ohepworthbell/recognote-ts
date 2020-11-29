import {easeInOutQuad} from '@/game/util/easing.ts';

describe('easeInOutQuad()', () => {
  it('Should return correct easing number', () => {
    expect(easeInOutQuad(0)).toBe(0);
    expect(easeInOutQuad(0.25)).toBe(0.125);
    expect(easeInOutQuad(0.5)).toBe(0.5);
    expect(easeInOutQuad(0.75)).toBe(0.875);
    expect(easeInOutQuad(1)).toBe(1);
  });
});
