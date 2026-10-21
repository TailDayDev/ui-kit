"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionListRow = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _actionListRowVariants = require("./actionListRowVariants.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App flat row content height (off-scale size, not spacing). */const ROW_CONTENT_MIN_HEIGHT = 56;
/** Leading / trailing icon slot (Figma icon frame). */
const ICON_SLOT_SIZE = 24;
/** Right text never takes more than this share of the row. */
const RIGHT_TEXT_MAX_WIDTH = '36%';
// off-scale: the app dims a disabled row to 0.6, not the kit `opacity.disabled` (0.45).
const ROW_DISABLED_OPACITY = 0.6;
const DEFAULT_LINES = 2;
const createStyles = theme => _reactNative.StyleSheet.create({
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[3],
    minHeight: ROW_CONTENT_MIN_HEIGHT,
    width: '100%'
  },
  description: {
    marginTop: theme.space[1]
  },
  leading: {
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'center',
    minWidth: ICON_SLOT_SIZE,
    width: ICON_SLOT_SIZE
  },
  rightText: {
    flexShrink: 0,
    maxWidth: RIGHT_TEXT_MAX_WIDTH
  },
  row: {
    paddingVertical: theme.space[3],
    width: '100%'
  },
  rowCardReset: {
    paddingVertical: 0
  },
  rowDisabled: {
    opacity: ROW_DISABLED_OPACITY
  },
  rowWithDivider: {
    borderBottomColor: theme.colors.border.default,
    borderBottomWidth: theme.stroke[1]
  },
  textBlock: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0
  },
  trailing: {
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 0,
    height: ICON_SLOT_SIZE,
    justifyContent: 'center',
    minWidth: ICON_SLOT_SIZE,
    width: ICON_SLOT_SIZE
  }
});

/**
 * List / sheet row with an icon slot, title, description, right text and a
 * trailing slot. Tappable when `onPress` is set. Figma `TaskSheetRow` is the
 * `trailing-icon` variant (`isDanger` for the red destructive row).
 */
const ActionListRow = exports.ActionListRow = /*#__PURE__*/(0, _react.memo)(function ActionListRow({
  accessibilityLabel,
  title,
  description,
  rightText,
  leading,
  trailing,
  isDanger = false,
  isDisabled = false,
  showDivider,
  variant = 'flat',
  onPress,
  style,
  contentStyle,
  titleStyle,
  descriptionStyle,
  rightTextStyle,
  titleNumberOfLines,
  descriptionNumberOfLines,
  testID
}) {
  const theme = (0, _index2.useTheme)();
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const variantStyles = (0, _react.useMemo)(() => (0, _actionListRowVariants.getActionListRowVariantStyles)(theme, variant), [theme, variant]);
  const isCardVariant = (0, _actionListRowVariants.isActionListRowCardVariant)(variant);
  const resolvedShowDivider = showDivider ?? !isCardVariant;
  const resolvedTitleNumberOfLines = titleNumberOfLines ?? variantStyles?.titleNumberOfLines ?? DEFAULT_LINES;
  const resolvedDescriptionNumberOfLines = descriptionNumberOfLines ?? variantStyles?.descriptionNumberOfLines ?? DEFAULT_LINES;
  const isIconPlacedOnTrailingSide = variantStyles?.iconPlacement === 'trailing';
  const resolvedLeading = isIconPlacedOnTrailingSide ? null : leading;
  const resolvedTrailing = isIconPlacedOnTrailingSide ? trailing ?? leading : trailing;
  const content = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    testID: onPress ? undefined : testID,
    style: [styles.row, isCardVariant ? styles.rowCardReset : null, resolvedShowDivider ? styles.rowWithDivider : null, isDisabled ? styles.rowDisabled : null, variantStyles?.row, style],
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.content, variantStyles?.content, contentStyle],
      children: [resolvedLeading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.leading,
        children: resolvedLeading
      }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.textBlock,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          variant: "body/medium",
          color: isDanger ? 'error' : 'primary',
          style: [variantStyles?.title, isDanger ? {
            color: theme.colors.text.error
          } : null, titleStyle],
          numberOfLines: resolvedTitleNumberOfLines,
          children: title
        }), description ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          variant: "caption/regular",
          color: "secondary",
          style: [styles.description, variantStyles?.description, descriptionStyle],
          numberOfLines: resolvedDescriptionNumberOfLines,
          children: description
        }) : null]
      }), rightText ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "body/regular",
        style: [styles.rightText, variantStyles?.rightText, rightTextStyle],
        numberOfLines: 1,
        children: rightText
      }) : null, resolvedTrailing ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.trailing,
        children: resolvedTrailing
      }) : null]
    })
  });
  if (!onPress) {
    return content;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    accessibilityState: {
      disabled: isDisabled
    },
    disabled: isDisabled,
    onPress: onPress,
    testID: testID,
    children: content
  });
});
//# sourceMappingURL=ActionListRow.js.map