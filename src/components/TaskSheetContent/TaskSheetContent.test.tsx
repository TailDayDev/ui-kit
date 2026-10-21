import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { TaskSheetContent } from './TaskSheetContent';
import type { TaskSheetContentRow } from './TaskSheetContent.types';

const makeRows = (count: number, onPress = jest.fn()): TaskSheetContentRow[] =>
  Array.from({ length: count }, (_, index) => ({
    key: `row${index + 1}`,
    label: `Row ${index + 1}`,
    onPress,
  }));

describe('TaskSheetContent', () => {
  it.each([1, 2, 3])('renders rows=%i as buttons', async count => {
    await render(<TaskSheetContent rows={makeRows(count)} />);
    expect(screen.getAllByRole('button')).toHaveLength(count);
  });

  it('has the Figma padding: 24 sides, 20 bottom', async () => {
    await render(<TaskSheetContent testID="sheet" rows={makeRows(1)} />);
    expect(
      StyleSheet.flatten(screen.getByTestId('sheet').props.style),
    ).toMatchObject({ paddingBottom: 20, paddingHorizontal: 24 });
  });

  it('hides the destructive block without a destructive row', async () => {
    await render(<TaskSheetContent testID="sheet" rows={makeRows(2)} />);
    expect(screen.queryByTestId('sheet.destructive')).toBeNull();
  });

  it('puts destructive rows last, 52pt below the actions', async () => {
    const onDelete = jest.fn();
    await render(
      <TaskSheetContent
        testID="sheet"
        rows={[
          {
            key: 'delete',
            label: 'Delete',
            onPress: onDelete,
            isDestructive: true,
          },
          ...makeRows(2),
        ]}
      />,
    );
    const labels = screen
      .getAllByRole('button')
      .map(button => button.props.accessibilityLabel);
    expect(labels).toEqual(['Row 1', 'Row 2', 'Delete']);
    expect(
      StyleSheet.flatten(screen.getByTestId('sheet.destructive').props.style),
    ).toMatchObject({ paddingTop: 52 });
    await fireEvent.press(screen.getByRole('button', { name: 'Delete' }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('calls each row callback and respects disabled rows', async () => {
    const onPress = jest.fn();
    const onDisabled = jest.fn();
    await render(
      <TaskSheetContent
        rows={[
          { key: 'a', label: 'Skip', onPress },
          { key: 'b', label: 'Edit', onPress: onDisabled, disabled: true },
        ]}
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Skip' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Edit' }));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onDisabled).not.toHaveBeenCalled();
  });
});
