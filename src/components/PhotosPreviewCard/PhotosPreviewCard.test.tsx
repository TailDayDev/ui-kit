import { StyleSheet, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { PhotosPreviewCard } from './PhotosPreviewCard';
import type { PhotosPreviewCardRenderParams } from './PhotosPreviewCard.types';

const renderImage = ({ uri, size }: PhotosPreviewCardRenderParams) => (
  <View testID={`img:${uri}:${size}`} />
);

const BASE = {
  title: 'Photos',
  photoCountText: '3 photos',
  emptyText: 'No photos yet',
  renderImage,
};

describe('PhotosPreviewCard', () => {
  it('shows the empty text without photos', async () => {
    await render(
      <PhotosPreviewCard {...BASE} photos={[null, { fileUrl: '' }]} />,
    );
    expect(screen.getByText('Photos')).toBeTruthy();
    expect(screen.getByText('3 photos')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByText('No photos yet').props.style).color,
    ).toBe(lightTheme.palette.lightGray);
  });

  it('puts the cover in front and the others behind it', async () => {
    await render(
      <PhotosPreviewCard
        {...BASE}
        photos={[
          { fileUrl: 'a' },
          { fileUrl: 'b', isCover: true },
          { fileUrl: 'c' },
        ]}
      />,
    );
    expect(screen.getByTestId('img:b:144')).toBeTruthy();
    expect(screen.getByTestId('img:a:120')).toBeTruthy();
    expect(screen.getByTestId('img:c:120')).toBeTruthy();
    expect(screen.queryByText('No photos yet')).toBeNull();
  });

  it('uses the first photo as main without a cover', async () => {
    await render(
      <PhotosPreviewCard
        {...BASE}
        photos={[{ fileUrl: 'a' }, { fileUrl: 'b' }]}
      />,
    );
    expect(screen.getByTestId('img:a:144')).toBeTruthy();
    expect(screen.getByTestId('img:b:120')).toBeTruthy();
  });

  it('places the second photo beside the main one in the compact layout', async () => {
    await render(
      <PhotosPreviewCard
        {...BASE}
        useCompactTwoPhotoLayout
        photos={[{ fileUrl: 'a' }, { fileUrl: 'b' }]}
      />,
    );
    const frame = screen.getByTestId('img:b:120').parent;
    expect(StyleSheet.flatten(frame?.props.style)).toMatchObject({
      marginLeft: -41,
      position: 'relative',
      width: 130,
    });
  });

  it('is pressable', async () => {
    const onPress = jest.fn();
    await render(<PhotosPreviewCard {...BASE} onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Photos' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
