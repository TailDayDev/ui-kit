import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders the selected variant with an accent badge', async () => {
    await render(<Chip name="Dogs" count="3" testID="chip" />);
    const chip = screen.getByTestId('chip');
    expect(chip).toBeSelected();
    expect(StyleSheet.flatten(chip.props.style)).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accentSoft,
      borderColor: lightTheme.colors.bg.accent,
      borderRadius: lightTheme.radius.sm,
      paddingHorizontal: 12,
      paddingVertical: 8,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Dogs').props.style),
    ).toMatchObject({
      ...lightTheme.typography.caption.bold,
      color: lightTheme.colors.text.accent,
    });
    expect(StyleSheet.flatten(screen.getByText('3').props.style).color).toBe(
      lightTheme.colors.text.inverse,
    );
  });

  it('renders the unselected variant', async () => {
    await render(
      <Chip name="Cats" count="4" isSelected={false} testID="chip" />,
    );
    const chip = screen.getByTestId('chip');
    expect(chip).not.toBeSelected();
    expect(StyleSheet.flatten(chip.props.style)).toMatchObject({
      backgroundColor: lightTheme.colors.bg.surface,
      borderColor: lightTheme.colors.border.default,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Cats').props.style),
    ).toMatchObject({
      ...lightTheme.typography.caption.medium,
      color: lightTheme.colors.text.primary,
    });
    expect(StyleSheet.flatten(screen.getByText('4').props.style).color).toBe(
      lightTheme.colors.text.accent,
    );
  });

  it('hides the badge when hasBadge is false', async () => {
    await render(<Chip name="Birds" count="7" hasBadge={false} />);
    expect(screen.queryByText('7')).toBeNull();
  });

  it('calls onPress and exposes a button role', async () => {
    const onPress = jest.fn();
    await render(
      <Chip
        name="Dogs"
        count="1"
        onPress={onPress}
        accessibilityLabel="Dogs, 1"
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Dogs, 1' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
