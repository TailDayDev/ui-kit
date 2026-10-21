"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodaySectionHeader = void 0;
var _reactNative = require("react-native");
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../primitives/Icon/index.js");
var _index3 = require("../../primitives/Text/index.js");
var _index4 = require("../../theme/index.js");
var _index5 = require("../IconButton/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma TodaySectionHeader › Кнопка · свернуть раздел: 24×24 round button.
const CHEVRON_BUTTON_SIZE = 24;
// Figma TodaySectionHeader › chevron-up / chevron-down: 16×16.
const CHEVRON_GLYPH_SIZE = 16;
const createStyles = theme => _reactNative.StyleSheet.create({
  chevronAndLine: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: theme.space[2]
  },
  line: {
    backgroundColor: theme.colors.border.default,
    flex: 1,
    height: theme.stroke[1]
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[2],
    paddingTop: theme.space[3]
  }
});

/**
 * Today feed section divider (Figma `TodaySectionHeader`): a hairline, the
 * section title with its count, a round collapse chevron and a second
 * hairline. A collapsible row with `onToggle` is one button for the whole
 * width (as in the app); the chevron is its visual cue only.
 */
const TodaySectionHeader = ({
  title,
  isCollapsible = true,
  isExpanded = true,
  isPastDate = false,
  onToggle,
  style,
  testID
}) => {
  const styles = (0, _index4.useThemedStyles)(createStyles);
  const isToggle = isCollapsible && Boolean(onToggle);
  const content = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.line
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Text, {
      color: isPastDate ? 'error' : 'primary',
      variant: "caption/regular",
      children: title
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.chevronAndLine,
      children: [isCollapsible ?
      /*#__PURE__*/
      // Decorative: the row is the button, so the chevron is hidden from
      // touches and screen readers to avoid a nested second control.
      (0, _jsxRuntime.jsx)(_reactNative.View, {
        accessibilityElementsHidden: true,
        importantForAccessibility: "no-hide-descendants",
        pointerEvents: "none",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.IconRoundButton, {
          accessibilityLabel: title,
          icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
            icon: isExpanded ? _index.IconChevronUp : _index.IconChevronDown,
            size: CHEVRON_GLYPH_SIZE
          }),
          size: CHEVRON_BUTTON_SIZE
        })
      }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.line
      })]
    })]
  });
  if (!isToggle) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      accessibilityLabel: title,
      style: [styles.row, style],
      testID: testID,
      children: content
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    accessibilityLabel: title,
    accessibilityRole: "button",
    accessibilityState: {
      expanded: isExpanded
    },
    onPress: onToggle,
    style: [styles.row, style],
    testID: testID,
    children: content
  });
};
exports.TodaySectionHeader = TodaySectionHeader;
//# sourceMappingURL=TodaySectionHeader.js.map