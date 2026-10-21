import { StyleSheet } from 'react-native';
import type ReactModule from 'react';
import type * as ReactNativeModule from 'react-native';
import { act, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { DatePicker } from './DatePicker';

jest.mock('@react-native-picker/picker', () => {
  const ReactActual = jest.requireActual<typeof ReactModule>('react');
  const { View } = jest.requireActual<typeof ReactNativeModule>('react-native');
  const Picker = (props: Record<string, unknown>) =>
    ReactActual.createElement(View, { ...props, testID: 'picker' });
  Picker.Item = function MockPickerItem() {
    return null;
  };
  return { Picker };
});

const MONTHS = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);

describe('DatePicker', () => {
  it('renders the title, description and a day/month/year wheel', async () => {
    await render(
      <DatePicker
        label="Birthday"
        description="Pick the pet's birthday"
        value="2020-03-15T12:00:00.000Z"
        monthLabels={MONTHS}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByRole('header', { name: 'Birthday' })).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByText('Birthday').props.style),
    ).toMatchObject({
      fontSize: lightTheme.typography.largeTitle.semibold.fontSize,
      color: lightTheme.colors.text.primary,
    });
    expect(
      StyleSheet.flatten(
        screen.getByText("Pick the pet's birthday").props.style,
      ).color,
    ).toBe(lightTheme.colors.text.secondary);
    expect(screen.getAllByTestId('picker')).toHaveLength(3);
  });

  it('hides empty title and description', async () => {
    await render(
      <DatePicker monthLabels={MONTHS} onChange={jest.fn()} label="" />,
    );

    expect(screen.queryByRole('header')).toBeNull();
  });

  it('reports the initial date and every pick', async () => {
    const onChange = jest.fn();
    await render(
      <DatePicker
        value="2020-03-15T12:00:00.000Z"
        locale="de-DE"
        monthLabels={MONTHS}
        onChange={onChange}
      />,
    );

    expect(onChange).toHaveBeenLastCalledWith('2020-03-15T00:00:00.000Z');

    // de-DE: day / month / year.
    const [dayColumn] = screen.getAllByTestId('picker');
    await act(() => {
      dayColumn?.props.onValueChange(20, 19);
    });
    expect(onChange).toHaveBeenLastCalledWith('2020-03-20T00:00:00.000Z');
  });

  it('does not report the initial date with autoInitialize off', async () => {
    const onChange = jest.fn();
    await render(
      <DatePicker
        autoInitialize={false}
        monthLabels={MONTHS}
        onChange={onChange}
      />,
    );

    expect(onChange).not.toHaveBeenCalled();
  });
});
