import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import type * as ReactNativeModule from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { FullScreenLoader } from './FullScreenLoader';

// react-native-svg has no Jest setup in the kit; stub every element as a View.
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
    Circle: stub('Circle'),
    ClipPath: stub('ClipPath'),
    Defs: stub('Defs'),
    G: stub('G'),
    LinearGradient: stub('LinearGradient'),
    Mask: stub('Mask'),
    Path: stub('Path'),
    Rect: stub('Rect'),
    Stop: stub('Stop'),
  };
});

describe('FullScreenLoader', () => {
  it('renders the wallpaper by default as a busy progress bar', async () => {
    await render(
      <FullScreenLoader testID="loader" accessibilityLabel="Loading" />,
    );
    const loader = screen.getByRole('progressbar', { name: 'Loading' });
    expect(loader.props.accessibilityState).toEqual({ busy: true });
    expect(StyleSheet.flatten(loader.props.style)).toMatchObject({
      position: 'absolute',
      backgroundColor: lightTheme.colors.bg.surface,
      zIndex: 999999,
      elevation: 999999,
    });
    expect(
      screen.getByTestId('loader.wallpaper', { includeHiddenElements: true }),
    ).toBeTruthy();
    expect(
      screen.getByTestId('svg-Svg', { includeHiddenElements: true }).props
        .preserveAspectRatio,
    ).toBe('none');
    expect(screen.queryByTestId('loader.spinner')).toBeNull();
  });

  it('colors the illustration from the theme', async () => {
    await render(<FullScreenLoader />);
    const fills = screen
      .getAllByTestId('svg-Path', { includeHiddenElements: true })
      .map(path => path.props.fill);
    expect(fills).toEqual(
      expect.arrayContaining([
        lightTheme.palette.secondary,
        lightTheme.palette.white,
        lightTheme.palette.primary,
      ]),
    );
  });

  it('shows an accent spinner without the wallpaper', async () => {
    await render(<FullScreenLoader testID="loader" wallpaperSource={false} />);
    expect(
      screen.getByTestId('loader.spinner', { includeHiddenElements: true })
        .props.color,
    ).toBe(lightTheme.colors.icon.accent);
    expect(screen.queryByTestId('loader.wallpaper')).toBeNull();
  });

  it('renders nothing when hidden', async () => {
    await render(<FullScreenLoader testID="loader" visible={false} />);
    expect(
      screen.queryByTestId('loader', { includeHiddenElements: true }),
    ).toBeNull();
  });
});
