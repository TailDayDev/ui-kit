import { StyleSheet, Text as RNText } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { FieldRow } from './FieldRow';

const pressEvent = () => ({ stopPropagation: jest.fn() });
const valueColor = (text: string) =>
  StyleSheet.flatten(screen.getByText(text).props.style).color;

describe('FieldRow', () => {
  it('renders the Figma frame: radius 8, padding 12, gap 8, pale border', async () => {
    await render(
      <FieldRow
        testID="row"
        icon={<RNText>i</RNText>}
        label="Date"
        value="12 May"
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('row').props.style),
    ).toMatchObject({
      borderRadius: 8,
      padding: 12,
      gap: 8,
      borderWidth: 1,
      borderColor: lightTheme.colors.border.default,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Date').props.style),
    ).toMatchObject({
      ...lightTheme.typography.body.regular,
      color: lightTheme.colors.text.primary,
    });
    expect(
      StyleSheet.flatten(screen.getByText('12 May').props.style),
    ).toMatchObject({
      ...lightTheme.typography.body.medium,
      color: lightTheme.colors.text.accent,
    });
  });

  it('shows an empty value in secondary and an error in red', async () => {
    await render(<FieldRow label="Date" value="Select" isEmpty />);
    expect(valueColor('Select')).toBe(lightTheme.colors.text.secondary);

    await render(
      <FieldRow testID="row" label="Date" value="Select" isEmpty isError />,
    );
    expect(valueColor('Select')).toBe(lightTheme.colors.text.error);
    expect(
      StyleSheet.flatten(screen.getByTestId('row').props.style).borderColor,
    ).toBe(lightTheme.colors.text.error);
  });

  it('calls onPress from the row and from the chevron', async () => {
    const onPress = jest.fn();
    await render(
      <FieldRow
        label="Date"
        value="12 May"
        accessibilityLabel="Pick a date"
        actionAccessibilityLabel="Open"
        onPress={onPress}
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Pick a date' }));
    const event = pressEvent();
    await fireEvent.press(screen.getByRole('button', { name: 'Open' }), event);
    expect(onPress).toHaveBeenCalledTimes(2);
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  });

  it('calls onClear (not onPress) from the clear action', async () => {
    const onPress = jest.fn();
    const onClear = jest.fn();
    await render(
      <FieldRow
        label="Date"
        value="12 May"
        actionAccessibilityLabel="Clear"
        onPress={onPress}
        onClear={onClear}
      />,
    );
    await fireEvent.press(
      screen.getByRole('button', { name: 'Clear' }),
      pressEvent(),
    );
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('is static without onPress and hides the action on request', async () => {
    await render(
      <FieldRow
        testID="row"
        label="Date"
        value="12 May"
        actionTestID="action"
        showAction={false}
      />,
    );
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByTestId('row')).toBeDisabled();
    expect(screen.queryByTestId('action')).toBeNull();
  });
});
