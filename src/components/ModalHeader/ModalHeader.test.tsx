import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ModalHeader } from './ModalHeader';

describe('ModalHeader', () => {
  it('renders the Figma frame: padding 12/12/12/56, gap 8, top radius 24, white', async () => {
    await render(
      <ModalHeader
        testID="header"
        title="Title"
        onClose={jest.fn()}
        closeAccessibilityLabel="Close"
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('header').props.style),
    ).toMatchObject({
      paddingTop: 12,
      paddingRight: 12,
      paddingBottom: 12,
      paddingLeft: 56,
      gap: 8,
      justifyContent: 'flex-end',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: lightTheme.colors.bg.surface,
    });
    const title = screen.getByRole('header', { name: 'Title' });
    expect(StyleSheet.flatten(title.props.style)).toMatchObject({
      ...lightTheme.typography.headline.bold,
      color: lightTheme.colors.text.primary,
      textAlign: 'center',
      flex: 1,
    });
    expect(title.props.numberOfLines).toBe(1);
    expect(
      StyleSheet.flatten(
        screen.getByRole('button', { name: 'Close' }).props.style,
      ),
    ).toMatchObject({ width: 36, height: 36 });
  });

  it('hides the title when hasTitle is false', async () => {
    await render(
      <ModalHeader
        title="Title"
        hasTitle={false}
        onClose={jest.fn()}
        closeAccessibilityLabel="Close"
      />,
    );
    expect(screen.queryByText('Title')).toBeNull();
    expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy();
  });

  it('calls onClose', async () => {
    const onClose = jest.fn();
    await render(
      <ModalHeader
        title="Title"
        onClose={onClose}
        closeAccessibilityLabel="Close"
        closeTestID="close"
      />,
    );
    await fireEvent.press(screen.getByTestId('close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('blocks the close button when disabled', async () => {
    const onClose = jest.fn();
    await render(
      <ModalHeader
        title="Title"
        onClose={onClose}
        closeAccessibilityLabel="Close"
        isDisabled
      />,
    );
    const button = screen.getByRole('button', { name: 'Close' });
    expect(button.props.accessibilityState).toMatchObject({ disabled: true });
    await fireEvent.press(button);
    expect(onClose).not.toHaveBeenCalled();
  });
});
