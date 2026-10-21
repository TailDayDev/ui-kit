import { createRef } from 'react';
import { Text, type View } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { ModalLayerTestRoot, resetModalLayersForTests } from '../ModalLayer';
import { AdditionalNotes } from './AdditionalNotes';
import type { AdditionalNotesProps } from './AdditionalNotes.types';
import { useAdditionalNotes } from './AdditionalNotesContext';

const TITLE = 'Additional instructions';
const PLACEHOLDER = 'E.g. feed twice a day';

const renderNotes = (props: Partial<AdditionalNotesProps> = {}) => {
  const setValue = jest.fn();
  const baseProps = {
    value: '',
    setValue,
    title: TITLE,
    placeholder: PLACEHOLDER,
  };
  return {
    setValue,
    result: render(
      <AdditionalNotes {...baseProps} {...(props as AdditionalNotesProps)} />,
      { wrapper: ModalLayerTestRoot },
    ),
  };
};

const modalProps = {
  editMode: 'modal',
  cancelLabel: 'Cancel',
  saveLabel: 'Save',
} as const;

describe('AdditionalNotes inline', () => {
  it('renders the title and an editable field', async () => {
    const { setValue, result } = renderNotes({ maxLength: 130 });
    await result;

    expect(screen.getByText(TITLE)).toBeTruthy();
    expect(screen.getByText('0/130')).toBeTruthy();
    await fireEvent.changeText(
      screen.getByPlaceholderText(PLACEHOLDER),
      'Allergic to chicken',
    );
    expect(setValue).toHaveBeenCalledWith('Allergic to chicken');
  });

  it('prefers onValueChange over setValue', async () => {
    const onValueChange = jest.fn();
    const { setValue, result } = renderNotes({ onValueChange });
    await result;

    await fireEvent.changeText(screen.getByPlaceholderText(PLACEHOLDER), 'a');
    expect(onValueChange).toHaveBeenCalledWith('a');
    expect(setValue).not.toHaveBeenCalled();
  });

  it('forwards focus callbacks and exposes the field anchor', async () => {
    const fieldRef = createRef<View>();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onInputFocus = jest.fn();
    const { result } = renderNotes({ fieldRef, onFocus, onBlur, onInputFocus });
    await result;

    const input = screen.getByPlaceholderText(PLACEHOLDER);
    await fireEvent(input, 'focus');
    await fireEvent(input, 'blur');

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onInputFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalled();
    expect(fieldRef.current).not.toBeNull();
  });

  it('shows the footer text', async () => {
    const { result } = renderNotes({ footerText: 'Visible to staff only' });
    await result;
    expect(screen.getByText('Visible to staff only')).toBeTruthy();
  });

  it('disables the field', async () => {
    const { result } = renderNotes({ disabled: true });
    await result;
    expect(screen.getByPlaceholderText(PLACEHOLDER).props.editable).toBe(false);
  });

  it('shows text instead of a field when read-only', async () => {
    const { result } = renderNotes({ readOnly: true, value: 'Walk at 8' });
    await result;
    expect(screen.getByText('Walk at 8')).toBeTruthy();
    expect(screen.queryByPlaceholderText(PLACEHOLDER)).toBeNull();
  });

  it('shows the placeholder when read-only and empty', async () => {
    const { result } = renderNotes({ readOnly: true, value: '  ' });
    await result;
    expect(screen.getByText(PLACEHOLDER)).toBeTruthy();
  });
});

describe('AdditionalNotes modal', () => {
  afterEach(async () => {
    await act(() => {
      resetModalLayersForTests();
    });
  });

  it('shows the preview placeholder while empty', async () => {
    const { result } = renderNotes({
      ...modalProps,
      previewPlaceholder: 'Tap to add',
    });
    await result;
    expect(screen.getByText('Tap to add')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Save' })).toBeNull();
  });

  it('opens the sheet, saves the draft and closes', async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    const { setValue, result } = renderNotes({
      ...modalProps,
      value: 'Old',
      onSave,
    });
    await result;

    await fireEvent.press(screen.getByText('Old'));
    await fireEvent.changeText(screen.getByLabelText(TITLE), 'New');
    await fireEvent(screen.getByRole('button', { name: 'Save' }), 'pressIn');

    expect(onSave).toHaveBeenCalledWith('New');
    expect(setValue).toHaveBeenCalledWith('New');
    expect(screen.queryByRole('button', { name: 'Save' })).toBeNull();
  });

  it('keeps the sheet open when onSave rejects', async () => {
    const onSave = jest.fn().mockRejectedValue(new Error('offline'));
    const { setValue, result } = renderNotes({ ...modalProps, onSave });
    await result;

    await fireEvent.press(screen.getByText(PLACEHOLDER));
    await fireEvent(screen.getByRole('button', { name: 'Save' }), 'pressIn');

    expect(setValue).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Save' })).toBeTruthy();
  });

  it('cancel closes without changing the value', async () => {
    const { setValue, result } = renderNotes(modalProps);
    await result;

    await fireEvent.press(screen.getByText(PLACEHOLDER));
    await fireEvent.changeText(screen.getByLabelText(TITLE), 'Draft');
    await fireEvent(screen.getByRole('button', { name: 'Cancel' }), 'pressIn');

    expect(setValue).not.toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: 'Save' })).toBeNull();
  });

  it('does not open while disabled', async () => {
    const { result } = renderNotes({ ...modalProps, disabled: true });
    await result;

    await fireEvent.press(screen.getByText(PLACEHOLDER));
    expect(screen.queryByRole('button', { name: 'Save' })).toBeNull();
  });

  it('shows a busy, disabled Save while saving', async () => {
    const { result } = renderNotes({ ...modalProps, isSaving: true });
    await result;

    await fireEvent.press(screen.getByText(PLACEHOLDER));
    const save = screen.getByRole('button', { name: 'Save' });
    expect(save).toBeDisabled();
    expect(save).toBeBusy();
  });
});

describe('AdditionalNotes compound API', () => {
  it('Field reads the Provider and useAdditionalNotes exposes the context', async () => {
    const Probe = () => {
      const { value } = useAdditionalNotes();
      return <Text>{`probe:${value}`}</Text>;
    };
    await render(
      <AdditionalNotes.Provider
        value="Shared"
        title={TITLE}
        placeholder={PLACEHOLDER}
      >
        <Probe />
        <AdditionalNotes.Field />
      </AdditionalNotes.Provider>,
    );
    expect(screen.getByText('probe:Shared')).toBeTruthy();
    expect(screen.getByDisplayValue('Shared')).toBeTruthy();
  });

  it('useAdditionalNotes throws outside the Provider', async () => {
    const Probe = () => {
      useAdditionalNotes();
      return null;
    };
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    await expect(render(<Probe />)).rejects.toThrow(
      'useAdditionalNotes must be used within AdditionalNotesProvider',
    );
    consoleError.mockRestore();
  });
});
