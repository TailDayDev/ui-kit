import { View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { Icon } from './Icon';
import type { IconComponentProps } from './Icon.types';

const TestSvg = ({ color, size }: IconComponentProps) => (
  <View testID="svg" accessibilityHint={`${color}|${size}`} />
);

describe('Icon', () => {
  it('passes the resolved color and size to the svg', async () => {
    await render(<Icon icon={TestSvg} color="accent" size={16} />);
    expect(
      screen.getByTestId('svg', { includeHiddenElements: true }).props
        .accessibilityHint,
    ).toBe(`${lightTheme.colors.icon.accent}|16`);
  });

  it('accepts text roles', async () => {
    await render(<Icon icon={TestSvg} color="text.error" />);
    expect(
      screen.getByTestId('svg', { includeHiddenElements: true }).props
        .accessibilityHint,
    ).toBe(`${lightTheme.colors.text.error}|24`);
  });

  it('is an image with a label when labelled', async () => {
    await render(<Icon icon={TestSvg} accessibilityLabel="Search" />);
    expect(screen.getByRole('image', { name: 'Search' })).toBeTruthy();
  });
});
