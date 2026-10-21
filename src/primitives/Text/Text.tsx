import { Text as RNText } from 'react-native';

import { useTheme, type Theme, type TypographyToken } from '../../theme';
import type { TypographyVariant } from '../../tokens';
import type { TextProps } from './Text.types';

const getTypography = (
  theme: Theme,
  variant: TypographyVariant,
): TypographyToken | undefined => {
  const [group, weight] = variant.split('/') as [
    keyof Theme['typography'],
    string,
  ];
  const styles: Readonly<Record<string, TypographyToken>> =
    theme.typography[group];
  return styles[weight];
};

/** Themed text. Every visible string in the kit goes through this component. */
export const Text = ({
  variant = 'body/regular',
  color = 'primary',
  align,
  style,
  ...textProps
}: TextProps) => {
  const theme = useTheme();
  return (
    <RNText
      style={[
        getTypography(theme, variant),
        { color: theme.colors.text[color], textAlign: align },
        style,
      ]}
      {...textProps}
    />
  );
};
