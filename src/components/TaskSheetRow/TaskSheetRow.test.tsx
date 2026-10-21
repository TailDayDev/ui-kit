import { StyleSheet, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import type { IconComponentProps } from '../../primitives/Icon';
import { lightTheme } from '../../theme';
import { TaskSheetRow } from './TaskSheetRow';

const TestSvg = ({ color }: IconComponentProps) => (
  <View testID="svg" accessibilityHint={color} />
);
const svgColor = () =>
  screen.getByTestId('svg', { includeHiddenElements: true }).props
    .accessibilityHint;

describe('TaskSheetRow', () => {
  it('renders the Figma frame: white fill, light gray border, padding 16/24', async () => {
    await render(<TaskSheetRow testID="row" label="Label" icon={TestSvg} />);
    expect(
      StyleSheet.flatten(screen.getByTestId('row').props.style),
    ).toMatchObject({
      backgroundColor: lightTheme.colors.bg.surface,
      borderColor: lightTheme.palette.lightGray,
      borderRadius: 8,
      borderWidth: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 16,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Label').props.style),
    ).toMatchObject({
      ...lightTheme.typography.headline.medium,
      color: lightTheme.colors.text.primary,
    });
    expect(svgColor()).toBe(lightTheme.colors.icon.default);
  });

  it('paints only the icon red when destructive', async () => {
    await render(
      <TaskSheetRow testID="row" label="Delete" icon={TestSvg} isDestructive />,
    );
    expect(svgColor()).toBe(lightTheme.colors.text.error);
    expect(
      StyleSheet.flatten(screen.getByText('Delete').props.style).color,
    ).toBe(lightTheme.colors.text.primary);
  });

  it('is a button that calls onPress', async () => {
    const onPress = jest.fn();
    await render(<TaskSheetRow label="Skip" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Skip' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(<TaskSheetRow label="Skip" disabled onPress={onPress} />);
    const button = screen.getByRole('button', { name: 'Skip' });
    expect(button).toBeDisabled();
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });
});
