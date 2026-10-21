import { StyleSheet, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { LabeledDetailRow } from './LabeledDetailRow';

describe('LabeledDetailRow', () => {
  it('renders label, accent value and description', async () => {
    await render(
      <LabeledDetailRow
        label="Phone"
        value="+37360112233"
        description="Mobile"
        isLast
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByText('Phone').props.style),
    ).toMatchObject({
      ...lightTheme.typography.body.regular,
      color: lightTheme.colors.text.primary,
    });
    expect(
      StyleSheet.flatten(screen.getByText('+37360112233').props.style),
    ).toMatchObject({
      color: lightTheme.colors.text.accent,
      textAlign: 'right',
    });
    expect(
      StyleSheet.flatten(screen.getByText('Mobile').props.style).color,
    ).toBe(lightTheme.colors.text.secondary);
  });

  // Ported from the app test (react-test-renderer → RNTL).
  it('handles a row action without propagating it to the parent card', async () => {
    const onPress = jest.fn();
    const stopPropagation = jest.fn();
    await render(
      <LabeledDetailRow
        label="Phone"
        value="+37360112233"
        isLast
        onPress={onPress}
        testID="phone-row"
      />,
    );
    await fireEvent.press(screen.getByTestId('phone-row'), { stopPropagation });
    expect(stopPropagation).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  // Ported from the app test (react-test-renderer → RNTL).
  it('handles a value action without propagating it to the row', async () => {
    const onPress = jest.fn();
    const onValuePress = jest.fn();
    const stopPropagation = jest.fn();
    await render(
      <LabeledDetailRow
        label="Email"
        value="owner@example.com"
        isLast
        onPress={onPress}
        onValuePress={onValuePress}
        valueTestID="email-value"
      />,
    );
    await fireEvent.press(screen.getByTestId('email-value'), {
      stopPropagation,
    });
    expect(stopPropagation).toHaveBeenCalledTimes(1);
    expect(onValuePress).toHaveBeenCalledTimes(1);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('is not pressable without onPress', async () => {
    await render(
      <LabeledDetailRow label="Phone" value="1" isLast testID="row" />,
    );
    expect(screen.getByTestId('row')).toBeDisabled();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('draws a divider unless it is the last row', async () => {
    await render(
      <View testID="list">
        <LabeledDetailRow label="Phone" value="1" isLast={false} />
        <LabeledDetailRow label="Email" value="2" isLast />
      </View>,
    );
    const children = screen.getByTestId('list').children;
    expect(children).toHaveLength(3);
    const divider = children[1];
    if (!divider || typeof divider === 'string') {
      throw new Error('divider not rendered');
    }
    expect(StyleSheet.flatten(divider.props.style)).toMatchObject({
      backgroundColor: lightTheme.colors.border.default,
      height: 1,
      marginVertical: lightTheme.space[3],
    });
  });
});
