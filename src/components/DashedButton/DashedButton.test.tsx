import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { DashedButton } from './DashedButton';

describe('DashedButton', () => {
  it('renders the title with the variant height', async () => {
    await render(
      <DashedButton
        title="Add item"
        onPress={jest.fn()}
        style="external"
        width={300}
        testID="dashed"
      />,
    );
    expect(screen.getByText('Add item')).toBeTruthy();
    const style = StyleSheet.flatten(screen.getByTestId('dashed').props.style);
    expect(style.height).toBe(56);
  });

  it('calls onPress', async () => {
    const onPress = jest.fn();
    await render(
      <DashedButton title="Add item" onPress={onPress} style="internal" />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Add item' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('blocks presses and dims when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <DashedButton
        title="Add item"
        onPress={onPress}
        style="internal"
        disabled
        testID="dashed"
      />,
    );
    const button = screen.getByRole('button', { name: 'Add item' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(
      StyleSheet.flatten(screen.getByTestId('dashed').props.style).opacity,
    ).toBe(0.6);
  });

  it('reports busy and blocks presses while loading', async () => {
    const onPress = jest.fn();
    await render(
      <DashedButton
        title="Add item"
        onPress={onPress}
        style="externalWrapped"
        loading
      />,
    );
    const button = screen.getByRole('button', { name: 'Add item' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeBusy();
  });
});
