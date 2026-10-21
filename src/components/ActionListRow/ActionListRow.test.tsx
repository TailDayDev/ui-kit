import { StyleSheet, Text as RNText } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ActionListRow } from './ActionListRow';

const flatStyle = (testID: string) =>
  StyleSheet.flatten(screen.getByTestId(testID).props.style);

describe('ActionListRow', () => {
  it('renders title, description, right text and a divider in flat rows', async () => {
    await render(
      <ActionListRow
        testID="row"
        title="Camera"
        description="Take a new photo"
        rightText="2"
        leading={<RNText>icon</RNText>}
      />,
    );
    expect(screen.getByText('Camera')).toBeTruthy();
    expect(screen.getByText('Take a new photo')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByText('icon')).toBeTruthy();
    expect(flatStyle('row')).toMatchObject({
      borderBottomColor: lightTheme.colors.border.default,
      borderBottomWidth: 1,
      paddingVertical: lightTheme.space[3],
    });
    expect(
      StyleSheet.flatten(screen.getByText('Camera').props.style),
    ).toMatchObject({
      ...lightTheme.typography.body.medium,
      color: lightTheme.colors.text.primary,
    });
  });

  it('is a button that calls onPress', async () => {
    const onPress = jest.fn();
    await render(
      <ActionListRow
        title="Gallery"
        accessibilityLabel="Open gallery"
        onPress={onPress}
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Open gallery' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('blocks the press and dims the row when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <ActionListRow
        title="Gallery"
        accessibilityLabel="Open gallery"
        isDisabled
        onPress={onPress}
      />,
    );
    const button = screen.getByRole('button', { name: 'Open gallery' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('dims a disabled row to 0.6', async () => {
    await render(<ActionListRow testID="row" title="Gallery" isDisabled />);
    expect(flatStyle('row').opacity).toBe(0.6);
  });

  it('paints the danger title red', async () => {
    await render(
      <ActionListRow title="Delete" isDanger variant="card-source" />,
    );
    expect(
      StyleSheet.flatten(screen.getByText('Delete').props.style).color,
    ).toBe(lightTheme.colors.text.error);
  });

  it('moves the leading icon to the trailing slot in trailing variants', async () => {
    await render(
      <ActionListRow
        testID="row"
        title="Remove"
        variant="trailing-icon"
        leading={<RNText>icon</RNText>}
      />,
    );
    const texts = screen
      .getAllByText(/^(Remove|icon)$/)
      .map(node => node.props.children);
    expect(texts).toEqual(['Remove', 'icon']);
  });

  it('draws the card border and no divider in card variants', async () => {
    await render(
      <ActionListRow testID="row" title="Settings" variant="card-settings" />,
    );
    const style = flatStyle('row');
    expect(style).toMatchObject({
      borderColor: lightTheme.colors.border.default,
      borderRadius: lightTheme.radius.sm,
      borderWidth: 1,
      height: 52,
    });
    expect(style.borderBottomWidth).toBeUndefined();
  });
});
