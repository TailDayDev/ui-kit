import { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { SyncedTextInput } from './SyncedTextInput';

/** Owns the text and accepts digits only, like the app's price modal. */
const DigitsOnly = () => {
  const [text, setText] = useState('1');
  return (
    <SyncedTextInput
      accessibilityLabel="Amount"
      value={text}
      onChangeText={next => {
        if (/^\d*$/.test(next)) {
          setText(next);
        }
      }}
    />
  );
};

const type = async (text: string) => {
  const input = screen.getByLabelText('Amount');
  await fireEvent(input, 'change', { nativeEvent: { text } });
  await fireEvent.changeText(input, text);
  // The frame callback that ends the echo.
  await act(() => jest.runOnlyPendingTimers());
};

describe('SyncedTextInput', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('shows the accepted text', async () => {
    await render(<DigitsOnly />);
    await type('12');
    expect(screen.getByLabelText('Amount')).toHaveDisplayValue('12');
  });

  it('rolls native back when the owner rejects the text', async () => {
    await render(<DigitsOnly />);
    await type('1a');
    expect(screen.getByLabelText('Amount')).toHaveDisplayValue('1');
  });
});
