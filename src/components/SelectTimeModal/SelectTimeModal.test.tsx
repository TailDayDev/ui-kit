import type { ComponentProps } from 'react';
import type ReactModule from 'react';
import type * as ReactNativeModule from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { ModalLayerTestRoot, resetModalLayersForTests } from '../ModalLayer';
import { SELECT_TIME_MODAL_TEST_IDS, SelectTimeModal } from './SelectTimeModal';

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

type Props = ComponentProps<typeof SelectTimeModal>;

const HIDDEN = { includeHiddenElements: true };

const getByTestId = (testID: string) => screen.getByTestId(testID, HIDDEN);

/** Native wheel columns: hour, minutes (, am/pm). */
const getColumns = () => screen.getAllByTestId('picker', HIDDEN);

const pickInColumn = async (columnIndex: number, value: string) => {
  await act(() => {
    getColumns()[columnIndex]?.props.onValueChange(value, 0);
  });
  // The picker echoes the native value for one frame; let that frame finish inside act.
  await act(() => new Promise(resolve => setTimeout(resolve, 0)));
};

/** Turns the wheel to 15:30. */
const changeTime = async () => {
  await pickInColumn(0, '15');
  await pickInColumn(1, '30');
};

const press = (testID: string) => fireEvent.press(getByTestId(testID));

const isDisabled = (testID: string) =>
  getByTestId(testID).props.accessibilityState?.disabled === true;

const isBusy = (testID: string) =>
  getByTestId(testID).props.accessibilityState?.busy === true;

const mockUnsavedCloseRequest = jest.fn((discard: () => void) => discard());

const renderModal = async (props: Partial<Props> = {}) => {
  const onSave = jest.fn();
  const onClose = jest.fn();
  const element = (overrides: Partial<Props> = {}) => (
    <SelectTimeModal
      isVisible
      title="check_in_time"
      defaultTime="14:00"
      defaultFormat={null}
      resetLabel="reset"
      saveLabel="save"
      onSave={onSave}
      onClose={onClose}
      onUnsavedCloseRequest={mockUnsavedCloseRequest}
      {...props}
      {...overrides}
    />
  );
  const result = await render(element(), { wrapper: ModalLayerTestRoot });
  const rerender = (overrides: Partial<Props>) =>
    result.rerender(element(overrides));
  return { onSave, onClose, rerender };
};

beforeEach(() => {
  mockUnsavedCloseRequest.mockReset();
  // A confirmation is answered with "discard" right away.
  mockUnsavedCloseRequest.mockImplementation(discard => discard());
});

afterEach(async () => {
  await act(() => {
    resetModalLayersForTests();
  });
});

describe('SelectTimeModal rendering', () => {
  it('shows the title, the 24h wheel and the labelled buttons', async () => {
    await renderModal();

    expect(screen.getByText('check_in_time')).toBeTruthy();
    expect(getByTestId(SELECT_TIME_MODAL_TEST_IDS.wheel)).toBeTruthy();
    expect(getColumns()).toHaveLength(2);
    expect(getColumns()[0]?.props.selectedValue).toBe('14');
    expect(screen.getByRole('button', { name: 'reset' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'save' })).toBeTruthy();
  });

  it('adds the am/pm column in 12h mode', async () => {
    await renderModal({ hourFormat: '12h', defaultFormat: 'pm' });

    expect(getColumns()).toHaveLength(3);
    expect(getColumns()[2]?.props.selectedValue).toBe('pm');
  });
});

