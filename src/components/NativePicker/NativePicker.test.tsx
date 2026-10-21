import { useState } from 'react';
import { StyleSheet } from 'react-native';
import type ReactModule from 'react';
import type * as ReactNativeModule from 'react-native';
import { act, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { CustomModal } from '../CustomModal';
import { ModalLayerTestRoot, resetModalLayersForTests } from '../ModalLayer';
import { NativePicker } from './NativePicker';

/** Every `selectedValue` the native picker got, in render order. */
const mockRenderedValues: unknown[] = [];

jest.mock('@react-native-picker/picker', () => {
  const ReactActual = jest.requireActual<typeof ReactModule>('react');
  const { View } = jest.requireActual<typeof ReactNativeModule>('react-native');
  const Picker = (props: Record<string, unknown>) => {
    mockRenderedValues.push(props.selectedValue);
    return ReactActual.createElement(View, { ...props, testID: 'picker' });
  };
  Picker.Item = (props: { label: string; color?: string }) =>
    ReactActual.createElement(View, {
      testID: 'picker-item',
      accessibilityLabel: props.label,
      accessibilityHint: props.color,
    });
  return { Picker };
});

const ITEMS = ['09', '10', '11'].map(value => ({ label: value, value }));

let resetHour: () => void = () => undefined;

interface IHarnessProps {
  isAccepting: boolean;
  /** The picker sits in a modal opened from another modal. */
  isNested?: boolean;
}

/** Owns the value like SelectTimeModal: the picker renders in a modal. */
const Harness = ({ isAccepting, isNested = false }: IHarnessProps) => {
  const [hour, setHour] = useState('09');
  resetHour = () => setHour('09');

  const pickerModal = (
    <CustomModal visible modalKey="NativePickerTest" onClose={jest.fn()}>
      <NativePicker
        items={ITEMS}
        selectedValue={hour}
        onValueChange={next => {
          if (isAccepting) {
            setHour(next);
          }
        }}
      />
    </CustomModal>
  );

  return isNested ? (
    <CustomModal visible modalKey="NativePickerParent" onClose={jest.fn()}>
      {pickerModal}
    </CustomModal>
  ) : (
    pickerModal
  );
};

const getPicker = () =>
  screen.getByTestId('picker', { includeHiddenElements: true });

/** Runs the frame callback that ends the echo. */
const endFrame = () =>
  act(() => {
    jest.runOnlyPendingTimers();
  });

const renderHarness = async (isAccepting: boolean, isNested = false) => {
  await render(<Harness isAccepting={isAccepting} isNested={isNested} />, {
    wrapper: ModalLayerTestRoot,
  });
  const pick = async (value: string) => {
    mockRenderedValues.length = 0;
    await act(() => {
      getPicker().props.onValueChange(value, 0);
    });
  };
  const shownValue = () => getPicker().props.selectedValue;

  return { pick, shownValue };
};

describe('NativePicker', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    await act(() => {
      resetModalLayersForTests();
    });
    jest.useRealTimers();
  });

  it('renders every item in the primary text color with a centered iOS row', async () => {
    await render(
      <NativePicker
        items={[...ITEMS, { label: 'red', value: 'red', color: 'red' }]}
        selectedValue="10"
        onValueChange={jest.fn()}
        accessibilityLabel="Hour"
      />,
    );

    const items = screen.getAllByTestId('picker-item', {
      includeHiddenElements: true,
    });
    expect(items.map(item => item.props.accessibilityLabel)).toEqual([
      '09',
      '10',
      '11',
      'red',
    ]);
    expect(items[0]?.props.accessibilityHint).toBe(
      lightTheme.colors.text.primary,
    );
    expect(items[3]?.props.accessibilityHint).toBe('red');
    expect(StyleSheet.flatten(getPicker().props.itemStyle)).toMatchObject({
      color: lightTheme.colors.text.primary,
      textAlign: 'center',
    });
    expect(getPicker().props.accessibilityLabel).toBe('Hour');
  });

  it('reports the picked value and index', async () => {
    const onValueChange = jest.fn();
    await render(
      <NativePicker
        items={ITEMS}
        selectedValue="09"
        onValueChange={onValueChange}
      />,
    );

    await act(() => {
      getPicker().props.onValueChange('11', 2);
    });

    expect(onValueChange).toHaveBeenCalledWith('11', 2);
  });

  it.each([
    ['a modal', false],
    ['a modal opened from a modal', true],
  ])(
    'never hands the picker the old value after a pick in %s',
    async (_, isNested) => {
      const { pick, shownValue } = await renderHarness(true, isNested);

      await pick('11');
      await endFrame();

      // Modal content gets the owner's value a commit later per level; the
      // picker must not see '09' meanwhile, or the native wheel snaps back.
      expect(mockRenderedValues).not.toContain('09');
      expect(shownValue()).toBe('11');
    },
  );

  it('shows the owner value again after a reset to the old value', async () => {
    const { pick, shownValue } = await renderHarness(true);

    await pick('11');
    await endFrame();
    await act(() => {
      resetHour();
    });

    expect(shownValue()).toBe('09');
  });

  it('rolls the wheel back when the owner rejects the pick', async () => {
    const { pick, shownValue } = await renderHarness(false);

    await pick('11');
    await endFrame();

    expect(shownValue()).toBe('09');
  });
});
