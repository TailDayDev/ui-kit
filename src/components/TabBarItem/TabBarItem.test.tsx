import { StyleSheet, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import type { IconComponentProps } from '../../primitives';
import { lightTheme } from '../../theme';
import { TabBarItem } from './TabBarItem';

const TestIcon = ({ color }: IconComponentProps) => (
  <View testID="glyph" accessibilityHint={color} />
);

const getGlyphColor = () =>
  screen.getByTestId('glyph', { includeHiddenElements: true }).props
    .accessibilityHint;

describe('TabBarItem', () => {
  it('is a selected tab with an accent icon when focused', async () => {
    await render(<TabBarItem icon={TestIcon} accessibilityLabel="Today" />);
    expect(screen.getByRole('tab', { name: 'Today' })).toBeSelected();
    expect(getGlyphColor()).toBe(lightTheme.colors.icon.accent);
  });

  it('uses the default icon color when not focused', async () => {
    await render(
      <TabBarItem
        icon={TestIcon}
        isFocused={false}
        accessibilityLabel="Calendar"
      />,
    );
    expect(screen.getByRole('tab', { name: 'Calendar' })).not.toBeSelected();
    expect(getGlyphColor()).toBe(lightTheme.colors.icon.default);
  });

  it('renders the default IconTabToday without an icon prop', async () => {
    await render(<TabBarItem accessibilityLabel="Today" />);
    expect(screen.getByRole('tab', { name: 'Today' })).toBeTruthy();
  });

  it('shows the dot badge only with hasBadge', async () => {
    const { rerender } = await render(
      <TabBarItem accessibilityLabel="Today" testID="tab" />,
    );
    expect(screen.queryByTestId('tab.badge')).toBeNull();
    await rerender(
      <TabBarItem accessibilityLabel="Today" testID="tab" hasBadge />,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('tab.badge').props.style),
    ).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accent,
      width: 6,
      height: 6,
    });
  });

  it('forwards press callbacks', async () => {
    const onPress = jest.fn();
    const onPressIn = jest.fn();
    const onLongPress = jest.fn();
    await render(
      <TabBarItem
        accessibilityLabel="Menu"
        onPress={onPress}
        onPressIn={onPressIn}
        onLongPress={onLongPress}
      />,
    );
    const tab = screen.getByRole('tab', { name: 'Menu' });
    await fireEvent.press(tab);
    await fireEvent(tab, 'pressIn');
    await fireEvent(tab, 'longPress');
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPressIn).toHaveBeenCalledTimes(1);
    expect(onLongPress).toHaveBeenCalledTimes(1);
  });
});
