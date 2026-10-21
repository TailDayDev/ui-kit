import { StyleSheet, View } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { PhotoUploadPreview } from './PhotoUploadPreview';

const URL_A = 'https://cdn.example.com/a.jpg';
const URL_B = 'https://cdn.example.com/b.jpg';

describe('PhotoUploadPreview', () => {
  it('renders a loaded photo at the given size', async () => {
    await render(
      <PhotoUploadPreview
        testID="tile"
        size={120}
        photo={{ fileUrl: URL_A }}
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('tile').props.style),
    ).toMatchObject({
      width: 120,
      height: 120,
      borderRadius: lightTheme.radius.lg,
    });
    expect(screen.getByTestId('tile.photo').props.source).toEqual({
      uri: URL_A,
    });
  });

  it('shows a spinner while uploading and hides the actions', async () => {
    const onImagePress = jest.fn();
    await render(
      <PhotoUploadPreview
        testID="tile"
        size={100}
        photo={{ fileUrl: URL_A, status: 'uploading', isCover: true }}
        coverLabel="Cover"
        onImagePress={onImagePress}
      />,
    );
    expect(screen.queryByText('Cover')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByTestId('tile').props.accessibilityState).toEqual({
      busy: true,
    });
  });

  it('shows the error text on error', async () => {
    await render(
      <PhotoUploadPreview
        size={100}
        photo={{ fileUrl: URL_A, status: 'error' }}
        errorText="Upload failed"
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByText('Upload failed').props.style).color,
    ).toBe(lightTheme.colors.text.inverse);
  });

  it('shows the cover badge and calls the press handlers', async () => {
    const onImagePress = jest.fn();
    const onSettingsPress = jest.fn();
    await render(
      <PhotoUploadPreview
        size={100}
        photo={{ fileUrl: URL_A, isCover: true, description: 'Max' }}
        coverLabel="Cover"
        settingsAccessibilityLabel="Photo settings"
        onImagePress={onImagePress}
        onSettingsPress={onSettingsPress}
      />,
    );
    expect(screen.getByText('Cover')).toBeTruthy();
    await fireEvent.press(screen.getByRole('imagebutton', { name: 'Max' }));
    expect(onImagePress).toHaveBeenCalledTimes(1);
    await fireEvent.press(
      screen.getByRole('button', { name: 'Photo settings' }),
    );
    expect(onSettingsPress).toHaveBeenCalledTimes(1);
  });

  it('falls back to onImagePress for the settings button', async () => {
    const onImagePress = jest.fn();
    await render(
      <PhotoUploadPreview
        size={100}
        photo={{ fileUrl: URL_A }}
        settingsAccessibilityLabel="Photo settings"
        onImagePress={onImagePress}
      />,
    );
    await fireEvent.press(
      screen.getByRole('button', { name: 'Photo settings' }),
    );
    expect(onImagePress).toHaveBeenCalledTimes(1);
  });

  it('uses renderImage with the cache key', async () => {
    const renderImage = jest.fn(() => <View testID="custom" />);
    await render(
      <PhotoUploadPreview
        size={80}
        photo={{ fileUrl: URL_A }}
        photoCacheKey="photo:1"
        renderImage={renderImage}
      />,
    );
    expect(screen.getByTestId('custom')).toBeTruthy();
    expect(renderImage).toHaveBeenCalledWith({
      uri: URL_A,
      size: 80,
      photoCacheKey: 'photo:1',
    });
  });

  it('keeps the previous photo until the new remote one is prefetched', async () => {
    let resolvePrefetch: () => void = () => undefined;
    const prefetchImage = jest.fn(
      () =>
        new Promise<void>(resolve => {
          resolvePrefetch = resolve;
        }),
    );
    const props = { testID: 'tile', size: 80, prefetchImage };
    const view = await render(
      <PhotoUploadPreview {...props} photo={{ fileUrl: URL_A }} />,
    );
    await view.rerender(
      <PhotoUploadPreview {...props} photo={{ fileUrl: URL_B }} />,
    );
    expect(prefetchImage).toHaveBeenCalledWith(URL_B, undefined);
    expect(screen.getByTestId('tile.photo').props.source).toEqual({
      uri: URL_A,
    });
    await act(async () => {
      resolvePrefetch();
    });
    expect(screen.getByTestId('tile.photo').props.source).toEqual({
      uri: URL_B,
    });
  });
});
