import { StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { CardLocked } from './CardLocked';

// react-native-svg has no Jest setup in the kit; the icon itself is not under test here.
jest.mock('../../icons/LockIcon', () => {
  const { View } = jest.requireActual('react-native');
  return {
    LockIcon: ({ color, size }: { color?: string; size?: number }) => (
      <View testID="lock" accessibilityHint={`${color}|${size}`} />
    ),
  };
});

describe('CardLocked', () => {
  it('renders title and value in the secondary color', async () => {
    await render(<CardLocked title="Species" value="Dog" testID="locked" />);
    expect(
      StyleSheet.flatten(screen.getByText('Species').props.style),
    ).toMatchObject({
      ...lightTheme.typography.headline.bold,
      color: lightTheme.colors.text.secondary,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Dog').props.style),
    ).toMatchObject({
      ...lightTheme.typography.body.regular,
      color: lightTheme.colors.text.secondary,
    });
  });

  it('is a transparent, non-interactive card', async () => {
    await render(<CardLocked title="Species" value="Dog" testID="locked" />);
    const card = screen.getByTestId('locked');
    expect(card.props.pointerEvents).toBe('none');
    expect(StyleSheet.flatten(card.props.style)).toMatchObject({
      backgroundColor: 'transparent',
      borderColor: lightTheme.colors.border.default,
    });
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('draws a 20pt light-gray padlock', async () => {
    await render(<CardLocked title="Species" value="Dog" />);
    expect(
      screen.getByTestId('lock', { includeHiddenElements: true }).props
        .accessibilityHint,
    ).toBe(`${lightTheme.palette.lightGray}|20`);
  });
});
