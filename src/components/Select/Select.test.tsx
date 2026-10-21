import { StyleSheet } from 'react-native';
import type ReactModule from 'react';
import type * as ReactNativeModule from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ModalLayerTestRoot, resetModalLayersForTests } from '../ModalLayer';
import { Select } from './Select';
import type { SelectProps } from './Select.types';

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

const OPTIONS = [
  { label: 'Small', value: 's' },
  { label: 'Large', value: 'l' },
];

const renderSelect = async (props: Partial<SelectProps> = {}) => {
  const setValue = jest.fn();
  const onBlur = jest.fn();
  await render(
    <Select
      label="Size"
      placeholder="Choose a size"
      options={OPTIONS}
      setValue={setValue}
      onBlur={onBlur}
      cancelLabel="Cancel"
      saveLabel="Save"
      testID="select"
      {...props}
    />,
    { wrapper: ModalLayerTestRoot },
  );
  return { setValue, onBlur };
};

const pick = async (value: string) => {
  await act(() => {
    screen
      .getByTestId('picker', { includeHiddenElements: true })
      .props.onValueChange(value, 0);
  });
};

describe('Select', () => {
  afterEach(async () => {
    await act(() => {
      resetModalLayersForTests();
    });
  });

  it('renders the app field with the placeholder', async () => {
    await renderSelect();

    const field = screen.getByTestId('select');
    expect(StyleSheet.flatten(field.props.style)).toMatchObject({
      height: 62,
      borderRadius: 8,
      borderColor: lightTheme.palette.lightGray,
      backgroundColor: lightTheme.colors.bg.surface,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Choose a size').props.style).color,
    ).toBe(lightTheme.colors.text.secondary);
    expect(screen.queryByTestId('picker')).toBeNull();
  });

  it('shows the selected option label', async () => {
    await renderSelect({ value: OPTIONS[1] });

    expect(
      StyleSheet.flatten(screen.getByText('Large').props.style).color,
    ).toBe(lightTheme.colors.text.primary);
  });

  it('applies the pick on Save', async () => {
    const { setValue, onBlur } = await renderSelect({ value: OPTIONS[0] });

    await fireEvent.press(screen.getByTestId('select'));
    expect(screen.getByTestId('select')).toBeExpanded();
    expect(
      screen.getByTestId('picker', { includeHiddenElements: true }).props
        .selectedValue,
    ).toBe('s');

    await pick('l');
    await fireEvent.press(screen.getByRole('button', { name: 'Save' }));

    expect(setValue).toHaveBeenCalledWith(OPTIONS[1]);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('drops the pick on Cancel', async () => {
    const { setValue, onBlur } = await renderSelect({ value: OPTIONS[0] });

    await fireEvent.press(screen.getByTestId('select'));
    await pick('l');
    await fireEvent.press(screen.getByRole('button', { name: 'Cancel' }));

    expect(setValue).not.toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('does not open while disabled', async () => {
    await renderSelect({ disabled: true });

    const field = screen.getByTestId('select');
    expect(field).toBeDisabled();
    await fireEvent.press(field);

    expect(
      screen.queryByTestId('picker', { includeHiddenElements: true }),
    ).toBeNull();
    expect(StyleSheet.flatten(field.props.style).backgroundColor).toBe(
      lightTheme.colors.bg.subtle,
    );
  });

  it('shows the error text only with hasError', async () => {
    await renderSelect({ errorText: 'Required' });
    expect(screen.queryByText('Required')).toBeNull();

    await renderSelect({ errorText: 'Required', hasError: true });
    expect(
      StyleSheet.flatten(screen.getByText('Required').props.style).color,
    ).toBe(lightTheme.colors.text.error);
  });
});
