import { View, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import type { BoxProps } from './Box.types';

/** Token-driven `View`. Use it instead of raw `View` + hand-written spacing. */
export const Box = ({
  padding,
  paddingX,
  paddingY,
  margin,
  marginX,
  marginY,
  gap,
  row,
  align,
  justify,
  flex,
  background,
  radius,
  border,
  shadow,
  style,
  ...viewProps
}: BoxProps) => {
  const theme = useTheme();
  const tokenStyle: ViewStyle = {
    padding: padding === undefined ? undefined : theme.space[padding],
    paddingHorizontal:
      paddingX === undefined ? undefined : theme.space[paddingX],
    paddingVertical: paddingY === undefined ? undefined : theme.space[paddingY],
    margin: margin === undefined ? undefined : theme.space[margin],
    marginHorizontal: marginX === undefined ? undefined : theme.space[marginX],
    marginVertical: marginY === undefined ? undefined : theme.space[marginY],
    gap: gap === undefined ? undefined : theme.space[gap],
    flexDirection: row ? 'row' : undefined,
    alignItems: align,
    justifyContent: justify,
    flex: flex ? 1 : undefined,
    backgroundColor:
      background === undefined ? undefined : theme.colors.bg[background],
    borderRadius: radius === undefined ? undefined : theme.radius[radius],
    borderWidth: border === undefined ? undefined : theme.stroke[border],
    borderColor: border === undefined ? undefined : theme.colors.border.default,
    boxShadow: shadow === undefined ? undefined : [...theme.shadows[shadow]],
  };

  return <View style={[tokenStyle, style]} {...viewProps} />;
};
