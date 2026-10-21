import { StyleSheet, Text as RNText } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { PetPickerRow } from './PetPickerRow';

const styleOf = (testID: string) =>
  StyleSheet.flatten(
    screen.getByTestId(testID, { includeHiddenElements: true }).props.style,
  );

const PLACEMENTS = [
  { title: 'Standard Kennel', image: <RNText>K</RNText> },
  { title: 'Daycare zone 1' },
];

describe('PetPickerRow', () => {
  it('renders the Figma default: radius 16, pale border, 64pt avatar, texts, placements, radio 20', async () => {
    await render(
      <PetPickerRow
        testID="row"
        name="Rocky"
        meta="Jack Russell"
        placements={PLACEMENTS}
        avatar={{ ownerFirstName: 'Robert', ownerLastName: 'Lewis' }}
      />,
    );
    expect(styleOf('row')).toMatchObject({
      borderRadius: 16,
      borderWidth: 1,
      borderColor: lightTheme.colors.border.default,
      backgroundColor: lightTheme.colors.bg.surface,
      paddingHorizontal: 15,
      paddingVertical: 11,
      gap: 12,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Rocky').props.style),
    ).toMatchObject({
      ...lightTheme.typography.headline.bold,
      color: lightTheme.colors.text.primary,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Jack Russell').props.style),
    ).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.secondary,
    });
    expect(screen.getByText('RL')).toBeTruthy();
    expect(screen.getByText('Standard Kennel')).toBeTruthy();
    expect(screen.getByText('Daycare zone 1')).toBeTruthy();
    expect(
      screen.getByTestId('row.placements.item2', {
        includeHiddenElements: true,
      }),
    ).toBeTruthy();
    expect(styleOf('row.radio')).toMatchObject({ width: 20, height: 20 });
    expect(screen.queryByTestId('row.radio.dot')).toBeNull();
  });

  it('renders the selected variant with an active radio', async () => {
    await render(<PetPickerRow testID="row" name="Rocky" isSelected />);
    expect(styleOf('row')).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accentSoft,
      borderColor: lightTheme.colors.bg.accent,
    });
    expect(styleOf('row.radio.dot')).toMatchObject({ width: 10, height: 10 });
  });

  it('shows one placement and hides empty placements', async () => {
    const { rerender } = await render(
      <PetPickerRow
        testID="row"
        name="Rocky"
        placements={[{ title: 'Standard Kennel' }]}
      />,
    );
    expect(screen.getByText('Standard Kennel')).toBeTruthy();
    expect(
      screen.queryByTestId('row.placements.item2', {
        includeHiddenElements: true,
      }),
    ).toBeNull();
    await rerender(<PetPickerRow testID="row" name="Rocky" meta="" />);
    expect(
      screen.queryByTestId('row.placements', { includeHiddenElements: true }),
    ).toBeNull();
  });

  it('is a radio with the checked state and calls onPress', async () => {
    const onPress = jest.fn();
    await render(<PetPickerRow name="Rocky" isSelected onPress={onPress} />);
    await fireEvent.press(
      screen.getByRole('radio', { name: 'Rocky', checked: true }),
    );
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(<PetPickerRow name="Rocky" disabled onPress={onPress} />);
    const radio = screen.getByRole('radio', { name: 'Rocky' });
    expect(radio).toBeDisabled();
    await fireEvent.press(radio);
    expect(onPress).not.toHaveBeenCalled();
  });
});
