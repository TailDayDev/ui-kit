import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { OptionRow } from './OptionRow';

const styleOf = (testID: string) =>
  StyleSheet.flatten(screen.getByTestId(testID).props.style);

describe('OptionRow', () => {
  it('renders the Figma default frame: pale border, radius 8, padding 12/16', async () => {
    await render(<OptionRow testID="row" label="Label" />);
    expect(styleOf('row')).toMatchObject({
      borderColor: lightTheme.colors.border.default,
      borderRadius: 8,
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 8,
    });
    expect(styleOf('row').backgroundColor).toBeUndefined();
    expect(
      StyleSheet.flatten(screen.getByText('Label').props.style),
    ).toMatchObject({
      ...lightTheme.typography.body.medium,
      color: lightTheme.colors.text.primary,
    });
  });

  it('renders the selected variant in accent', async () => {
    await render(<OptionRow testID="row" label="Label" isSelected />);
    expect(styleOf('row')).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accentSoft,
      borderColor: lightTheme.colors.bg.accent,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Label').props.style).color,
    ).toBe(lightTheme.colors.text.accent);
  });

  it('is a radio with the checked state and calls onPress', async () => {
    const onPress = jest.fn();
    await render(<OptionRow label="Other" isSelected onPress={onPress} />);
    const radio = screen.getByRole('radio', { name: 'Other', checked: true });
    await fireEvent.press(radio);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(<OptionRow label="Other" disabled onPress={onPress} />);
    const radio = screen.getByRole('radio', { name: 'Other' });
    expect(radio).toBeDisabled();
    await fireEvent.press(radio);
    expect(onPress).not.toHaveBeenCalled();
  });
});
