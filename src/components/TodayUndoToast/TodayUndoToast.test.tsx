import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodayUndoToast } from './TodayUndoToast';

describe('TodayUndoToast', () => {
  it('renders the Figma pill: scrim fill, full radius, height 36, padding 8/12/8/24, gap 8', async () => {
    await render(<TodayUndoToast label="Отменить" onPress={jest.fn()} />);
    const button = screen.getByRole('button', { name: 'Отменить' });
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      backgroundColor: lightTheme.colors.overlay.scrim,
      borderRadius: lightTheme.radius.full,
      height: 36,
      paddingTop: 8,
      paddingRight: 12,
      paddingBottom: 8,
      paddingLeft: 24,
      gap: 8,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Отменить').props.style),
    ).toMatchObject({
      ...lightTheme.typography.headline.medium,
      color: lightTheme.colors.text.inverse,
    });
  });

  it('calls onPress once shown', async () => {
    const onPress = jest.fn();
    await render(<TodayUndoToast label="Отменить" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Отменить' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <TodayUndoToast label="Отменить" onPress={onPress} isDisabled />,
    );
    const button = screen.getByRole('button', { name: 'Отменить' });
    expect(button).toBeDisabled();
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders nothing when hidden and unmounts after hiding', async () => {
    await render(
      <TodayUndoToast label="Отменить" onPress={jest.fn()} isVisible={false} />,
    );
    expect(screen.queryByRole('button')).toBeNull();

    await screen.rerender(
      <TodayUndoToast label="Отменить" onPress={jest.fn()} />,
    );
    expect(screen.getByRole('button', { name: 'Отменить' })).toBeTruthy();

    await screen.rerender(
      <TodayUndoToast label="Отменить" onPress={jest.fn()} isVisible={false} />,
    );
    expect(screen.queryByRole('button')).toBeNull();
  });
});
