import { Dimensions, StyleSheet, Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ErrorCard } from './ErrorCard';

describe('ErrorCard', () => {
  it('renders title, description and the error text in red upper case', async () => {
    await render(
      <ErrorCard
        onCancel={jest.fn()}
        title="Payment failed"
        description="Try again later"
        errorText="Timeout"
        errorTextTestID="error.text"
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByText('Payment failed').props.style),
    ).toMatchObject({
      ...lightTheme.typography.body.bold,
      color: lightTheme.colors.text.primary,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Try again later').props.style),
    ).toMatchObject({
      ...lightTheme.typography.smallCaption.regular,
      color: lightTheme.colors.text.secondary,
    });
    expect(
      StyleSheet.flatten(screen.getByTestId('error.text').props.style),
    ).toMatchObject({
      color: lightTheme.colors.text.error,
      textTransform: 'uppercase',
    });
  });

  it('hides empty texts', async () => {
    await render(
      <ErrorCard onCancel={jest.fn()} description="" errorText="" />,
    );
    expect(screen.queryByTestId('error.text')).toBeNull();
    expect(screen.queryAllByText(/.+/)).toHaveLength(0);
  });

  it('calls onCancel from the close button', async () => {
    const onCancel = jest.fn();
    await render(
      <ErrorCard
        onCancel={onCancel}
        description="Description"
        errorText=""
        closeAccessibilityLabel="Close"
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Close' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('sizes the card to the screen minus the inset and renders children', async () => {
    await render(
      <ErrorCard
        onCancel={jest.fn()}
        description="Description"
        errorText=""
        horizontalInset={20}
        testID="card"
      >
        <Text>Retry</Text>
      </ErrorCard>,
    );
    expect(screen.getByText('Retry')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByTestId('card').props.style).width,
    ).toBe(Dimensions.get('screen').width - 40);
  });
});
