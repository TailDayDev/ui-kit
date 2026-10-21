import { StyleSheet, Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ServiceHeader } from './ServiceHeader';

const SEARCH = { onPress: jest.fn(), accessibilityLabel: 'Search' };

describe('ServiceHeader', () => {
  beforeEach(() => {
    SEARCH.onPress.mockClear();
  });

  it('renders the selector, search and bottom content (forceTitleOnly=false)', async () => {
    const onTriggerPress = jest.fn();
    await render(
      <ServiceHeader
        trigger={{
          titleSelected: 'Hotel',
          notifications: '2',
          onPress: onTriggerPress,
        }}
        search={SEARCH}
        bottomContent={<Text>Filters</Text>}
        testID="header"
      />,
    );
    expect(screen.getByText('Filters')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Hotel' }));
    expect(onTriggerPress).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByRole('button', { name: 'Search' }));
    expect(SEARCH.onPress).toHaveBeenCalledTimes(1);
    expect(
      StyleSheet.flatten(screen.getByTestId('header').props.style),
    ).toMatchObject({
      backgroundColor: lightTheme.colors.bg.surface,
      boxShadow: [...lightTheme.shadows.bar],
      gap: 8,
      paddingVertical: 8,
    });
  });

  it('hides search and bottom content via the booleans', async () => {
    await render(
      <ServiceHeader
        trigger={{ titleSelected: 'Hotel' }}
        search={SEARCH}
        hasSearch={false}
        hasBottomContent={false}
        bottomContent={<Text>Filters</Text>}
      />,
    );
    expect(screen.queryByRole('button', { name: 'Search' })).toBeNull();
    expect(screen.queryByText('Filters')).toBeNull();
  });

  it('renders a plain title without selector or search (forceTitleOnly=true)', async () => {
    await render(
      <ServiceHeader
        forceTitleOnly
        title="Bookings"
        search={SEARCH}
        bottomContent={<Text>Filters</Text>}
      />,
    );
    expect(screen.getByRole('header', { name: 'Bookings' })).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByText('Bookings').props.style),
    ).toMatchObject(lightTheme.typography.title.bold);
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByText('Filters')).toBeTruthy();
  });
});
