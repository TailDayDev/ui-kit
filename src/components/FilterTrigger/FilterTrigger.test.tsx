import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { FilterTrigger } from './FilterTrigger';

describe('FilterTrigger', () => {
  it('is a labelled button that calls onPress', async () => {
    const onPress = jest.fn();
    await render(
      <FilterTrigger accessibilityLabel="Filters" onPress={onPress} />,
    );
    const button = screen.getByRole('button', { name: 'Filters' });
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      backgroundColor: lightTheme.colors.bg.subtle,
      width: 40,
      height: 40,
      opacity: 1,
    });
    await fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('hides the badge for zero and shows the count', async () => {
    await render(<FilterTrigger accessibilityLabel="Filters" count={0} />);
    expect(screen.queryByText('0')).toBeNull();

    await render(<FilterTrigger accessibilityLabel="Filters" count={3} />);
    expect(StyleSheet.flatten(screen.getByText('3').props.style)).toMatchObject(
      {
        ...lightTheme.typography.caption.medium,
        color: lightTheme.colors.text.inverse,
      },
    );
  });

  it('caps the badge at 999+', async () => {
    await render(<FilterTrigger accessibilityLabel="Filters" count={1200} />);
    expect(screen.getByText('999+')).toBeTruthy();
  });

  it('blocks the press and dims when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <FilterTrigger accessibilityLabel="Filters" disabled onPress={onPress} />,
    );
    const button = screen.getByRole('button', { name: 'Filters' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(StyleSheet.flatten(button.props.style).opacity).toBe(0.6);
  });
});
