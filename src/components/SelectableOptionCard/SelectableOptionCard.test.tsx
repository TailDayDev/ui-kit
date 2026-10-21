import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { SelectableOptionCard } from './SelectableOptionCard';

describe('SelectableOptionCard', () => {
  it('renders title, description and badge', async () => {
    await render(
      <SelectableOptionCard
        title="Rabies"
        description="Core vaccine"
        badgeText="Recommended"
      />,
    );
    expect(screen.getByText('Rabies')).toBeTruthy();
    expect(screen.getByText('Core vaccine')).toBeTruthy();
    expect(screen.getByText('Recommended')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('uses accent texts when selected', async () => {
    await render(
      <SelectableOptionCard
        title="Rabies"
        description="Core vaccine"
        isSelected
        onPress={jest.fn()}
      />,
    );
    expect(screen.getByRole('button')).toBeSelected();
    expect(
      StyleSheet.flatten(screen.getByText('Rabies').props.style).color,
    ).toBe(lightTheme.colors.text.accent);
  });

  it('calls onPress on tap', async () => {
    const onPress = jest.fn();
    await render(
      <SelectableOptionCard title="Rabies" onPress={onPress} testID="card" />,
    );
    await fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('card')).toBeTruthy();
  });

  it('blocks taps when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <SelectableOptionCard title="Rabies" onPress={onPress} isDisabled />,
    );
    const card = screen.getByRole('button');
    await fireEvent.press(card);
    expect(onPress).not.toHaveBeenCalled();
    expect(card).toBeDisabled();
  });
});
