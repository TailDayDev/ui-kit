"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusBadge = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _CheckIcon = require("../../icons/CheckIcon.js");
var _TriangleAlertIcon = require("../../icons/TriangleAlertIcon.js");
var _index = require("../../primitives/Icon/index.js");
var _index2 = require("../../primitives/Text/index.js");
var _index3 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App badge height (off-scale size). */
const STATUS_BADGE_HEIGHT = 20;
const STATUS_BADGE_ICON_SIZE = 14;
const STATUS_BADGE_ICON_ONLY_SIZE = 20;
// off-scale: the app full-width and icon-only badges use radius 10 (not in Figma Radius).
const STATUS_BADGE_SQUARE_RADIUS = 10;
const renderToneIcon = (tone, color) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
  icon: tone === 'success' ? _CheckIcon.CheckIcon : _TriangleAlertIcon.TriangleAlertIcon,
  color: color,
  size: STATUS_BADGE_ICON_SIZE
});
const getToneConfig = (tone, theme) => {
  switch (tone) {
    case 'success':
      return {
        backgroundColor: theme.colors.bg.successSoft,
        icon: renderToneIcon(tone, 'text.success'),
        iconPosition: 'left',
        textColor: theme.colors.text.success
      };
    case 'danger':
      return {
        backgroundColor: theme.colors.bg.errorSoft,
        icon: renderToneIcon(tone, 'text.error'),
        iconPosition: 'right',
        textColor: theme.colors.text.error
      };
    case 'warning':
      return {
        backgroundColor: theme.palette.warningLight,
        icon: renderToneIcon(tone, 'text.primary'),
        iconPosition: 'right',
        textColor: theme.colors.text.primary
      };
    case 'neutral':
      return {
        backgroundColor: theme.colors.bg.subtle,
        icon: renderToneIcon(tone, 'text.secondary'),
        iconPosition: 'right',
        textColor: theme.colors.text.secondary
      };
  }
};
const createStyles = theme => _reactNative.StyleSheet.create({
  badgeBase: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  badgeFullWidth: {
    alignSelf: 'stretch',
    borderRadius: STATUS_BADGE_SQUARE_RADIUS,
    gap: theme.space[1],
    height: STATUS_BADGE_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: theme.space[2]
  },
  badgeIconOnly: {
    alignSelf: 'flex-start',
    borderRadius: STATUS_BADGE_SQUARE_RADIUS,
    height: STATUS_BADGE_ICON_ONLY_SIZE,
    justifyContent: 'center',
    width: STATUS_BADGE_ICON_ONLY_SIZE
  },
  badgeInline: {
    alignSelf: 'flex-start',
    borderRadius: theme.radius.lg,
    gap: theme.space[1],
    height: STATUS_BADGE_HEIGHT,
    paddingHorizontal: theme.space[2]
  },
  iconOnlySlot: {
    alignItems: 'center',
    height: STATUS_BADGE_ICON_SIZE,
    justifyContent: 'center',
    width: STATUS_BADGE_ICON_SIZE
  }
});

/** Status pill: a short label with a tone icon (check / alert). */
const StatusBadge = props => {
  const theme = (0, _index3.useTheme)();
  const styles = (0, _index3.useThemedStyles)(createStyles);
  const {
    label,
    layout = 'inline',
    style,
    testID
  } = props;
  const toneConfig = (0, _react.useMemo)(() => props.tone ? getToneConfig(props.tone, theme) : null, [props.tone, theme]);
  const backgroundColor = toneConfig?.backgroundColor ?? props.backgroundColor;
  const icon = toneConfig?.icon ?? props.icon;
  const iconPosition = props.iconPosition ?? toneConfig?.iconPosition ?? 'left';
  const textColor = toneConfig?.textColor ?? props.textColor;
  const textStyle = toneConfig?.textStyle ?? props.textStyle;
  const layoutStyle = layout === 'fullWidth' ? styles.badgeFullWidth : layout === 'iconOnly' ? styles.badgeIconOnly : styles.badgeInline;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    testID: testID
    // The icon-only badge has no visible text: expose the label to screen readers.
    ,
    accessible: layout === 'iconOnly',
    accessibilityLabel: layout === 'iconOnly' ? label : undefined,
    style: [styles.badgeBase, layoutStyle, {
      backgroundColor
    }, style],
    children: layout === 'iconOnly' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.iconOnlySlot,
      children: icon
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [iconPosition === 'left' ? icon : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
        variant: "caption/regular",
        style: [textStyle, {
          color: textColor
        }],
        children: label
      }), iconPosition === 'right' ? icon : null]
    })
  });
};
exports.StatusBadge = StatusBadge;
//# sourceMappingURL=StatusBadge.js.map