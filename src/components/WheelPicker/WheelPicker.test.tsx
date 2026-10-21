import { StyleSheet } from 'react-native';
import type ReactModule from 'react';
import type * as ReactNativeModule from 'react-native';
import {
  act,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { WheelPicker } from './WheelPicker';
import { getDateFieldOrder } from './wheelHelpers';

jest.mock('@react-native-picker/picker', () => {
  const ReactActual = jest.requireActual<typeof ReactModule>('react');
  const { View } = jest.requireActual<typeof ReactNativeModule>('react-native');
  const Picker = (props: Record<string, unknown>) =>
    ReactActual.createElement(View, { ...props, testID: 'picker' });
  Picker.Item = (props: { label: string }) =>
    ReactActual.createElement(View, {
      testID: 'picker-item',
      accessibilityLabel: props.label,
    });
  return { Picker };
});

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getPickers = () => screen.getAllByTestId('picker');

const getPicker = (columnIndex: number) => {
  const picker = getPickers()[columnIndex];
  if (!picker) {
    throw new Error(`No native column ${columnIndex}`);
  }
  return picker;
};

/** Labels of every row of one native column. */
const getColumnLabels = (columnIndex: number): string[] =>
  within(getPicker(columnIndex))
    .getAllByTestId('picker-item')
    .map(node => node.props.accessibilityLabel as string);

const pickInColumn = async (columnIndex: number, value: unknown, index = 0) => {
  await act(() => {
    getPicker(columnIndex).props.onValueChange(value, index);
  });
  // The picker echoes the native value for one frame; let that frame finish inside act.
  await act(() => new Promise(resolve => setTimeout(resolve, 0)));
};

describe('WheelPicker', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('select: one native column that reports picks', async () => {
    const onValueChange = jest.fn();
    await render(
      <WheelPicker
        mode="select"
        items={[
          { label: 'One', value: 1 },
          { label: 'Two', value: 2 },
        ]}
        selectedValue={1}
        onValueChange={onValueChange}
        testID="wheel"
      />,
    );

    expect(getPickers()).toHaveLength(1);
    expect(getColumnLabels(0)).toEqual(['One', 'Two']);
    await pickInColumn(0, 2, 1);
    expect(onValueChange).toHaveBeenCalledWith(2, 1);
  });

  it('columns: renders every column', async () => {
    await render(
      <WheelPicker
        mode="columns"
        columns={[
          {
            key: 'a',
            items: [{ label: 'A', value: 'a' }],
            selectedValue: 'a',
            onValueChange: jest.fn(),
          },
          {
            key: 'b',
            items: [{ label: 'B', value: 'b' }],
            selectedValue: 'b',
            onValueChange: jest.fn(),
          },
        ]}
      />,
    );

    expect(getPickers()).toHaveLength(2);
  });

  it('time 24h: hour and 5-minute columns', async () => {
    const onChange = jest.fn();
    const value = { hour: '09', minutes: '30', format: null };
    await render(<WheelPicker mode="time" value={value} onChange={onChange} />);

    expect(getPickers()).toHaveLength(2);
    expect(getColumnLabels(0)).toHaveLength(24);
    expect(getColumnLabels(1)).toEqual([
      '00',
      '05',
      '10',
      '15',
      '20',
      '25',
      '30',
      '35',
      '40',
      '45',
      '50',
      '55',
    ]);

    await pickInColumn(0, '14', 14);
    expect(onChange).toHaveBeenCalledWith({ ...value, hour: '14' });
  });

  it('time 12h: adds the am/pm column', async () => {
    const onChange = jest.fn();
    const value = { hour: '09', minutes: '00', format: 'am' as const };
    await render(
      <WheelPicker
        mode="time"
        hourFormat="12h"
        minuteInterval={15}
        value={value}
        onChange={onChange}
      />,
    );

    expect(getPickers()).toHaveLength(3);
    expect(getColumnLabels(0)[0]).toBe('01');
    expect(getColumnLabels(0)).toHaveLength(12);
    expect(getColumnLabels(1)).toEqual(['00', '15', '30', '45']);
    expect(getColumnLabels(2)).toEqual(['am', 'pm']);

    await pickInColumn(2, 'pm', 1);
    expect(onChange).toHaveBeenCalledWith({ ...value, format: 'pm' });
  });

  it('date: columns in the locale order, translated months, initial report', async () => {
    const onChange = jest.fn();
    await render(
      <WheelPicker
        mode="date"
        value="2020-03-15T12:00:00.000Z"
        minDateIso="2019-01-01T12:00:00.000Z"
        maxDateIso="2021-12-31T12:00:00.000Z"
        monthLabels={MONTHS}
        locale="en-US"
        onChange={onChange}
      />,
    );

    // en-US: month / day / year. Midday ISO values keep the local day in any time zone.
    expect(getColumnLabels(0)).toEqual(MONTHS);
    expect(getColumnLabels(1)).toHaveLength(31);
    expect(getColumnLabels(2)).toEqual(['2021', '2020', '2019']);
    expect(onChange).toHaveBeenLastCalledWith('2020-03-15T00:00:00.000Z');

    await pickInColumn(0, 2, 1);
    // March 15 → February keeps the day.
    expect(onChange).toHaveBeenLastCalledWith('2020-02-15T00:00:00.000Z');
  });

  it('date: does not report the initial date with autoInitialize off', async () => {
    const onChange = jest.fn();
    await render(
      <WheelPicker
        mode="date"
        value="2020-03-15T00:00:00.000Z"
        monthLabels={MONTHS}
        autoInitialize={false}
        onChange={onChange}
      />,
    );

    expect(onChange).not.toHaveBeenCalled();
  });

  it('weight kg: kg and grams columns with unit labels', async () => {
    const onChange = jest.fn();
    await render(
      <WheelPicker
        mode="weight"
        unit="kg"
        weightKg={4.3}
        unitLabels={{ pounds: 'lbs', kilograms: 'kg', grams: 'g' }}
        onChange={onChange}
      />,
    );

    expect(getColumnLabels(0)[4]).toBe('4 kg');
    expect(getColumnLabels(1)[3]).toBe('300 g');
    expect(getPicker(0).props.selectedValue).toBe(4);
    expect(getPicker(1).props.selectedValue).toBe(300);

    await pickInColumn(1, 500, 5);
    expect(onChange).toHaveBeenCalledWith(4.5);
  });

  it('weight lbs: one column, reported in kg', async () => {
    const onChange = jest.fn();
    await render(
      <WheelPicker
        mode="weight"
        unit="lbs"
        weightKg={null}
        unitLabels={{ pounds: 'lbs', kilograms: 'kg', grams: 'g' }}
        onChange={onChange}
      />,
    );

    expect(getPickers()).toHaveLength(1);
    expect(getColumnLabels(0)[0]).toBe('0.5 lbs');
    await pickInColumn(0, 22, 0);
    expect(onChange).toHaveBeenCalledWith(9.98);
  });

  describe('JS wheel (selection band)', () => {
    const renderJsWheel = async (onValueChange = jest.fn()) => {
      await render(
        <WheelPicker
          mode="select"
          items={['A', 'B', 'C'].map(label => ({ label, value: label }))}
          selectedValue="A"
          onValueChange={onValueChange}
          selectionIndicatorStyle={{ backgroundColor: 'transparent' }}
          testID="wheel"
        />,
      );
      return onValueChange;
    };

    it('renders the app geometry without the native picker', async () => {
      await renderJsWheel();

      expect(screen.queryByTestId('picker')).toBeNull();
      expect(
        StyleSheet.flatten(screen.getByTestId('wheel').props.style),
      ).toMatchObject({
        backgroundColor: lightTheme.colors.bg.surface,
        // 5 visible rows × 44.
        height: 220,
      });
      expect(
        screen.getByRole('button', { name: 'A', selected: true }),
      ).toBeTruthy();
      expect(
        StyleSheet.flatten(screen.getByText('A').props.style),
      ).toMatchObject({
        fontFamily: lightTheme.typography.headline.bold.fontFamily,
        fontSize: lightTheme.typography.headline.bold.fontSize,
        color: lightTheme.colors.text.primary,
      });
      expect(StyleSheet.flatten(screen.getByText('B').props.style).color).toBe(
        lightTheme.colors.text.secondary,
      );
      expect(StyleSheet.flatten(screen.getByText('C').props.style).color).toBe(
        lightTheme.palette.lightGray,
      );
    });

    it('commits a tapped row once', async () => {
      const onValueChange = await renderJsWheel();

      await fireEvent.press(screen.getByRole('button', { name: 'C' }));
      await fireEvent.press(screen.getByRole('button', { name: 'C' }));

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledWith('C', 2);
    });
  });
});

describe('getDateFieldOrder', () => {
  it('follows the locale', () => {
    expect(getDateFieldOrder('en-US')).toEqual(['month', 'day', 'year']);
    expect(getDateFieldOrder('de-DE')).toEqual(['day', 'month', 'year']);
  });
});
