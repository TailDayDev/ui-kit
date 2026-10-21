import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { StaffPickerRow } from './StaffPickerRow';

const styleOf = (testID: string) =>
  StyleSheet.flatten(
    screen.getByTestId(testID, { includeHiddenElements: true }).props.style,
  );

describe('StaffPickerRow', () => {
  it('renders the Figma default: 88pt, radius 16, pale border, initials, texts', async () => {
    await render(
      <StaffPickerRow testID="row" name="Robert Lewis" position="Groomer" />,
    );
    expect(styleOf('row')).toMatchObject({
      height: 88,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: lightTheme.colors.border.default,
      paddingHorizontal: 16,
      gap: 12,
    });
    expect(screen.getByText('RL')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByText('Robert Lewis').props.style),
    ).toMatchObject({
      ...lightTheme.typography.headline.bold,
      color: lightTheme.colors.text.primary,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Groomer').props.style),
    ).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.secondary,
    });
    expect(styleOf('row.radio')).toMatchObject({ width: 20, height: 20 });
    expect(screen.queryByTestId('row.radio.dot')).toBeNull();
  });

  it('renders the selected variant with an active radio', async () => {
    await render(
      <StaffPickerRow testID="row" name="Robert Lewis" isSelected />,
    );
    expect(styleOf('row')).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accentSoft,
      borderColor: lightTheme.colors.bg.accent,
    });
    expect(styleOf('row.radio.dot')).toMatchObject({ width: 10, height: 10 });
  });

  it('hides an empty position', async () => {
    await render(<StaffPickerRow name="Robert Lewis" position="" />);
    expect(screen.queryByText('')).toBeNull();
  });

  it('is a radio with the checked state and calls onPress', async () => {
    const onPress = jest.fn();
    await render(
      <StaffPickerRow name="Robert Lewis" isSelected onPress={onPress} />,
    );
    await fireEvent.press(
      screen.getByRole('radio', { name: 'Robert Lewis', checked: true }),
    );
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <StaffPickerRow name="Robert Lewis" disabled onPress={onPress} />,
    );
    const radio = screen.getByRole('radio', { name: 'Robert Lewis' });
    expect(radio).toBeDisabled();
    await fireEvent.press(radio);
    expect(onPress).not.toHaveBeenCalled();
  });
});
