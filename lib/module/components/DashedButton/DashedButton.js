"use strict";

import { ActivityIndicator, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { DashedBorder } from "../DashedBorder/index.js";
import { PlusIcon } from "../../icons/PlusIcon.js";
import { Icon, Text } from "../../primitives/index.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Values copied from the app `shared/ui/DashedButton`; no Figma token yet.
/** Window-width offsets used when neither `width` nor `widthOffset` is given. */
const EXTERNAL_WIDTH_OFFSET = 48;
const INTERNAL_WIDTH_OFFSET = 82;
/** Outline heights per variant. */
const HEIGHT_BY_VARIANT = {
  internal: 48,
  external: 56,
  externalWrapped: 86
};
/** Dash and gap length of the outline. */
const DASH_LENGTH = 8;
/** off-scale: disabled/loading opacity (kit `opacity.disabled` is 0.45). */
const DASHED_BUTTON_DISABLED_OPACITY = 0.6;
const PLUS_ICON_SIZE = 24;

/** "Add …" button: dashed outline, plus icon (or spinner) and a label. */
export const DashedButton = ({
  onPress,
  title,
  testID,
  cardStyle,
  width,
  widthOffset,
  textStyle,
  style,
  strokeWidth,
  disabled = false,
  loading = false
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const {
    width: windowWidth
  } = useWindowDimensions();
  const isDisabled = disabled || loading;
  const defaultWidthOffset = style === 'external' ? EXTERNAL_WIDTH_OFFSET : INTERNAL_WIDTH_OFFSET;
  const resolvedWidth = width ?? windowWidth - (widthOffset ?? defaultWidthOffset);
  const height = HEIGHT_BY_VARIANT[style];
  return (
    /*#__PURE__*/
    // Default TouchableOpacity active opacity (0.2) kept from the app.
    _jsx(TouchableOpacity, {
      testID: testID,
      style: [styles.card, {
        height
      }, cardStyle, isDisabled && styles.disabledItem],
      disabled: isDisabled,
      onPress: onPress,
      accessibilityRole: "button",
      accessibilityLabel: title,
      accessibilityState: {
        disabled: isDisabled,
        busy: loading
      },
      children: /*#__PURE__*/_jsxs(DashedBorder, {
        width: resolvedWidth,
        height: height,
        dashLength: DASH_LENGTH,
        gapLength: DASH_LENGTH,
        strokeWidth: strokeWidth,
        borderRadius: style === 'external' ? theme.radius.lg : theme.radius.sm,
        color: theme.palette.lightGray,
        style: [styles.dashContainer, styles[`${style}Container`]],
        children: [loading ? /*#__PURE__*/_jsx(ActivityIndicator, {
          size: "small",
          color: theme.colors.text.primary
        }) : /*#__PURE__*/_jsx(Icon, {
          icon: PlusIcon,
          size: PLUS_ICON_SIZE
        }), /*#__PURE__*/_jsx(Text, {
          variant: "headline/regular",
          style: textStyle,
          children: title
        })]
      })
    })
  );
};
const createStyles = theme => StyleSheet.create({
  card: {
    // Kept from the app; has no visible effect without a border width.
    borderColor: theme.palette.lightGray
  },
  dashContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[4],
    justifyContent: 'flex-start',
    paddingHorizontal: theme.space[4]
  },
  disabledItem: {
    opacity: DASHED_BUTTON_DISABLED_OPACITY
  },
  externalWrappedContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: theme.space[2],
    paddingHorizontal: theme.space[2],
    paddingVertical: theme.space[2]
  },
  externalContainer: {
    paddingVertical: theme.space[4]
  },
  internalContainer: {
    paddingVertical: theme.space[3]
  }
});
//# sourceMappingURL=DashedButton.js.map