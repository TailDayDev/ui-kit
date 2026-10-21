import { StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { Text } from './Text';

describe('Text', () => {
  it('renders body/regular in the primary color by default', async () => {
    await render(<Text>Hello</Text>);
    const style = StyleSheet.flatten(screen.getByText('Hello').props.style);
    expect(style).toMatchObject({
      ...lightTheme.typography.body.regular,
      color: lightTheme.colors.text.primary,
    });
  });

  it('applies the variant and color role', async () => {
    await render(
      <Text variant="headline/bold" color="error">
        Oops
      </Text>,
    );
    const style = StyleSheet.flatten(screen.getByText('Oops').props.style);
    expect(style).toMatchObject({
      ...lightTheme.typography.headline.bold,
      color: lightTheme.colors.text.error,
    });
  });
});
