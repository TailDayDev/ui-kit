import { Profiler } from 'react';
import { Text } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { DateRangeField } from './DateRangeField';
import type {
  DateRangeFieldEditorController,
  DateRangeValue,
} from './DateRangeField.types';

const INITIAL_VALUE: DateRangeValue = {
  startDate: '2026-06-01',
  endDate: '2026-09-01',
};

const NEXT_VALUE: DateRangeValue = {
  startDate: '2026-06-02',
  endDate: '2026-09-01',
};

const START_FIELD = {
  label: 'Start date',
  testID: 'date-range.start',
};

const END_FIELD = {
  label: 'End date',
  testID: 'date-range.end',
};

/** Captures the latest controller passed to `renderEditor`. */
const createEditorProbe = (renderClosedLabel = false) => {
  const probe: { current?: DateRangeFieldEditorController } = {};
  const renderEditor = (controller: DateRangeFieldEditorController) => {
    probe.current = controller;
    return renderClosedLabel ? (
      <Text>{controller.activeField ?? 'closed'}</Text>
    ) : null;
  };
  const getController = () => {
    if (!probe.current) {
      throw new Error('renderEditor was not called');
    }
    return probe.current;
  };
  return { getController, renderEditor };
};

describe('DateRangeField', () => {
  it('commits an uncontrolled draft and updates its rendered value', async () => {
    const onValueChange = jest.fn();
    const { getController, renderEditor } = createEditorProbe(true);
    await render(
      <DateRangeField
        defaultValue={INITIAL_VALUE}
        end={END_FIELD}
        onValueChange={onValueChange}
        renderEditor={renderEditor}
        start={START_FIELD}
      />,
    );

    await fireEvent.press(screen.getByTestId('date-range.start'));
    await act(async () => {
      getController().setFieldValue('start', NEXT_VALUE.startDate);
    });

    expect(getController().activeField).toBe('start');
    expect(getController().draftValue).toEqual(NEXT_VALUE);

    await act(async () => {
      getController().commit();
    });

    expect(onValueChange).toHaveBeenCalledWith(NEXT_VALUE);
    expect(getController().value).toEqual(NEXT_VALUE);
    expect(getController().activeField).toBeNull();
    expect(screen.getByText('2026-06-02')).toBeTruthy();
  });

  it('formats the latest committed uncontrolled value', async () => {
    const formatStartValue = jest.fn(
      (value: string | null) => `formatted:${value ?? 'empty'}`,
    );
    const { getController, renderEditor } = createEditorProbe();
    await render(
      <DateRangeField
        defaultValue={INITIAL_VALUE}
        end={END_FIELD}
        renderEditor={renderEditor}
        start={{ ...START_FIELD, formatValue: formatStartValue }}
      />,
    );

    await fireEvent.press(screen.getByTestId('date-range.start'));
    await act(async () => {
      getController().setFieldValue('start', NEXT_VALUE.startDate);
      getController().commit();
    });

    expect(screen.getByText('formatted:2026-06-02')).toBeTruthy();
    expect(formatStartValue).toHaveBeenLastCalledWith(NEXT_VALUE.startDate);
  });

  it('does not reformat the unrelated row for end-only draft changes', async () => {
    const formatStartValue = jest.fn(
      (value: string | null) => `start:${value ?? 'empty'}`,
    );
    const formatEndValue = jest.fn(
      (value: string | null) => `end:${value ?? 'empty'}`,
    );
    const { getController, renderEditor } = createEditorProbe();
    await render(
      <DateRangeField
        defaultValue={INITIAL_VALUE}
        end={{ ...END_FIELD, formatValue: formatEndValue }}
        renderEditor={renderEditor}
        start={{ ...START_FIELD, formatValue: formatStartValue }}
      />,
    );

    expect(formatStartValue).toHaveBeenCalledTimes(1);
    expect(formatEndValue).toHaveBeenCalledTimes(1);

    await fireEvent.press(screen.getByTestId('date-range.end'));
    await act(async () => {
      getController().setFieldValue('end', '2026-10-01');
    });

    expect(formatStartValue).toHaveBeenCalledTimes(1);
    expect(formatEndValue).toHaveBeenCalledTimes(1);

    await act(async () => {
      getController().commit();
    });

    expect(formatStartValue).toHaveBeenCalledTimes(1);
    expect(formatEndValue).toHaveBeenCalledTimes(2);
  });

  it('reports a controlled commit and waits for the parent value', async () => {
    const onValueChange = jest.fn();
    const { getController, renderEditor } = createEditorProbe();
    const { rerender } = await render(
      <DateRangeField
        end={END_FIELD}
        onValueChange={onValueChange}
        renderEditor={renderEditor}
        start={START_FIELD}
        value={INITIAL_VALUE}
      />,
    );

    await act(async () => {
      getController().setDraftValue(NEXT_VALUE);
    });
    await act(async () => {
      getController().commit();
    });

    expect(onValueChange).toHaveBeenCalledWith(NEXT_VALUE);
    expect(getController().value).toEqual(INITIAL_VALUE);

    await rerender(
      <DateRangeField
        end={END_FIELD}
        onValueChange={onValueChange}
        renderEditor={renderEditor}
        start={START_FIELD}
        value={NEXT_VALUE}
      />,
    );

    expect(getController().value).toEqual(NEXT_VALUE);
  });

  it('uses defaultValue only for uncontrolled initialization', async () => {
    const { getController, renderEditor } = createEditorProbe();
    const { rerender } = await render(
      <DateRangeField
        defaultValue={INITIAL_VALUE}
        end={END_FIELD}
        renderEditor={renderEditor}
        start={START_FIELD}
      />,
    );

    await rerender(
      <DateRangeField
        defaultValue={NEXT_VALUE}
        end={END_FIELD}
        renderEditor={renderEditor}
        start={START_FIELD}
      />,
    );

    expect(getController().value).toEqual(INITIAL_VALUE);
  });

  it('commits a draft field update made in the same callback', async () => {
    const onValueChange = jest.fn();
    const { getController, renderEditor } = createEditorProbe();
    await render(
      <DateRangeField
        defaultValue={INITIAL_VALUE}
        end={END_FIELD}
        onValueChange={onValueChange}
        renderEditor={renderEditor}
        start={START_FIELD}
      />,
    );

    await fireEvent.press(screen.getByTestId('date-range.start'));
    await act(async () => {
      getController().setFieldValue('start', NEXT_VALUE.startDate);
      getController().commit();
    });

    expect(onValueChange).toHaveBeenCalledWith(NEXT_VALUE);
    expect(getController().value).toEqual(NEXT_VALUE);
  });

  it('supports externally controlled active field and cancel', async () => {
    const onActiveFieldChange = jest.fn();
    const onFieldPress = jest.fn();
    const { getController, renderEditor } = createEditorProbe();
    const { rerender } = await render(
      <DateRangeField
        activeField={null}
        end={END_FIELD}
        onActiveFieldChange={onActiveFieldChange}
        onFieldPress={onFieldPress}
        renderEditor={renderEditor}
        start={START_FIELD}
        value={INITIAL_VALUE}
      />,
    );

    await fireEvent.press(screen.getByTestId('date-range.end'));

    expect(onActiveFieldChange).toHaveBeenCalledWith('end');
    expect(onFieldPress).toHaveBeenCalledWith('end');
    expect(getController().activeField).toBeNull();

    await rerender(
      <DateRangeField
        activeField="end"
        end={END_FIELD}
        onActiveFieldChange={onActiveFieldChange}
        onFieldPress={onFieldPress}
        renderEditor={renderEditor}
        start={START_FIELD}
        value={INITIAL_VALUE}
      />,
    );

    expect(getController().activeField).toBe('end');

    await act(async () => {
      getController().cancel();
    });

    expect(onActiveFieldChange).toHaveBeenLastCalledWith(null);
  });

  it('uses the latest controlled value on the first externally opened render', async () => {
    const renderedDrafts: DateRangeValue[] = [];
    const renderEditor = (controller: DateRangeFieldEditorController) => {
      renderedDrafts.push(controller.draftValue);
      return null;
    };
    const { rerender } = await render(
      <DateRangeField
        activeField={null}
        end={END_FIELD}
        renderEditor={renderEditor}
        start={START_FIELD}
        value={INITIAL_VALUE}
      />,
    );
    renderedDrafts.length = 0;

    await rerender(
      <DateRangeField
        activeField="start"
        end={END_FIELD}
        renderEditor={renderEditor}
        start={START_FIELD}
        value={NEXT_VALUE}
      />,
    );

    expect(renderedDrafts[0]).toEqual(NEXT_VALUE);
    expect(renderedDrafts).not.toContainEqual(INITIAL_VALUE);
  });

  it('emits controlled value and close requests without mutating controlled state', async () => {
    const onActiveFieldChange = jest.fn();
    const onValueChange = jest.fn();
    const { getController, renderEditor } = createEditorProbe();
    await render(
      <DateRangeField
        activeField="start"
        end={END_FIELD}
        onActiveFieldChange={onActiveFieldChange}
        onValueChange={onValueChange}
        renderEditor={renderEditor}
        start={START_FIELD}
        value={INITIAL_VALUE}
      />,
    );

    await act(async () => {
      getController().commit(NEXT_VALUE);
    });

    expect(onValueChange).toHaveBeenCalledWith(NEXT_VALUE);
    expect(onActiveFieldChange).toHaveBeenCalledWith(null);
    expect(getController().value).toEqual(INITIAL_VALUE);
    expect(getController().activeField).toBe('start');
  });

  it('does not track an invisible active lifecycle for onFieldPress only', async () => {
    const onFieldPress = jest.fn();
    const onRender = jest.fn();
    await render(
      <Profiler id="date-range" onRender={onRender}>
        <DateRangeField
          defaultValue={INITIAL_VALUE}
          end={END_FIELD}
          onFieldPress={onFieldPress}
          start={START_FIELD}
        />
      </Profiler>,
    );
    const renderCount = onRender.mock.calls.length;

    await fireEvent.press(screen.getByTestId('date-range.start'));

    expect(onFieldPress).toHaveBeenCalledWith('start');
    expect(onRender).toHaveBeenCalledTimes(renderCount);
  });

  it('puts an accessibility label on the single row press owner', async () => {
    await render(
      <DateRangeField
        defaultValue={INITIAL_VALUE}
        end={{ ...END_FIELD, accessibilityLabel: 'Choose end date' }}
        start={START_FIELD}
      />,
    );

    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(
      screen.getByRole('button', { name: 'Start date' }).props.testID,
    ).toBe('date-range.start');
    expect(
      screen.getByRole('button', { name: 'Choose end date' }).props.testID,
    ).toBe('date-range.end');
  });

  it('does not expose press owners for disabled or read-only fields', async () => {
    const { rerender } = await render(
      <DateRangeField
        defaultValue={INITIAL_VALUE}
        end={END_FIELD}
        isDisabled
        start={START_FIELD}
      />,
    );
    expect(screen.queryAllByRole('button')).toHaveLength(0);

    await rerender(
      <DateRangeField
        defaultValue={INITIAL_VALUE}
        end={{ ...END_FIELD, affordanceTestID: 'end.chevron' }}
        isReadOnly
        start={START_FIELD}
      />,
    );
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(
      screen.queryByTestId('end.chevron', { includeHiddenElements: true }),
    ).toBeNull();

    await rerender(
      <DateRangeField
        defaultValue={INITIAL_VALUE}
        end={END_FIELD}
        start={{ ...START_FIELD, isDisabled: true }}
      />,
    );
    expect(screen.queryAllByRole('button')).toHaveLength(1);
  });

  it('shows emptyValue when there is no date', async () => {
    await render(
      <DateRangeField
        end={{ ...END_FIELD, emptyValue: 'Not set' }}
        start={{ ...START_FIELD, displayValue: 'June 1' }}
      />,
    );
    expect(screen.getByText('June 1')).toBeTruthy();
    expect(screen.getByText('Not set')).toBeTruthy();
  });

  it('warns when value changes between uncontrolled and controlled mode', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { rerender } = await render(
      <DateRangeField
        defaultValue={INITIAL_VALUE}
        end={END_FIELD}
        start={START_FIELD}
      />,
    );

    await rerender(
      <DateRangeField end={END_FIELD} start={START_FIELD} value={NEXT_VALUE} />,
    );

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('changed value from uncontrolled to controlled'),
    );
    warnSpy.mockRestore();
  });
});
