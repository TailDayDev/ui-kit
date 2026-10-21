import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { CustomModalFooterActions } from './CustomModalFooterActions';

const renderFooter = (
  props: Partial<Parameters<typeof CustomModalFooterActions>[0]> = {},
) =>
  render(
    <CustomModalFooterActions
      testID="footer"
      cancelLabel="Cancel"
      primaryLabel="Save"
      onCancel={jest.fn()}
      onPrimary={jest.fn()}
      {...props}
    />,
  );

const buttonStyle = (name: string) =>
  StyleSheet.flatten(screen.getByRole('button', { name }).props.style);

describe('CustomModalFooterActions', () => {
  it('row: cancel left, main right, space-between', async () => {
    await renderFooter();
    expect(
      StyleSheet.flatten(screen.getByTestId('footer').props.style),
    ).toMatchObject({
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    });
    const [first, second] = screen.getAllByRole('button');
    expect(first?.props.accessibilityLabel).toBe('Cancel');
    expect(second?.props.accessibilityLabel).toBe('Save');
    expect(buttonStyle('Cancel')).toMatchObject({
      backgroundColor: lightTheme.colors.bg.surface,
      borderColor: lightTheme.palette.lightGray,
    });
    expect(buttonStyle('Save')).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accent,
    });
  });

  it('column: main on top, cancel below, gap 16, stretched', async () => {
    await renderFooter({ direction: 'column' });
    expect(
      StyleSheet.flatten(screen.getByTestId('footer').props.style),
    ).toMatchObject({
      flexDirection: 'column',
      gap: 16,
      alignItems: 'stretch',
    });
    const [first, second] = screen.getAllByRole('button');
    expect(first?.props.accessibilityLabel).toBe('Save');
    expect(second?.props.accessibilityLabel).toBe('Cancel');
  });

  it('calls onCancel and onPrimary', async () => {
    const onCancel = jest.fn();
    const onPrimary = jest.fn();
    await renderFooter({ onCancel, onPrimary });
    await fireEvent.press(screen.getByRole('button', { name: 'Cancel' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Save' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onPrimary).toHaveBeenCalledTimes(1);
  });

  it('blocks the main button when disabled', async () => {
    const onPrimary = jest.fn();
    await renderFooter({ onPrimary, isPrimaryDisabled: true });
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button.props.accessibilityState).toMatchObject({ disabled: true });
    await fireEvent.press(button);
    expect(onPrimary).not.toHaveBeenCalled();
  });

  it('marks the main button busy while loading', async () => {
    const onPrimary = jest.fn();
    await renderFooter({ onPrimary, isPrimaryLoading: true });
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button.props.accessibilityState).toMatchObject({
      busy: true,
      disabled: true,
    });
    await fireEvent.press(button);
    expect(onPrimary).not.toHaveBeenCalled();
  });

  it('applies primaryStyle', async () => {
    await renderFooter({ primaryStyle: 'danger' });
    expect(buttonStyle('Save')).toMatchObject({
      backgroundColor: lightTheme.palette.red,
    });
  });
});
