import { Pressable, StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import {
  clampPercentageValue,
  isPercentageValueInput,
  PERCENTAGE_VALUE_MAX,
  PercentageValueField,
} from './PercentageValueField';
import type { PercentageValueFieldSliderProps } from './PercentageValueField.types';

describe('clampPercentageValue', () => {
  it('accepts the full booking adjustment percentage range', () => {
    expect(clampPercentageValue(0)).toBe(0);
    expect(clampPercentageValue(PERCENTAGE_VALUE_MAX)).toBe(100);
  });

  it('clamps values outside the accepted range', () => {
    expect(clampPercentageValue(-1)).toBe(0);
    expect(clampPercentageValue(101)).toBe(100);
  });

  it('rejects fractional percentage input before it reaches the form state', () => {
    expect(isPercentageValueInput(25)).toBe(true);
    expect(isPercentageValueInput(25.5)).toBe(false);
  });
});

describe('PercentageValueField', () => {
  const renderField = (onChange = jest.fn()) => {
    const renderSlider = jest.fn(
      ({ onValueChange }: PercentageValueFieldSliderProps) => (
        <Pressable
          accessibilityRole="adjustable"
          accessibilityLabel="Slider"
          onPress={() => onValueChange(40)}
        />
      ),
    );
    return {
      onChange,
      renderSlider,
      result: render(
        <PercentageValueField
          value={25}
          onChange={onChange}
          renderSlider={renderSlider}
          testID="percent"
        />,
      ),
    };
  };

  it('renders the value, the slider and the bounds', async () => {
    const { renderSlider, result } = renderField();
    await result;
    expect(screen.getByTestId('percent').props.value).toBe('25');
    expect(
      StyleSheet.flatten(screen.getByTestId('percent').props.style),
    ).toMatchObject({
      ...lightTheme.typography.numbers.bold,
      color: lightTheme.colors.text.primary,
    });
    expect(screen.getByText('0%')).toBeTruthy();
    expect(screen.getByText('100%')).toBeTruthy();
    expect(renderSlider).toHaveBeenLastCalledWith(
      expect.objectContaining({ min: 0, max: 100, step: 1, value: 25 }),
    );
  });

  it('clamps typed values, treats empty as 0 and ignores fractions', async () => {
    const { onChange, result } = renderField();
    await result;
    const input = screen.getByTestId('percent');

    await fireEvent.changeText(input, '150');
    expect(onChange).toHaveBeenLastCalledWith(100);

    await fireEvent.changeText(input, '');
    expect(onChange).toHaveBeenLastCalledWith(0);

    onChange.mockClear();
    await fireEvent.changeText(input, '12.5');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('forwards slider changes', async () => {
    const { onChange, result } = renderField();
    await result;
    await fireEvent.press(screen.getByRole('adjustable', { name: 'Slider' }));
    expect(onChange).toHaveBeenCalledWith(40);
  });
});
