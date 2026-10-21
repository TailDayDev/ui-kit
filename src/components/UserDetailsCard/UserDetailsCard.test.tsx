import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { UserDetailsCard } from './UserDetailsCard';
import type { UserDetailsCardProps } from './UserDetailsCard.types';

const renderCard = (props: Partial<UserDetailsCardProps> = {}) =>
  render(
    <UserDetailsCard
      actionText="Edit"
      details={[{ label: 'Email', value: 'a@b.c' }]}
      fallbackName="Owner"
      name="Ada Lovelace"
      title="Owner"
      onActionPress={jest.fn()}
      testID="owner.action"
      {...props}
    />,
  );

describe('UserDetailsCard', () => {
  it('renders title, name, initials and visible details only', async () => {
    await renderCard({
      details: [
        { label: 'Email', value: 'a@b.c', subLabel: 'Work' },
        { label: 'Phone', value: null },
      ],
    });
    expect(screen.getByText('Owner')).toBeTruthy();
    expect(screen.getByText('Ada Lovelace')).toBeTruthy();
    expect(screen.getByText('AL')).toBeTruthy();
    expect(screen.getByText('a@b.c')).toBeTruthy();
    expect(screen.getByText('Work')).toBeTruthy();
    expect(screen.queryByText('Phone')).toBeNull();
    expect(
      StyleSheet.flatten(screen.getByText('a@b.c').props.style),
    ).toMatchObject({
      color: lightTheme.colors.text.accent,
      textAlign: 'right',
    });
  });

  it('shows the fallback name for an empty name', async () => {
    await renderCard({ name: '', title: 'Card' });
    expect(screen.getByText('Owner')).toBeTruthy();
  });

  it('calls onActionPress from the action button', async () => {
    const onActionPress = jest.fn();
    await renderCard({ onActionPress });
    await fireEvent.press(screen.getByTestId('owner.action'));
    expect(onActionPress).toHaveBeenCalledTimes(1);
  });

  it('does not enable value press without onPress', async () => {
    await renderCard();
    expect(screen.queryByRole('button', { name: 'a@b.c' })).toBeNull();
    expect(screen.getByText('a@b.c')).toBeDisabled();
  });

  it('stops value tap from bubbling when onPress is provided', async () => {
    const onPress = jest.fn();
    const stopPropagation = jest.fn();
    await renderCard({
      details: [{ label: 'Email', value: 'a@b.c', onPress }],
    });
    await fireEvent.press(screen.getByRole('button', { name: 'a@b.c' }), {
      stopPropagation,
    });
    expect(stopPropagation).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('passes renderAvatarImage to the avatar', async () => {
    const renderAvatarImage = jest.fn(() => null);
    await renderCard({ photoUrl: 'https://x/y.jpg', renderAvatarImage });
    expect(renderAvatarImage).toHaveBeenCalledWith(
      expect.objectContaining({ imageUrl: 'https://x/y.jpg', size: 56 }),
    );
  });
});
