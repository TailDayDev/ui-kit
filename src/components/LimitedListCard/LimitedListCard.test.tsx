import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { LimitedListCard } from './LimitedListCard';

const ITEMS = ['Rex', 'Bella', 'Max', 'Luna', 'Charlie'];
const formatMoreLabel = (count: number) => `+${count} more`;

describe('LimitedListCard', () => {
  it('shows the first three items and the remaining count', async () => {
    await render(
      <LimitedListCard
        title="Pets"
        items={ITEMS}
        formatMoreLabel={formatMoreLabel}
      />,
    );
    expect(screen.getByText('Pets')).toBeTruthy();
    expect(screen.getByText('Max')).toBeTruthy();
    expect(screen.queryByText('Luna')).toBeNull();
    expect(
      StyleSheet.flatten(screen.getByText('+2 more').props.style),
    ).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.secondary,
    });
  });

  it('hides the more line when everything fits', async () => {
    const format = jest.fn(formatMoreLabel);
    await render(
      <LimitedListCard
        title="Pets"
        items={ITEMS}
        maxVisible={5}
        formatMoreLabel={format}
      />,
    );
    expect(screen.getByText('Charlie')).toBeTruthy();
    expect(format).not.toHaveBeenCalled();
  });

  it('is a button when onPress is set', async () => {
    const onPress = jest.fn();
    await render(
      <LimitedListCard
        title="Pets"
        items={ITEMS}
        onPress={onPress}
        formatMoreLabel={formatMoreLabel}
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Pets' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
