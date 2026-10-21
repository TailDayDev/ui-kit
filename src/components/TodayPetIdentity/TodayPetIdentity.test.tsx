import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodayPetIdentity } from './TodayPetIdentity';

const avatar = { ownerFirstName: 'Rachel', ownerLastName: 'Lee' };
const textStyle = (value: string) =>
  StyleSheet.flatten(screen.getByText(value).props.style);

describe('TodayPetIdentity', () => {
  it('renders name, meta, avatar and placement with the Figma layout', async () => {
    await render(
      <TodayPetIdentity
        testID="pet"
        name="Rex"
        meta="Border Collie"
        avatar={avatar}
        placements={{ title: 'Room 12' }}
      />,
    );
    expect(textStyle('Rex')).toMatchObject({
      ...lightTheme.typography.headline.bold,
      color: lightTheme.colors.text.primary,
    });
    expect(textStyle('Border Collie')).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.secondary,
    });
    expect(screen.getByText('Room 12')).toBeTruthy();
    expect(screen.getByTestId('pet.avatar')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByTestId('pet').props.style),
    ).toMatchObject({
      flexDirection: 'row',
      gap: 12,
      paddingTop: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 0,
    });
  });

  it('hides placements when hasPlacements is false', async () => {
    await render(
      <TodayPetIdentity
        name="Rex"
        hasPlacements={false}
        avatar={avatar}
        placements={{ title: 'Room 12' }}
      />,
    );
    expect(screen.queryByText('Room 12')).toBeNull();
  });

  it('is static without onPress', async () => {
    await render(<TodayPetIdentity name="Rex" avatar={avatar} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('opens the profile on press', async () => {
    const onPress = jest.fn();
    await render(
      <TodayPetIdentity
        name="Rex"
        avatar={avatar}
        onPress={onPress}
        accessibilityLabel="Open Rex"
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Open Rex' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
