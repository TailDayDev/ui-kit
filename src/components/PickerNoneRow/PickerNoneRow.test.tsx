import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { PickerNoneRow } from './PickerNoneRow';

describe('PickerNoneRow', () => {
  it('is a radio that reports presses', async () => {
    const onPress = jest.fn();
    await render(
      <PickerNoneRow
        label="Без питомца"
        isSelected={false}
        onPress={onPress}
      />,
    );
    const row = screen.getByRole('radio', { name: 'Без питомца' });
    expect(row).not.toBeChecked();
    await fireEvent.press(row);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows the selected look', async () => {
    await render(
      <PickerNoneRow label="Без питомца" isSelected onPress={jest.fn()} />,
    );
    const row = screen.getByRole('radio', { name: 'Без питомца' });
    expect(row).toBeChecked();
    expect(StyleSheet.flatten(row.props.style)).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accentSoft,
      borderColor: lightTheme.colors.bg.accent,
    });
  });
});
