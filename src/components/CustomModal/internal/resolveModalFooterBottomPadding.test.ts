import { resolveModalFooterBottomPadding } from './resolveModalFooterBottomPadding';

describe('resolveModalFooterBottomPadding', () => {
  it('keeps grab above the home indicator when the keyboard is closed', () => {
    expect(
      resolveModalFooterBottomPadding({
        grab: 24,
        isKeyboardLifted: false,
        keyboardOverlap: 0,
        safeAreaBottom: 34,
      }),
    ).toBe(58);
  });

  it('replaces the home indicator with keyboard overlap plus a 12 px gap', () => {
    expect(
      resolveModalFooterBottomPadding({
        grab: 24,
        isKeyboardLifted: true,
        keyboardOverlap: 300,
        safeAreaBottom: 34,
      }),
    ).toBe(312);
  });

  it('does not reuse the rest grab or safe area for the keyboard gap', () => {
    expect(
      resolveModalFooterBottomPadding({
        grab: 9,
        isKeyboardLifted: true,
        keyboardOverlap: 300,
        safeAreaBottom: 34,
      }),
    ).toBe(312);
  });
});
