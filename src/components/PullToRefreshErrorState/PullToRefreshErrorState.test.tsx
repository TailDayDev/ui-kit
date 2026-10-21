import { StyleSheet, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { PullToRefreshErrorState } from './PullToRefreshErrorState';

describe('PullToRefreshErrorState', () => {
  it('renders the illustration, title and hint with the app text styles', async () => {
    await render(
      <PullToRefreshErrorState
        title="Failed to load"
        description="Pull down to refresh"
        illustration={<View testID="illustration" />}
        testID="state"
      />,
    );
    expect(screen.getByTestId('illustration')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByText('Failed to load').props.style),
    ).toMatchObject({
      fontFamily: lightTheme.typography.title.medium.fontFamily,
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: -0.32,
      color: lightTheme.colors.text.primary,
      textAlign: 'center',
    });
    expect(
      StyleSheet.flatten(screen.getByText('Pull down to refresh').props.style),
    ).toMatchObject({
      fontFamily: lightTheme.typography.body.regular.fontFamily,
      fontSize: 14,
      lineHeight: 17,
      letterSpacing: -0.154,
      color: lightTheme.colors.text.secondary,
    });
    expect(
      StyleSheet.flatten(screen.getByTestId('state').props.style),
    ).toMatchObject({ maxWidth: 382, paddingHorizontal: 40, gap: 16 });
  });
});
