import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import {
  lightTheme,
  resolveColor,
  ThemeProvider,
  useTheme,
  type Theme,
} from '.';

const ThemeProbe = () => {
  const theme = useTheme();
  return <Text>{theme.colors.text.primary}</Text>;
};

describe('ThemeProvider', () => {
  it('falls back to the light theme without a provider', async () => {
    await render(<ThemeProbe />);
    expect(screen.getByText(lightTheme.colors.text.primary)).toBeTruthy();
  });

  it('provides a custom theme', async () => {
    const custom: Theme = {
      ...lightTheme,
      colors: {
        ...lightTheme.colors,
        text: { ...lightTheme.colors.text, primary: '#123456' },
      },
    };
    await render(
      <ThemeProvider theme={custom}>
        <ThemeProbe />
      </ThemeProvider>,
    );
    expect(screen.getByText('#123456')).toBeTruthy();
  });
});

describe('resolveColor', () => {
  it('resolves semantic roles', () => {
    expect(resolveColor(lightTheme, 'bg.surface')).toBe(
      lightTheme.palette.white,
    );
    expect(resolveColor(lightTheme, 'text.accent')).toBe(
      lightTheme.palette.primary,
    );
  });
});
