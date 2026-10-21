import { StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodaySkeleton } from './TodaySkeleton';

describe('TodaySkeleton', () => {
  it('renders the Figma frame: padding 16, gap 16, header + three cards', async () => {
    await render(<TodaySkeleton testID="skeleton" />);
    const container = screen.getByTestId('skeleton', {
      includeHiddenElements: true,
    });
    expect(StyleSheet.flatten(container.props.style)).toMatchObject({
      paddingHorizontal: 16,
      gap: 16,
    });
    expect(container.children).toHaveLength(4);
    const [header, ...cards] = container.children;
    const styleOf = (node: (typeof container.children)[number] | undefined) =>
      node === undefined || typeof node === 'string'
        ? undefined
        : StyleSheet.flatten(node.props.style);
    expect(styleOf(header)).toMatchObject({ height: 44, paddingTop: 16 });
    cards.forEach(card => {
      expect(styleOf(card)).toMatchObject({
        backgroundColor: lightTheme.colors.bg.surface,
        borderRadius: 16,
        paddingTop: 8,
        boxShadow: [...lightTheme.shadows.block],
      });
    });
  });

  it('is silent for screen readers by default', async () => {
    await render(<TodaySkeleton testID="skeleton" />);
    expect(screen.queryByRole('progressbar')).toBeNull();
  });

  it('announces one busy progress bar when labelled', async () => {
    await render(<TodaySkeleton accessibilityLabel="Loading" />);
    const progress = screen.getByRole('progressbar', { name: 'Loading' });
    expect(progress.props.accessibilityState).toMatchObject({ busy: true });
  });
});
