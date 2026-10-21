import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ScheduleOverview } from './ScheduleOverview';
import type { ScheduleOverviewProps } from './ScheduleOverview.types';

const LABELS = {
  title: 'Time and repeat',
  timing: 'Time',
  repeat: 'Repeat',
  start: 'Starts',
  end: 'Ends',
};

const createProps = (
  overrides: Partial<ScheduleOverviewProps> = {},
): ScheduleOverviewProps => ({
  labels: LABELS,
  endValue: 'Never',
  isEndSelected: false,
  isRepeatSelected: true,
  isStartSelected: true,
  isTimingSelected: false,
  onClearRepeat: jest.fn(),
  onClearTiming: jest.fn(),
  onEndPress: jest.fn(),
  onRepeatPress: jest.fn(),
  onStartPress: jest.fn(),
  onTimingPress: jest.fn(),
  repeatValue: 'Daily',
  showEnd: true,
  showRepeat: true,
  showStart: true,
  startValue: 'Today',
  testIDPrefix: 'diet',
  timingValue: 'Not set',
  ...overrides,
});

describe('ScheduleOverview', () => {
  it('renders the title and visible rows', async () => {
    await render(
      <ScheduleOverview
        {...createProps({ showTiming: false, showEnd: false })}
      />,
    );
    expect(screen.getByText('Time and repeat')).toBeTruthy();
    expect(screen.queryByTestId('diet.timing')).toBeNull();
    expect(screen.queryByTestId('diet.end')).toBeNull();
    expect(screen.getByTestId('diet.repeat')).toBeTruthy();
    expect(screen.getByTestId('diet.start')).toBeTruthy();
  });

  it('colors selected values with the accent and empty ones grey', async () => {
    await render(<ScheduleOverview {...createProps()} />);
    expect(
      StyleSheet.flatten(screen.getByText('Daily').props.style).color,
    ).toBe(lightTheme.colors.text.accent);
    expect(
      StyleSheet.flatten(screen.getByText('Not set').props.style).color,
    ).toBe(lightTheme.colors.text.secondary);
  });

  it('opens a picker from the row and from the expand button', async () => {
    const props = createProps();
    await render(<ScheduleOverview {...props} />);
    await fireEvent.press(screen.getByTestId('diet.timing'));
    expect(props.onTimingPress).toHaveBeenCalledTimes(1);
    const stopPropagation = jest.fn();
    await fireEvent.press(screen.getByTestId('diet.timing.expand'), {
      stopPropagation,
    });
    expect(stopPropagation).toHaveBeenCalledTimes(1);
    expect(props.onTimingPress).toHaveBeenCalledTimes(2);
  });

  it('clears a selected value without opening its picker', async () => {
    const props = createProps();
    await render(<ScheduleOverview {...props} />);
    await fireEvent.press(screen.getByTestId('diet.repeat.clear'), {
      stopPropagation: jest.fn(),
    });
    expect(props.onClearRepeat).toHaveBeenCalledTimes(1);
    expect(props.onRepeatPress).not.toHaveBeenCalled();
    expect(screen.queryByTestId('diet.start.clear')).toBeNull();
  });

  it('shows the end clear button only with onClearEnd', async () => {
    const onClearEnd = jest.fn();
    await render(
      <ScheduleOverview
        {...createProps({ isEndSelected: true, onClearEnd })}
      />,
    );
    await fireEvent.press(screen.getByTestId('diet.end.clear'), {
      stopPropagation: jest.fn(),
    });
    expect(onClearEnd).toHaveBeenCalledTimes(1);
  });
});
