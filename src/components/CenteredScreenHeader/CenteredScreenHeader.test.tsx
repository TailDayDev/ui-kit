import { StyleSheet, Text as RNText } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { CenteredScreenHeader } from './CenteredScreenHeader';
import { SCREEN_HEADER_BAR_HEIGHT } from './screenHeaderMetrics';

const TOP_INSET = 47;
const METRICS = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: TOP_INSET, left: 0, right: 0, bottom: 34 },
};

describe('CenteredScreenHeader', () => {
  it('renders title, subtitle and the right action', async () => {
    await render(
      <CenteredScreenHeader
        title="Booking"
        subtitle="#1024"
        goBack={jest.fn()}
        rightAction={<RNText>Edit</RNText>}
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByText('Booking').props.style),
    ).toMatchObject({
      ...lightTheme.typography.headline.bold,
      color: lightTheme.colors.text.primary,
      textAlign: 'center',
    });
    expect(
      StyleSheet.flatten(screen.getByText('#1024').props.style),
    ).toMatchObject({
      color: lightTheme.colors.text.secondary,
      fontSize: 12,
    });
    expect(screen.getByText('Edit')).toBeTruthy();
  });

  it('calls goBack from the back button', async () => {
    const goBack = jest.fn();
    await render(
      <CenteredScreenHeader
        title="Booking"
        goBack={goBack}
        backButtonTestID="back"
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Booking' }));
    expect(goBack).toHaveBeenCalledTimes(1);
  });

  it('adds the top safe-area inset to the bar', async () => {
    await render(
      <SafeAreaProvider initialMetrics={METRICS}>
        <CenteredScreenHeader title="Booking" goBack={jest.fn()} testID="h" />
      </SafeAreaProvider>,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('h').props.style),
    ).toMatchObject({
      height: SCREEN_HEADER_BAR_HEIGHT + TOP_INSET,
      paddingTop: TOP_INSET,
      borderBottomWidth: 1,
      borderBottomColor: lightTheme.colors.border.default,
    });
  });

  it('hides an empty subtitle', async () => {
    await render(
      <CenteredScreenHeader title="Booking" subtitle="" goBack={jest.fn()} />,
    );
    expect(screen.getAllByText(/.*/)).toHaveLength(1);
  });
});
