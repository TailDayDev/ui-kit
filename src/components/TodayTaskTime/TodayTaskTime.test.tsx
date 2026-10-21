import { StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodayTaskTime } from './TodayTaskTime';
import type { TodayTaskTimeTone } from './TodayTaskTime.types';

const { text } = lightTheme.colors;
const textStyle = (value: string) =>
  StyleSheet.flatten(screen.getByText(value).props.style);

describe('TodayTaskTime', () => {
  it.each<[TodayTaskTimeTone, string, string]>([
    ['default', text.primary, text.secondary],
    ['overdue', text.error, text.error],
    ['completed', text.primary, text.secondary],
  ])('renders tone=%s', async (tone, titleColor, subtitleColor) => {
    await render(<TodayTaskTime title="10:00" subtitle="in 2 h" tone={tone} />);
    expect(textStyle('10:00')).toMatchObject({
      ...lightTheme.typography.headline.bold,
      color: titleColor,
      textAlign: 'right',
    });
    expect(textStyle('in 2 h')).toMatchObject({
      ...lightTheme.typography.smallCaption.regular,
      color: subtitleColor,
      textAlign: 'right',
    });
  });

  it('right-aligns the column', async () => {
    await render(<TodayTaskTime testID="time" title="10:00" />);
    expect(
      StyleSheet.flatten(screen.getByTestId('time').props.style).alignItems,
    ).toBe('flex-end');
  });

  it('hides the caption when hasSubtitle is false or it is empty', async () => {
    await render(
      <TodayTaskTime title="10:00" subtitle="in 2 h" hasSubtitle={false} />,
    );
    expect(screen.queryByText('in 2 h')).toBeNull();

    await render(<TodayTaskTime title="10:00" subtitle="" />);
    expect(screen.getByText('10:00')).toBeTruthy();
  });
});
