import { Animated } from 'react-native';

import { retainSkeletonAnimation } from './skeletonAnimation';

describe('retainSkeletonAnimation', () => {
  it('shares one native loop and stops only after the last skeleton disappears', () => {
    const start = jest.fn();
    const stop = jest.fn();
    const loop = jest
      .spyOn(Animated, 'loop')
      .mockReturnValue({ start, stop, reset: jest.fn() });

    const releases = Array.from({ length: 52 }, () =>
      retainSkeletonAnimation(),
    );
    expect(loop).toHaveBeenCalledTimes(1);
    expect(start).toHaveBeenCalledTimes(1);

    releases.slice(0, 51).forEach(release => release());
    expect(stop).not.toHaveBeenCalled();
    releases[51]?.();
    expect(stop).toHaveBeenCalledTimes(1);
    releases[51]?.();

    const releaseNext = retainSkeletonAnimation();
    expect(loop).toHaveBeenCalledTimes(2);
    releaseNext();
    expect(stop).toHaveBeenCalledTimes(2);
    loop.mockRestore();
  });
});
