import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { SourceActionSheet } from './SourceActionSheet';

/** Style of the row view inside the button with this testID. */
const rowStyle = (testID: string) => {
  const row = screen.getByTestId(testID).children[0];
  if (!row || typeof row === 'string') {
    throw new Error(`row ${testID} not rendered`);
  }
  return StyleSheet.flatten(row.props.style);
};

const makeActions = () => [
  { id: 'camera', title: 'Camera', testID: 'camera', onPress: jest.fn() },
  {
    id: 'delete',
    title: 'Delete',
    testID: 'delete',
    isDanger: true,
    onPress: jest.fn(),
  },
];

describe('SourceActionSheet', () => {
  it('closes the sheet and runs the action', async () => {
    const calls: string[] = [];
    const onClose = jest.fn(() => calls.push('close'));
    const onCamera = jest.fn(() => calls.push('camera'));
    await render(
      <SourceActionSheet
        actions={[{ id: 'camera', title: 'Camera', onPress: onCamera }]}
        onClose={onClose}
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Camera' }));
    expect(calls).toEqual(['close', 'camera']);
  });

  it('keeps the sheet open when closeOnAction is off', async () => {
    const onClose = jest.fn();
    const onDelete = jest.fn();
    await render(
      <SourceActionSheet
        actions={[
          {
            id: 'delete',
            title: 'Delete',
            testID: 'delete',
            onPress: onDelete,
          },
        ]}
        onClose={onClose}
        closeOnAction={false}
      />,
    );
    await fireEvent.press(screen.getByTestId('delete'));
    expect(onClose).not.toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('does not run a disabled action', async () => {
    const onClose = jest.fn();
    const onPress = jest.fn();
    await render(
      <SourceActionSheet
        actions={[{ id: 'a', title: 'Gallery', isDisabled: true, onPress }]}
        onClose={onClose}
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Gallery' }));
    expect(onPress).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('draws dividers between list rows only', async () => {
    await render(
      <SourceActionSheet actions={makeActions()} onClose={jest.fn()} />,
    );
    expect(rowStyle('camera')).toMatchObject({
      borderBottomWidth: 1,
      borderBottomColor: lightTheme.colors.border.default,
    });
    expect(rowStyle('delete').borderBottomWidth).toBeUndefined();
  });

  it('spaces card rows by 8 without dividers', async () => {
    await render(
      <SourceActionSheet
        actions={makeActions()}
        onClose={jest.fn()}
        variant="card-source"
      />,
    );
    expect(rowStyle('camera')).toMatchObject({ marginBottom: 8 });
    expect(rowStyle('camera').borderBottomWidth).toBeUndefined();
    expect(rowStyle('delete').marginBottom).toBeUndefined();
  });
});
