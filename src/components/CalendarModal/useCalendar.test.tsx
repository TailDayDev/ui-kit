import { Pressable } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import type { CalendarDateRange } from './CalendarModal.types';
import { useCalendar } from './useCalendar';

const INITIAL_SELECTED: CalendarDateRange = {
  startDate: '2026-09-03',
  endDate: '2026-09-03',
};
const EMPTY_BOOKED: string[] = [];

const Probe = ({
  mode,
  onRange,
}: {
  mode: 'range' | 'single';
  onRange: (range: CalendarDateRange) => void;
}) => {
  const { selectedRange, onDayPress } = useCalendar(
    true,
    INITIAL_SELECTED,
    EMPTY_BOOKED,
    mode,
  );
  onRange(selectedRange);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="press-day"
      onPress={() => onDayPress({ dateString: '2026-09-18' })}
    />
  );
};

describe('useCalendar selectionMode', () => {
  it('single tap selects one day, not a one-night range', async () => {
    let range: CalendarDateRange = {};
    await render(
      <Probe
        mode="single"
        onRange={next => {
          range = next;
        }}
      />,
    );

    await fireEvent.press(screen.getByRole('button', { name: 'press-day' }));

    expect(range.startDate).toBe('2026-09-18');
    expect(range.endDate).toBe('2026-09-18');
  });

  it('range tap on a complete selection starts a new start without end', async () => {
    let range: CalendarDateRange = {};
    await render(
      <Probe
        mode="range"
        onRange={next => {
          range = next;
        }}
      />,
    );

    await fireEvent.press(screen.getByRole('button', { name: 'press-day' }));

    expect(range.startDate).toBe('2026-09-18');
    expect(range.endDate).toBeUndefined();
  });
});
