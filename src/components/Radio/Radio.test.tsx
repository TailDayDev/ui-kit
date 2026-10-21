import { StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders an empty grey ring when inactive', async () => {
    await render(<Radio isActive={false} testID="radio" />);
    const ring = screen.getByTestId('radio', { includeHiddenElements: true });
    const style = StyleSheet.flatten(ring.props.style);
    expect(style).toMatchObject({
      width: 24,
      height: 24,
      borderColor: lightTheme.colors.icon.default,
    });
    expect(
      screen.queryByTestId('radio.dot', { includeHiddenElements: true }),
    ).toBeNull();
  });

  it('renders the accent ring and dot when active', async () => {
    await render(<Radio isActive size={32} dotSize={16} testID="radio" />);
    const ring = screen.getByTestId('radio', { includeHiddenElements: true });
    expect(StyleSheet.flatten(ring.props.style)).toMatchObject({
      width: 32,
      borderColor: lightTheme.colors.icon.accent,
    });
    const dot = screen.getByTestId('radio.dot', {
      includeHiddenElements: true,
    });
    expect(StyleSheet.flatten(dot.props.style)).toMatchObject({
      width: 16,
      backgroundColor: lightTheme.colors.bg.accent,
    });
  });

  it('has no accessibility role of its own (the parent row owns it)', async () => {
    await render(<Radio isActive testID="radio" />);
    expect(
      screen.getByTestId('radio', { includeHiddenElements: true }).props
        .accessibilityRole,
    ).toBeUndefined();
  });
});
