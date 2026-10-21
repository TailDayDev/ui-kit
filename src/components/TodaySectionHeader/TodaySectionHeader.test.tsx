import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodaySectionHeader } from './TodaySectionHeader';

const titleColor = (text: string) =>
  StyleSheet.flatten(screen.getByText(text).props.style).color;

describe('TodaySectionHeader', () => {
  it('renders the Figma row: padding-top 12, gap 8, caption title', async () => {
    await render(
      <TodaySectionHeader
        testID="header"
        title="Today: 3"
        onToggle={jest.fn()}
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('header').props.style),
    ).toMatchObject({
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingTop: 12,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Today: 3').props.style),
    ).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.primary,
    });
  });

  it('paints the title red for a past date', async () => {
    await render(<TodaySectionHeader title="Overdue: 2" isPastDate />);
    expect(titleColor('Overdue: 2')).toBe(lightTheme.colors.text.error);
  });

  it('is an expanded toggle that calls onToggle', async () => {
    const onToggle = jest.fn();
    await render(<TodaySectionHeader title="Today: 3" onToggle={onToggle} />);
    const toggle = screen.getByRole('button', { name: 'Today: 3' });
    expect(toggle.props.accessibilityState).toMatchObject({ expanded: true });
    await fireEvent.press(toggle);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('reports collapsed state', async () => {
    await render(
      <TodaySectionHeader
        title="Today: 3"
        isExpanded={false}
        onToggle={jest.fn()}
      />,
    );
    expect(
      screen.getByRole('button', { name: 'Today: 3' }).props.accessibilityState,
    ).toMatchObject({ expanded: false });
  });

  it('exposes only one button (the chevron is decorative)', async () => {
    await render(<TodaySectionHeader title="Today: 3" onToggle={jest.fn()} />);
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(
      screen.getAllByRole('button', { includeHiddenElements: true }),
    ).toHaveLength(2);
  });

  it('is static and has no chevron when not collapsible', async () => {
    const onToggle = jest.fn();
    await render(
      <TodaySectionHeader
        title="Done: 5"
        isCollapsible={false}
        onToggle={onToggle}
      />,
    );
    expect(
      screen.queryAllByRole('button', { includeHiddenElements: true }),
    ).toHaveLength(0);
    expect(screen.getByText('Done: 5')).toBeTruthy();
  });

  it('is static without onToggle', async () => {
    await render(<TodaySectionHeader title="Today: 3" />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
