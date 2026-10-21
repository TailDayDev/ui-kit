import { StyleSheet, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { OverlappingPetAvatars } from './OverlappingPetAvatars';
import { PetAvatar } from './PetAvatar';
import type { PetAvatarRenderParams } from './PetAvatar.types';

const flatStyle = (testID: string) =>
  StyleSheet.flatten(
    screen.getByTestId(testID, { includeHiddenElements: true }).props.style,
  );

describe('PetAvatar', () => {
  it.each([
    ['xs', 24],
    ['s', 40],
    ['m', 48],
    ['l', 56],
    ['xl', 96],
  ] as const)('sizes the frame for %s', async (size, dimension) => {
    await render(<PetAvatar size={size} testID="avatar" />);
    expect(flatStyle('avatar')).toMatchObject({
      width: dimension,
      height: dimension,
      borderRadius: dimension / 2,
      overflow: 'hidden',
      backgroundColor: 'transparent',
    });
  });

  it('defaults to the large circle avatar', async () => {
    await render(<PetAvatar testID="avatar" />);
    expect(flatStyle('avatar')).toMatchObject({
      width: 56,
      height: 56,
      borderRadius: 28,
    });
  });

  it('supports circle and square shapes', async () => {
    await render(<PetAvatar shape="square" testID="avatar" />);
    expect(flatStyle('avatar').borderRadius).toBe(lightTheme.radius.sm);
  });

  it.each([undefined, null, '', '   '])(
    'shows the full-size placeholder for photoUrl=%p',
    async photoUrl => {
      await render(
        <PetAvatar
          photoUrl={photoUrl}
          testID="avatar"
          placeholder={<View testID="no-image" />}
        />,
      );
      expect(screen.getByTestId('no-image')).toBeTruthy();
      expect(flatStyle('avatar.placeholder')).toEqual({
        height: '100%',
        width: '100%',
      });
      expect(screen.queryByTestId('avatar.photo')).toBeNull();
    },
  );

  it('renders the photo and falls back to the placeholder on error', async () => {
    await render(
      <PetAvatar
        photoUrl=" https://cdn/pet.jpg "
        cache="force-cache"
        testID="avatar"
        placeholder={<View testID="no-image" />}
      />,
    );
    const photo = screen.getByTestId('avatar.photo');
    expect(photo.props.source).toEqual({
      uri: 'https://cdn/pet.jpg',
      cache: 'force-cache',
    });
    expect(screen.queryByTestId('no-image')).toBeNull();

    await fireEvent(photo, 'error');
    expect(screen.getByTestId('no-image')).toBeTruthy();
  });

  it('delegates drawing to renderImage and omits the cache key without a photo', async () => {
    const calls: PetAvatarRenderParams[] = [];
    const renderImage = (params: PetAvatarRenderParams) => {
      calls.push(params);
      return params.placeholder;
    };
    const { rerender } = await render(
      <PetAvatar
        photoUrl="pet.jpg"
        photoCacheKey="pet:1"
        cache="force-cache"
        shape="square"
        size="s"
        renderImage={renderImage}
        testID="avatar"
      />,
    );
    expect(calls.at(-1)).toMatchObject({
      uri: 'pet.jpg',
      size: 40,
      borderRadius: lightTheme.radius.sm,
      cache: 'force-cache',
      photoCacheKey: 'pet:1',
    });
    expect(screen.getByTestId('avatar.placeholder')).toBeTruthy();

    await rerender(
      <PetAvatar
        photoUrl=" "
        photoCacheKey="pet:1"
        renderImage={renderImage}
      />,
    );
    expect(calls.at(-1)).toMatchObject({ uri: '', photoCacheKey: undefined });
  });

  it('is an image with a label when labelled', async () => {
    await render(<PetAvatar accessibilityLabel="Rex" />);
    expect(screen.getByRole('image', { name: 'Rex' })).toBeTruthy();
  });
});

describe('OverlappingPetAvatars', () => {
  it('renders one PetAvatar per visible pet and a remaining badge', async () => {
    await render(
      <OverlappingPetAvatars
        maxVisible={2}
        pets={[
          { id: 1, photoUrl: 'https://cdn/1.jpg' },
          { id: 2, photoUrl: null },
          { id: 3, photoUrl: 'https://cdn/3.jpg' },
        ]}
        showRemainingBadge
        testID="stack"
      />,
    );
    expect(screen.getByTestId('stack.avatar.0.photo').props.source).toEqual({
      uri: 'https://cdn/1.jpg',
    });
    expect(screen.getByTestId('stack.avatar.1.placeholder')).toBeTruthy();
    expect(screen.queryByTestId('stack.avatar.2')).toBeNull();
    expect(screen.getByText('+1')).toBeTruthy();
    // 3 slots of 24 overlapping by 8: 24 + 2 × 16.
    expect(flatStyle('stack')).toMatchObject({ width: 56, height: 24 });
  });

  it('hides the badge unless asked', async () => {
    await render(
      <OverlappingPetAvatars
        maxVisible={1}
        pets={[{ id: 1 }, { id: 2 }]}
        testID="stack"
      />,
    );
    expect(screen.queryByText('+1')).toBeNull();
    expect(flatStyle('stack').width).toBe(24);
  });
});
