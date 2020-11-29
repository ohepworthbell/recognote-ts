import camelToKebab from '@/game/util/camel-kebab.ts';

describe('camelToKebab()', () => {
  it('Should convert camelCase to kebabCase', () => {
    expect(camelToKebab('ariaLabel')).toBe('aria-label');
    expect(camelToKebab('fooBarBat')).toBe('foo-bar-bat');
  });

  it.skip('Should ignore first character uppercase', () => {
    expect(camelToKebab('Foobar')).toBe('foobar');
  });

  it.skip('Should tolerate all uppercase characters', () => {
    expect(camelToKebab('HREF')).toBe('href');
  });

  it.skip('Should ignore kebab-case', () => {
    expect(camelToKebab('foo-Bar')).toBe('foo-bar');
  });
});
