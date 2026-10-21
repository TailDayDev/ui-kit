import { StyleSheet, View } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { EmptyProfileImage } from './EmptyProfileImage';
import type { EmptyProfileImageRenderParams } from './EmptyProfileImage.types';

const SIZES = [
  ['xs', 24, 10, 12],
  ['s', 40, 12, 14],
  ['m', 48, 14, 16],
  ['l', 56, 16, 20],
  ['xl', 96, 24, 26],
] as const;

const flatStyle = (testID: string) =>
  StyleSheet.flatten(
    screen.getByTestId(testID, { includeHiddenElements: true }).props.style,
  );

describe('EmptyProfileImage', () => {
  it.each(SIZES)(
    'renders initials within size %s (%s)',
    async (size, dimension, fontSize, lineHeight) => {
      await render(
        <EmptyProfileImage
          testID="avatar"
          firstName=" anna "
          lastName=" cooper "
          size={size}
        />,
      );
      const initials = screen.getByText('AC');
      expect(StyleSheet.flatten(initials.parent?.props.style)).toMatchObject({
        backgroundColor: lightTheme.colors.bg.successSoft,
        height: dimension,
        width: dimension,
        borderRadius: lightTheme.radius.sm,
      });
      expect(StyleSheet.flatten(initials.props.style)).toMatchObject({
        fontFamily: lightTheme.typography.body.bold.fontFamily,
        fontWeight: lightTheme.typography.body.bold.fontWeight,
        fontSize,
        lineHeight,
        color: lightTheme.colors.text.success,
        letterSpacing: -0.154,
        textAlign: 'center',
      });
      expect(flatStyle('avatar')).toMatchObject({
        width: dimension,
        height: dimension,
        overflow: 'hidden',
      });
    },
  );

  it.each(SIZES)(
    'clips the photo and fallback to a circle for size %s',
    async (size, dimension) => {
      await render(
        <EmptyProfileImage
          testID="avatar"
          firstName="Anna"
          size={size}
          shape="circle"
          imageUrl="https://example.com/photo.jpg"
        />,
      );
      expect(flatStyle('avatar')).toMatchObject({
        borderRadius: dimension / 2,
      });
      const photo = screen.getByTestId('avatar.photo');
      expect(photo.props.source).toMatchObject({
        uri: 'https://example.com/photo.jpg',
      });

      await fireEvent(photo, 'error');
      const initials = screen.getByText('A');
      expect(
        StyleSheet.flatten(initials.parent?.props.style).borderRadius,
      ).toBe(dimension / 2);
    },
  );

  it('uses custom fill and initials colors', async () => {
    await render(
      <EmptyProfileImage
        firstName="Anna"
        lastName="Cooper"
        backgroundColor="#7962FF"
        initialsColor="#FFFFFF"
      />,
    );
    const initials = screen.getByText('AC');
    expect(StyleSheet.flatten(initials.props.style).color).toBe('#FFFFFF');
    expect(
      StyleSheet.flatten(initials.parent?.props.style).backgroundColor,
    ).toBe('#7962FF');
  });

  it('shows initials for an empty or blank url', async () => {
    await render(<EmptyProfileImage firstName="Anna" imageUrl="   " />);
    expect(screen.getByText('A')).toBeTruthy();
  });

  it('renders an element image as is', async () => {
    await render(
      <EmptyProfileImage
        firstName="Anna"
        imageUrl={<View testID="custom" />}
      />,
    );
    expect(screen.getByTestId('custom')).toBeTruthy();
    expect(screen.queryByText('A')).toBeNull();
  });

  it('delegates the photo to renderImage, falls back on error and retries on a new url', async () => {
    let params: EmptyProfileImageRenderParams | undefined;
    const renderImage = (next: EmptyProfileImageRenderParams) => {
      params = next;
      return <View testID="rendered-photo" />;
    };
    const { rerender } = await render(
      <EmptyProfileImage
        firstName="Anna"
        lastName="Cooper"
        imageUrl="https://example.com/first.jpg"
        photoCacheKey="client-1"
        imageRefreshKey={1}
        imageCache="force-cache"
        renderImage={renderImage}
      />,
    );
    expect(params).toMatchObject({
      imageUrl: 'https://example.com/first.jpg',
      size: 56,
      photoCacheKey: 'client-1',
      refreshKey: 1,
      cache: 'force-cache',
    });
    expect(screen.queryByText('AC')).toBeNull();

    await act(() => params?.onLoadError());
    expect(screen.getByText('AC')).toBeTruthy();

    await rerender(
      <EmptyProfileImage
        firstName="Anna"
        imageUrl="https://example.com/second.jpg"
        renderImage={renderImage}
      />,
    );
    expect(params?.imageUrl).toBe('https://example.com/second.jpg');
    expect(screen.getByTestId('rendered-photo')).toBeTruthy();
  });

  it('shows a spinner over a scrim and reports busy while loading', async () => {
    await render(
      <EmptyProfileImage
        testID="avatar"
        firstName="Anna"
        loading
        accessibilityLabel="Anna Cooper"
      />,
    );
    const image = screen.getByRole('image', { name: 'Anna Cooper' });
    expect(image.props.accessibilityState).toEqual({ busy: true });
    expect(screen.getByTestId('avatar.loading').props.color).toBe(
      lightTheme.colors.text.inverse,
    );
  });

  it('is not an accessibility element without a label', async () => {
    await render(<EmptyProfileImage firstName="Anna" />);
    expect(screen.queryByRole('image')).toBeNull();
  });
});
