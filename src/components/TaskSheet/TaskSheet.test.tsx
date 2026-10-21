import { View } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { IconCalendarDays, IconUndo2 } from '../../icons/figma';
import { ModalLayerTestRoot, resetModalLayersForTests } from '../ModalLayer';
import { TaskSheet } from './TaskSheet';
import type { TaskSheetProps, TaskSheetRowItem } from './TaskSheet.types';

const makeRows = (count: number): TaskSheetRowItem[] =>
  Array.from({ length: count }, (_, index) => ({
    key: `row-${index}`,
    label: `Action ${index + 1}`,
    icon: index % 2 === 0 ? IconCalendarDays : IconUndo2,
    onPress: jest.fn(),
    testID: `row-${index}`,
  }));

const renderSheet = (props: Partial<TaskSheetProps> = {}) =>
  render(
    <TaskSheet
      isVisible
      rows={makeRows(1)}
      closeAccessibilityLabel="Close"
      closeTestID="task-sheet-close"
      testID="task-sheet"
      onClose={jest.fn()}
      {...props}
    />,
    { wrapper: ModalLayerTestRoot },
  );

describe('TaskSheet', () => {
  afterEach(async () => {
    await act(() => {
      resetModalLayersForTests();
    });
  });

  it.each([1, 2, 3])('renders rows=%i', async count => {
    await renderSheet({ rows: makeRows(count) });

    expect(screen.getAllByRole('button', { name: /^Action/ })).toHaveLength(
      count,
    );
  });

  it('renders nothing while not visible', async () => {
    await renderSheet({ isVisible: false });

    expect(screen.queryByText('Action 1')).toBeNull();
  });

  it('shows the close button without a title by default (Figma hasTitle=false)', async () => {
    await renderSheet();

    expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy();
    expect(screen.queryByRole('header')).toBeNull();
  });

  it('shows the title when given', async () => {
    await renderSheet({ title: 'Feeding' });

    expect(screen.getByRole('header', { name: 'Feeding' })).toBeTruthy();
  });

  it('sends a close request from the close button', async () => {
    const onClose = jest.fn();
    await renderSheet({ onClose });

    await fireEvent.press(screen.getByTestId('task-sheet-close'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls the row action on press', async () => {
    const onFirst = jest.fn();
    const onSecond = jest.fn();
    await renderSheet({
      rows: [
        { key: 'a', label: 'Action 1', onPress: onFirst },
        { key: 'b', label: 'Action 2', onPress: onSecond },
      ],
    });

    await fireEvent.press(screen.getByText('Action 2'));

    expect(onSecond).toHaveBeenCalledTimes(1);
    expect(onFirst).not.toHaveBeenCalled();
  });

  it('does not call a disabled row', async () => {
    const onPress = jest.fn();
    await renderSheet({
      rows: [
        { key: 'skip', label: 'Skip', onPress, disabled: true, testID: 'skip' },
      ],
    });

    const row = screen.getByRole('button', { name: 'Skip' });
    expect(row.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true }),
    );
    await fireEvent.press(row);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('puts a destructive row in the separate block', async () => {
    await renderSheet({
      rows: [
        ...makeRows(1),
        {
          key: 'delete',
          label: 'Delete',
          onPress: jest.fn(),
          isDestructive: true,
        },
      ],
    });

    expect(screen.getByTestId('task-sheet.destructive')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeTruthy();
  });

  it('disables the close button while locked', async () => {
    const onClose = jest.fn();
    await renderSheet({ onClose, isLocked: true });

    await fireEvent.press(screen.getByTestId('task-sheet-close'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('blocks the close button while replaced by another sheet', async () => {
    const onClose = jest.fn();
    await renderSheet({ onClose, isReplaced: true });

    await fireEvent.press(screen.getByTestId('task-sheet-close'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders nested overlays inside its layer', async () => {
    await renderSheet({ nestedOverlays: <View testID="nested" /> });

    expect(screen.getByTestId('nested')).toBeTruthy();
  });
});
