import { StyleSheet, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import type { EmptyProfileImageRenderParams } from '../EmptyProfileImage';
import type { PetAvatarRenderParams } from '../PetAvatar';
import { PetOwnerAvatar } from './PetOwnerAvatar';

const flatStyle = (testID: string) =>
  StyleSheet.flatten(
    screen.getByTestId(testID, { includeHiddenElements: true }).props.style,
  );

describe('PetOwnerAvatar', () => {
  it.each([undefined, 'pet.jpg'])(
    'keeps the same composition with pet photo %p',
    async petPhotoUrl => {
      const petCalls: PetAvatarRenderParams[] = [];
      const ownerCalls: EmptyProfileImageRenderParams[] = [];
      await render(
        <PetOwnerAvatar
          testID="poa"
          petPhotoUrl={petPhotoUrl}
          petCacheKey="pet:1"
          ownerFirstName="Anna"
          ownerLastName="Smith"
          ownerPhotoUrl=" owner.jpg "
          ownerCacheKey="owner:1"
          renderPetImage={params => {
            petCalls.push(params);
            return <View />;
          }}
          renderOwnerImage={params => {
            ownerCalls.push(params);
            return <View />;
          }}
        />,
      );

      expect(petCalls.at(-1)).toMatchObject({
        uri: petPhotoUrl ?? '',
        photoCacheKey: petPhotoUrl ? 'pet:1' : undefined,
        size: 64,
        borderRadius: lightTheme.radius.md,
      });
      expect(ownerCalls.at(-1)).toMatchObject({
        imageUrl: 'owner.jpg',
        photoCacheKey: 'owner:1',
        size: 24,
      });
      expect(flatStyle('poa')).toMatchObject({ width: 64, height: 64 });
      expect(flatStyle('poa.owner').borderRadius).toBe(12);
      expect(flatStyle('poa.ownerBadge')).toMatchObject({
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        bottom: -2,
        right: -2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: lightTheme.colors.bg.successSoft,
        borderColor: lightTheme.colors.bg.surface,
      });
    },
  );

  it('draws the owner initials with the standard owner colors', async () => {
    await render(
      <PetOwnerAvatar ownerFirstName="Boris" ownerLastName="Rising" />,
    );
    const initials = screen.getByText('BR');
    expect(StyleSheet.flatten(initials.props.style).color).toBe(
      lightTheme.colors.text.success,
    );
    expect(
      StyleSheet.flatten(initials.parent?.props.style).backgroundColor,
    ).toBe(lightTheme.colors.bg.successSoft);
  });

  it('shows the pet placeholder without a pet photo', async () => {
    await render(
      <PetOwnerAvatar petPlaceholder={<View testID="no-image" />} />,
    );
    expect(screen.getByTestId('no-image')).toBeTruthy();
  });

  it('is an image with a label when labelled', async () => {
    await render(<PetOwnerAvatar accessibilityLabel="Rex, owner Anna Smith" />);
    expect(
      screen.getByRole('image', { name: 'Rex, owner Anna Smith' }),
    ).toBeTruthy();
  });

  it('draws the 64pt photo with radius 12 and regular 14pt initials by default', async () => {
    await render(
      <PetOwnerAvatar
        petPhotoUrl={null}
        ownerFirstName="Rex"
        ownerLastName="Lee"
        testID="avatar"
      />,
    );
    const container = StyleSheet.flatten(
      screen.getByTestId('avatar').props.style,
    );
    expect(container).toMatchObject({ width: 64, height: 64 });
    const pet = StyleSheet.flatten(
      screen.getByTestId('avatar.pet').props.style,
    );
    expect(pet.borderRadius).toBe(lightTheme.radius.md);
    const initials = StyleSheet.flatten(screen.getByText('RL').props.style);
    expect(initials).toMatchObject(lightTheme.typography.body.regular);
  });

  it('keeps the compact 56pt size with radius 8', async () => {
    await render(<PetOwnerAvatar size={56} testID="avatar" />);
    expect(
      StyleSheet.flatten(screen.getByTestId('avatar').props.style),
    ).toMatchObject({ width: 56, height: 56 });
    expect(
      StyleSheet.flatten(screen.getByTestId('avatar.pet').props.style)
        .borderRadius,
    ).toBe(lightTheme.radius.sm);
  });

  it('shows a paw on the subtle fill when the app passes no placeholder', async () => {
    await render(<PetOwnerAvatar testID="avatar" />);
    expect(
      StyleSheet.flatten(
        screen.getByTestId('avatar.paw', { includeHiddenElements: true }).props
          .style,
      ).backgroundColor,
    ).toBe(lightTheme.colors.bg.subtle);
  });
});
