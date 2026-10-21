import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ScheduleRadioRow } from './ScheduleRadioRow';

describe('ScheduleRadioRow', () => {
  it('renders title and description with the radio role', async () => {
    await render(
      <ScheduleRadioRow
        title="Exact time"
        description="Set hours"
        selected
        onPress={jest.fn()}
      />,
    );
    const row = screen.getByRole('radio', { name: 'Exact time' });
    expect(row).toBeChecked();
    expect(row).toBeSelected();
    expect(screen.getByText('Exact time')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByText('Set hours').props.style).color,
    ).toBe(lightTheme.colors.text.secondary);
  });

  it('applies descriptionColor', async () => {
    await render(
      <ScheduleRadioRow
        title="Exact time"
        description="Set hours"
        descriptionColor={lightTheme.palette.darkGray}
        selected={false}
        onPress={jest.fn()}
      />,
    );
    expect(screen.getByRole('radio', { name: 'Exact time' })).not.toBeChecked();
    expect(
      StyleSheet.flatten(screen.getByText('Set hours').props.style).color,
    ).toBe(lightTheme.palette.darkGray);
  });

  it('calls onPress on tap', async () => {
    const onPress = jest.fn();
    await render(
      <ScheduleRadioRow
        title="Exact time"
        description="Set hours"
        selected={false}
        onPress={onPress}
      />,
    );
    await fireEvent.press(screen.getByRole('radio', { name: 'Exact time' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('blocks taps when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <ScheduleRadioRow
        title="Exact time"
        description="Set hours"
        selected={false}
        disabled
        onPress={onPress}
      />,
    );
    const row = screen.getByRole('radio', { name: 'Exact time' });
    await fireEvent.press(row);
    expect(onPress).not.toHaveBeenCalled();
    expect(row).toBeDisabled();
  });
});
