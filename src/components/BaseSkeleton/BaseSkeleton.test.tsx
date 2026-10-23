import type { ReactNode } from 'react';
import { Animated, StyleSheet } from 'react-native';
import type * as ReactNativeModule from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { BaseSkeleton } from './BaseSkeleton';

// react-native-svg has no Jest setup in the kit; stub every element as a View
// that keeps its props, so the gradient stops can be inspected.
jest.mock('react-native-svg', () => {
  const { View } = jest.requireActual<typeof ReactNativeModule>('react-native');
  const stub = (name: string) => {
    const SvgStub = ({ children, ...props }: { children?: ReactNode }) => (
      <View testID={`svg-${name}`} {...props}>
        {children}
      </View>
    );
    SvgStub.displayName = name;
    return SvgStub;
  };
  return {
    __esModule: true,
    default: stub('Svg'),
    Defs: stub('Defs'),
    LinearGradient: stub('LinearGradient'),
    Rect: stub('Rect'),
    Stop: stub('Stop'),
  };
});

const layout = async (testID: string, width: number) => {
  await fireEvent(
    screen.getByTestId(testID, { includeHiddenElements: true }),
    'layout',
    { nativeEvent: { layout: { width } } },
  );
};

describe('BaseSkeleton', () => {
  it('renders the Figma defaults: full width, 20 tall, radius 8, subtle fill', async () => {
    await render(<BaseSkeleton testID="skeleton" />);
    const style = StyleSheet.flatten(
      screen.getByTestId('skeleton', { includeHiddenElements: true }).props
        .style,
    );
    expect(style).toMatchObject({
      width: '100%',
      height: 20,
      borderRadius: lightTheme.radius.sm,
      backgroundColor: lightTheme.colors.bg.subtle,
    });
  });

  it('applies custom size, radius and color', async () => {
    await render(
      <BaseSkeleton
        testID="skeleton"
        width={120}
        height={20}
        borderRadius={12}
        backgroundColor="#E0E0E0"
      />,
    );
    const style = StyleSheet.flatten(
      screen.getByTestId('skeleton', { includeHiddenElements: true }).props
        .style,
    );
    expect(style).toMatchObject({
      width: 120,
      height: 20,
      borderRadius: 12,
      backgroundColor: '#E0E0E0',
    });
  });

  it('is hidden from accessibility unless labelled', async () => {
    await render(<BaseSkeleton testID="skeleton" />);
    expect(screen.queryByRole('progressbar')).toBeNull();
  });

  it('is a busy progress bar when labelled', async () => {
    await render(<BaseSkeleton accessibilityLabel="Loading" />);
    const bar = screen.getByRole('progressbar', { name: 'Loading' });
    expect(bar.props.accessibilityState).toEqual({ busy: true });
  });

  it('draws the app shimmer gradient after layout', async () => {
    await render(<BaseSkeleton testID="skeleton" width={100} />);
    await layout('skeleton', 100);
    const stops = screen.getAllByTestId('svg-Stop', {
      includeHiddenElements: true,
    });
    expect(
      stops.map(stop => [
        stop.props.offset,
        stop.props.stopColor,
        stop.props.stopOpacity,
      ]),
    ).toEqual([
      [0, lightTheme.colors.bg.subtle, 1],
      [0.1, lightTheme.colors.bg.subtle, 128 / 255],
      [0.3, lightTheme.palette.white, 128 / 255],
      [0.5, lightTheme.palette.white, 128 / 255],
      [0.7, lightTheme.palette.white, 128 / 255],
      [0.9, lightTheme.colors.bg.subtle, 128 / 255],
      [1, lightTheme.colors.bg.subtle, 1],
    ]);
    expect(
      screen.getByTestId('svg-Svg', { includeHiddenElements: true }).props
        .width,
    ).toBe(120);
  });

  it('starts after layout, shares the loop and releases on unmount', async () => {
    const start = jest.fn();
    const stop = jest.fn();
    const loop = jest
      .spyOn(Animated, 'loop')
      .mockReturnValue({ start, stop, reset: jest.fn() });

    const { unmount } = await render(
      <>
        <BaseSkeleton testID="a" />
        <BaseSkeleton testID="b" />
      </>,
    );
    expect(start).not.toHaveBeenCalled();

    await layout('a', 120);
    await layout('b', 120);
    expect(start).toHaveBeenCalledTimes(1);

    await layout('a', 120);
    expect(start).toHaveBeenCalledTimes(1);
    expect(stop).not.toHaveBeenCalled();

    await unmount();
    expect(stop).toHaveBeenCalledTimes(1);
    loop.mockRestore();
  });
});
