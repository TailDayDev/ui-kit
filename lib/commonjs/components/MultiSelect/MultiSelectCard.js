"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiSelectCard = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../Card/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App option card min height (off-scale: Figma option row). */
const OPTION_MIN_HEIGHT = 64;
/** App disabled card opacity (differs from `opacity.disabled`). */
const DISABLED_OPACITY = 0.6;
/** Default icon size. */
const DEFAULT_ICON_SIZE = 24;
const createStyles = theme => _reactNative.StyleSheet.create({
  codeItem: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    minHeight: OPTION_MIN_HEIGHT,
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[3],
    width: '100%'
  },
  disabledItem: {
    opacity: DISABLED_OPACITY
  },
  icon: {
    overflow: 'hidden',
    borderRadius: theme.radius.sm
  },
  iconWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    flexShrink: 1,
    gap: theme.space[4]
  },
  selectedItem: {
    backgroundColor: theme.colors.bg.accentSoft,
    borderColor: theme.colors.bg.accent
  },
  textPlaceHolder: {
    color: theme.palette.lightGray
  },
  textWrapper: {
    flex: 1,
    flexShrink: 1,
    gap: theme.space[1]
  }
});
const renderDefaultIcon = (imageUrl, size) => {
  if (/*#__PURE__*/(0, _react.isValidElement)(imageUrl)) {
    return imageUrl;
  }
  if (typeof imageUrl === 'number') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
      source: imageUrl,
      style: {
        width: size,
        height: size
      }
    });
  }
  if (typeof imageUrl === 'string' && imageUrl.trim()) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
      source: {
        uri: imageUrl.trim()
      },
      style: {
        width: size,
        height: size
      }
    });
  }
  return null;
};
const MultiSelectCardComponent = ({
  item,
  handlePress,
  disabled = false,
  selected = false,
  restStyle,
  children,
  rowStyles,
  iconSize = DEFAULT_ICON_SIZE,
  isItemColor = false,
  showDescription = true,
  showIcon = true,
  testID,
  withShadow = false,
  renderIcon,
  resolveDescriptionCode
}) => {
  const theme = (0, _index2.useTheme)();
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const hasDescription = showDescription && Boolean(item && (item.description || typeof item.descriptionCode === 'string' && item.descriptionCode.length > 0));
  const description = (0, _react.useMemo)(() => {
    if (!item) {
      return null;
    }
    if (item.description) {
      return item.description;
    }
    if (item.descriptionCode) {
      const code = String(item.descriptionCode);
      return resolveDescriptionCode ? resolveDescriptionCode(code) : code;
    }
    return null;
  }, [item, resolveDescriptionCode]);
  let color;
  if (isItemColor) {
    color = selected ? theme.colors.text.accent : theme.colors.text.secondary;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index3.Card, {
    testID: testID,
    accessibilityLabel: item?.title ? String(item.title) : undefined,
    disabled: disabled,
    cardStyles: [styles.codeItem, selected && styles.selectedItem, disabled && styles.disabledItem, restStyle],
    onPress: handlePress,
    withShadow: withShadow,
    children: [item ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.iconWrapper, rowStyles],
      children: [showIcon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.icon,
        children: renderIcon ? renderIcon({
          item,
          size: iconSize,
          color
        }) : renderDefaultIcon(item.imageUrl, iconSize)
      }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.textWrapper,
        children: [item.title ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          variant: "body/bold",
          color: selected ? 'accent' : 'primary',
          children: String(item.title)
        }) : null, hasDescription ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          variant: "smallCaption/regular",
          color: selected ? 'accent' : 'secondary',
          style: !item.description && item.descriptionCode && !selected ? styles.textPlaceHolder : undefined,
          children: description
        }) : null]
      })]
    }) : null, children]
  });
};

/** Selectable option card: icon, title and description; accent when selected. */
const MultiSelectCard = exports.MultiSelectCard = /*#__PURE__*/(0, _react.memo)(MultiSelectCardComponent);
//# sourceMappingURL=MultiSelectCard.js.map