import { View } from 'react-native';

import { useTheme, type Theme } from '../../theme';
import type { IconColor, IconProps } from './Icon.types';

/** Figma icon frames are 24×24. */
export const DEFAULT_ICON_SIZE = 24;

const resolveIconColor = (theme: Theme, color: IconColor): string =>
  color.startsWith('text.')
    ? theme.colors.text[
        color.slice('text.'.length) as keyof Theme['colors']['text']
      ]
    : theme.colors.icon[color as keyof Theme['colors']['icon']];

/** Renders an SVG icon component at a token color. */
export const Icon = ({
  icon: IconSvg,
  size = DEFAULT_ICON_SIZE,
  color = 'default',
  accessibilityLabel,
  style,
  testID,
}: IconProps) => {
  const theme = useTheme();
  const isDecorative = !accessibilityLabel;
  return (
    <View
      style={style}
      testID={testID}
      accessible={!isDecorative}
      accessibilityRole={isDecorative ? undefined : 'image'}
      accessibilityLabel={accessibilityLabel}
      importantForAccessibility={isDecorative ? 'no-hide-descendants' : 'auto'}
      accessibilityElementsHidden={isDecorative}
    >
      <IconSvg
        color={resolveIconColor(theme, color)}
        size={size}
        width={size}
        height={size}
      />
    </View>
  );
};
