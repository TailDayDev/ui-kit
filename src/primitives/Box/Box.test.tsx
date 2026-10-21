import { StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { Box } from './Box';

describe('Box', () => {
  it('maps token props to styles', async () => {
    await render(
      <Box
        testID="box"
        padding={4}
        gap={2}
        row
        background="surface"
        radius="sm"
        border={1}
      />,
    );
    const style = StyleSheet.flatten(screen.getByTestId('box').props.style);
    expect(style).toMatchObject({
      padding: lightTheme.space[4],
      gap: lightTheme.space[2],
      flexDirection: 'row',
      backgroundColor: lightTheme.colors.bg.surface,
      borderRadius: lightTheme.radius.sm,
      borderWidth: lightTheme.stroke[1],
      borderColor: lightTheme.colors.border.default,
    });
  });

  it('lets an explicit style win over tokens', async () => {
    await render(<Box testID="box" padding={4} style={{ padding: 0 }} />);
    const style = StyleSheet.flatten(screen.getByTestId('box').props.style);
    expect(style.padding).toBe(0);
  });
});
