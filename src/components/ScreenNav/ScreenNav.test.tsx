import { StyleSheet, Text as RNText } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ScreenNav } from './ScreenNav';

const TOP_INSET = 47;
const METRICS = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: TOP_INSET, left: 0, right: 0, bottom: 34 },
};

/** The outer container is the parent of the bar row. */
const containerStyle = (text: string) =>
  StyleSheet.flatten(
    screen.getByText(text).parent?.parent?.parent?.props.style,
  );

describe('ScreenNav', () => {
  it('renders the title in title/bold', async () => {
    await render(<ScreenNav title="Bookings" />);
    expect(
      StyleSheet.flatten(screen.getByText('Bookings').props.style),
    ).toMatchObject({
      ...lightTheme.typography.title.bold,
      color: lightTheme.colors.text.primary,
    });
  });

  it('shows the back button only with hasBackButton and goBack', async () => {
    const goBack = jest.fn();
    await render(<ScreenNav title="Pet" hasBackButton goBack={goBack} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Pet' }));
    expect(goBack).toHaveBeenCalledTimes(1);

    await render(<ScreenNav title="Pet" goBack={goBack} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('places the bar under the safe-area inset with root padding and a divider', async () => {
    await render(
      <SafeAreaProvider initialMetrics={METRICS}>
        <ScreenNav title="Bookings" />
      </SafeAreaProvider>,
    );
    expect(containerStyle('Bookings')).toMatchObject({
      paddingTop: TOP_INSET + 7.5,
      paddingBottom: 7.5,
      paddingHorizontal: 24,
      borderBottomWidth: 1,
      borderBottomColor: lightTheme.colors.border.default,
    });
  });

  it('uses 16 padding with a back button and drops the divider', async () => {
    await render(
      <ScreenNav
        title="Pet"
        hasBackButton
        goBack={jest.fn()}
        isDevider={false}
      />,
    );
    expect(containerStyle('Pet')).toMatchObject({
      paddingTop: 8,
      paddingBottom: 8,
      paddingHorizontal: 16,
      borderBottomWidth: 0,
    });
  });

  it('renders children under the bar and only children when asked', async () => {
    await render(
      <ScreenNav title="Clients" rightBlock={<RNText>Add</RNText>}>
        <RNText>Search</RNText>
      </ScreenNav>,
    );
    expect(screen.getByText('Add')).toBeTruthy();
    expect(screen.getByText('Search')).toBeTruthy();

    await render(
      <ScreenNav title="Clients" isOnlyChildren>
        <RNText>Search</RNText>
      </ScreenNav>,
    );
    expect(screen.queryByText('Clients')).toBeNull();
    expect(screen.getByText('Search')).toBeTruthy();
  });
});
