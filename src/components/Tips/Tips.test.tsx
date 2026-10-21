import { StyleSheet, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { Tips } from './Tips';

describe('Tips', () => {
  it('renders the icon and text on the success background', async () => {
    await render(
      <Tips icon={<View testID="icon" />} text="Keep notes short." />,
    );
    expect(screen.getByTestId('icon')).toBeTruthy();
    const text = screen.getByText('Keep notes short.');
    expect(StyleSheet.flatten(text.props.style)).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.primary,
    });
    const container = screen.toJSON();
    if (!container || Array.isArray(container)) {
      throw new Error('expected a single root view');
    }
    expect(StyleSheet.flatten(container.props.style)).toMatchObject({
      backgroundColor: lightTheme.colors.bg.successSoft,
      borderRadius: lightTheme.radius.lg,
      paddingHorizontal: lightTheme.space[4],
      paddingVertical: lightTheme.space[3],
    });
  });
});
