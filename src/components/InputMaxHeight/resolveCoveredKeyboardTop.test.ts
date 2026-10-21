import { resolveCoveredKeyboardTop } from './resolveCoveredKeyboardTop';

describe('resolveCoveredKeyboardTop', () => {
  it('moves the covered top edge up by the accessory height', () => {
    expect(resolveCoveredKeyboardTop(500, 43)).toBe(457);
  });

  it('is the keyboard top when there is no accessory', () => {
    expect(resolveCoveredKeyboardTop(500, 0)).toBe(500);
  });
});
