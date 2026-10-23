import { StyleSheet, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders illustration, title and description without requiring an action', async () => {
    await render(
      <EmptyState
        title="Nothing here"
        description="Add the first record"
        illustration={<View testID="illustration" />}
      />,
    );
    expect(screen.getByTestId('illustration')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByText('Nothing here').props.style),
    ).toMatchObject({
      ...lightTheme.typography.title.bold,
      color: lightTheme.colors.text.primary,
      textAlign: 'center',
    });
    expect(
      StyleSheet.flatten(screen.getByText('Add the first record').props.style),
    ).toMatchObject({
      ...lightTheme.typography.body.regular,
      color: lightTheme.colors.text.secondary,
    });
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders an action only when its callback is provided', async () => {
    const onAction = jest.fn();
    await render(
      <EmptyState
        title="Failed"
        actionTestID="empty.action"
        actionTitle="Retry"
        onAction={onAction}
      />,
    );
    const action = screen.getByRole('button', { name: 'Retry' });
    expect(action).toBe(screen.getByTestId('empty.action'));
    await fireEvent.press(action);
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(StyleSheet.flatten(action.props.style)).toMatchObject({
      height: 51,
      paddingHorizontal: lightTheme.space[8],
    });
  });

  it('hides the action when isActionVisible is false', async () => {
    await render(
      <EmptyState
        title="Failed"
        actionTitle="Retry"
        onAction={jest.fn()}
        isActionVisible={false}
      />,
    );
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('wraps illustration and texts when messageStyle is set', async () => {
    await render(
      <EmptyState
        title="Title"
        messageStyle={{ opacity: 0.5 }}
        illustration={<View testID="illustration" />}
      />,
    );
    const wrapper = screen.getByTestId('illustration').parent?.parent;
    expect(StyleSheet.flatten(wrapper?.props.style)).toMatchObject({
      opacity: 0.5,
    });
  });
});
