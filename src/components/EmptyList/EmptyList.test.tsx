import { StyleSheet, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { EmptyList } from './EmptyList';

describe('EmptyList', () => {
  it('renders the illustration and the secondary message', async () => {
    await render(
      <EmptyList
        message="No results found"
        illustration={<View testID="illustration" />}
      />,
    );
    expect(screen.getByTestId('illustration')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByText('No results found').props.style),
    ).toMatchObject({
      ...lightTheme.typography.headline.medium,
      color: lightTheme.colors.text.secondary,
    });
  });

  it('applies container and text overrides', async () => {
    await render(
      <EmptyList
        message="Empty"
        style={{ marginTop: 0 }}
        textStyle={{ textAlign: 'center' }}
        testID="empty"
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('empty').props.style),
    ).toMatchObject({ marginTop: 0, gap: lightTheme.space[4] });
    expect(
      StyleSheet.flatten(screen.getByText('Empty').props.style),
    ).toMatchObject({ textAlign: 'center' });
  });
});
