import { shouldCloseFromSwipeDown, shouldStartSwipeDown } from './swipeDown';

describe('custom modal swipe-down gesture', () => {
  it('starts only for a downward, predominantly vertical drag', () => {
    expect(shouldStartSwipeDown({ dx: 3, dy: 20 })).toBe(true);
    expect(shouldStartSwipeDown({ dx: 20, dy: 3 })).toBe(false);
    expect(shouldStartSwipeDown({ dx: 0, dy: -20 })).toBe(false);
  });

  it('closes after enough distance or downward velocity', () => {
    expect(shouldCloseFromSwipeDown({ dy: 100, vy: 0.1 })).toBe(true);
    expect(shouldCloseFromSwipeDown({ dy: 20, vy: 1 })).toBe(true);
    expect(shouldCloseFromSwipeDown({ dy: 20, vy: 0.1 })).toBe(false);
  });
});