describe('SelectTimeModal saving (WP-DATES-TIME-LOADING-01)', () => {
  it('still closes after Save when isSaving is omitted', async () => {
    const { onSave, onClose } = await renderModal();

    await changeTime();
    await press(SELECT_TIME_MODAL_TEST_IDS.save);

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith({ time: '15:30', format: null });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close after Save when the parent passes isSaving', async () => {
    const { onSave, onClose } = await renderModal({ isSaving: false });

    await changeTime();
    await press(SELECT_TIME_MODAL_TEST_IDS.save);

    expect(onSave).toHaveBeenCalledWith({ time: '15:30', format: null });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('locks Save/Reset/close while isSaving', async () => {
    const { onSave, onClose } = await renderModal({ isSaving: true });

    expect(isDisabled(SELECT_TIME_MODAL_TEST_IDS.save)).toBe(true);
    expect(isDisabled(SELECT_TIME_MODAL_TEST_IDS.reset)).toBe(true);
    expect(getByTestId(SELECT_TIME_MODAL_TEST_IDS.close)).toBeDisabled();

    await press(SELECT_TIME_MODAL_TEST_IDS.close);

    expect(onSave).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('SelectTimeModal discard close (WP-DATES-TIME-DISCARD-01)', () => {
  it('asks for unsaved confirmation on dirty X when the flag is omitted', async () => {
    mockUnsavedCloseRequest.mockImplementation(() => undefined);
    const { onSave, onClose } = await renderModal();

    await changeTime();
    await press(SELECT_TIME_MODAL_TEST_IDS.close);

    expect(mockUnsavedCloseRequest).toHaveBeenCalledTimes(1);
    expect(mockUnsavedCloseRequest).toHaveBeenCalledWith(onClose);
    expect(onClose).not.toHaveBeenCalled();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('closes once after a confirmed discard', async () => {
    const { onSave, onClose } = await renderModal();

    await changeTime();
    await press(SELECT_TIME_MODAL_TEST_IDS.close);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onSave).not.toHaveBeenCalled();
  });

  it('closes once without confirmation when nothing changed', async () => {
    const { onClose } = await renderModal();

    await press(SELECT_TIME_MODAL_TEST_IDS.close);

    expect(mockUnsavedCloseRequest).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes at once when the owner gives no confirmation handler', async () => {
    const { onClose } = await renderModal({
      onUnsavedCloseRequest: undefined,
    });

    await changeTime();
    await press(SELECT_TIME_MODAL_TEST_IDS.close);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes immediately without confirmation or save when confirm is disabled', async () => {
    const { onSave, onClose } = await renderModal({
      isUnsavedCloseConfirmEnabled: false,
    });

    await changeTime();
    await press(SELECT_TIME_MODAL_TEST_IDS.close);

    expect(mockUnsavedCloseRequest).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onSave).not.toHaveBeenCalled();
  });

  it('keeps X dead while saving even when confirm is disabled', async () => {
    const { onSave, onClose } = await renderModal({
      isSaving: true,
      isUnsavedCloseConfirmEnabled: false,
    });

    await press(SELECT_TIME_MODAL_TEST_IDS.close);

    expect(mockUnsavedCloseRequest).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
    expect(onSave).not.toHaveBeenCalled();
  });
});

describe('SelectTimeModal reset', () => {
  it('closes without clearing when there is no previous time', async () => {
    const onClear = jest.fn();
    const { onSave, onClose } = await renderModal({
      defaultTime: undefined,
      onClear,
    });

    await changeTime();
    await press(SELECT_TIME_MODAL_TEST_IDS.reset);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClear).not.toHaveBeenCalled();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('restores the previous time first, then clears and closes', async () => {
    const onClear = jest.fn();
    const { onClose } = await renderModal({ onClear });

    await changeTime();
    expect(isDisabled(SELECT_TIME_MODAL_TEST_IDS.save)).toBe(false);
    await press(SELECT_TIME_MODAL_TEST_IDS.reset);

    expect(isDisabled(SELECT_TIME_MODAL_TEST_IDS.save)).toBe(true);
    expect(getColumns()[0]?.props.selectedValue).toBe('14');
    expect(onClear).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();

    await press(SELECT_TIME_MODAL_TEST_IDS.reset);

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('SelectTimeModal fallback time', () => {
  it('shows the fallback time when there is no time and lets save it as-is', async () => {
    const { onSave } = await renderModal({
      defaultTime: undefined,
      fallbackTime: '19:00',
    });

    expect(isDisabled(SELECT_TIME_MODAL_TEST_IDS.save)).toBe(false);
    await press(SELECT_TIME_MODAL_TEST_IDS.save);

    expect(onSave).toHaveBeenCalledWith({ time: '19:00', format: null });
  });

  it('prefers the existing time over the fallback', async () => {
    await renderModal({ fallbackTime: '09:00' });

    expect(isDisabled(SELECT_TIME_MODAL_TEST_IDS.save)).toBe(true);
  });
});

describe('SelectTimeModal async clear', () => {
  it('waits for the server before closing and locks the modal meanwhile', async () => {
    let resolveClear: (value: boolean) => void = () => undefined;
    const onClear = jest.fn(
      () =>
        new Promise<boolean>(resolve => {
          resolveClear = resolve;
        }),
    );
    const { onClose, rerender } = await renderModal({ onClear });

    await press(SELECT_TIME_MODAL_TEST_IDS.reset);

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
    expect(isDisabled(SELECT_TIME_MODAL_TEST_IDS.reset)).toBe(true);
    expect(getByTestId(SELECT_TIME_MODAL_TEST_IDS.close)).toBeDisabled();

    // Parent marks the modal as saving while the clear request runs.
    await rerender({ isSaving: true });
    expect(isBusy(SELECT_TIME_MODAL_TEST_IDS.reset)).toBe(true);
    expect(isBusy(SELECT_TIME_MODAL_TEST_IDS.save)).toBe(false);

    await act(async () => {
      resolveClear(true);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('stays open when the server clear fails', async () => {
    const onClear = jest.fn(() => Promise.resolve(false));
    const { onClose } = await renderModal({ onClear });

    await press(SELECT_TIME_MODAL_TEST_IDS.reset);

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
    expect(isDisabled(SELECT_TIME_MODAL_TEST_IDS.reset)).toBe(false);
  });
});

describe('SelectTimeModal fallback edge cases', () => {
  it('ignores defaultFormat for the 24h fallback in 12h mode', async () => {
    const { onSave } = await renderModal({
      hourFormat: '12h',
      defaultTime: '',
      defaultFormat: 'pm',
      fallbackTime: '09:00',
    });

    await press(SELECT_TIME_MODAL_TEST_IDS.save);

    // A stale 'pm' must not turn the 09:00 default into 21:00.
    expect(onSave).toHaveBeenCalledWith({ time: '09:00', format: 'am' });
  });

  it('treats an unparseable saved time as missing', async () => {
    const onClear = jest.fn();
    const { onSave, onClose } = await renderModal({
      defaultTime: 'not-a-time',
      fallbackTime: '19:00',
      onClear,
    });

    await press(SELECT_TIME_MODAL_TEST_IDS.save);
    expect(onSave).toHaveBeenCalledWith({ time: '19:00', format: null });

    await press(SELECT_TIME_MODAL_TEST_IDS.reset);
    expect(onClear).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});

describe('time wheel modal without a parent scroll responder', () => {
  it.each(['check_in_time', 'check_out_time'])(
    '%s keeps wheel changes, reset and save working without a ScrollView',
    async title => {
      const { onSave, onClose } = await renderModal({ title });
      const findScrollViews = () =>
        screen.container.queryAll(node => node.type === 'RCTScrollView');

      expect(findScrollViews()).toHaveLength(0);
      expect(isDisabled(SELECT_TIME_MODAL_TEST_IDS.save)).toBe(true);
      await changeTime();
      expect(isDisabled(SELECT_TIME_MODAL_TEST_IDS.save)).toBe(false);
      await press(SELECT_TIME_MODAL_TEST_IDS.reset);
      expect(getColumns().map(column => column.props.selectedValue)).toEqual([
        '14',
        '00',
      ]);
      await changeTime();
      await press(SELECT_TIME_MODAL_TEST_IDS.save);
      expect(onSave).toHaveBeenCalledWith({ time: '15:30', format: null });
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(findScrollViews()).toHaveLength(0);
    },
  );
});
