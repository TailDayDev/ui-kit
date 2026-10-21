"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayTaskFooter = void 0;
var _reactNative = require("react-native");
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../primitives/Icon/index.js");
var _index3 = require("../../theme/index.js");
var _index4 = require("../IconButton/index.js");
var _index5 = require("../TodayCompletionSlider/index.js");
var _index6 = require("../TodayDoorButton/index.js");
var _index7 = require("../TodaySkippedAction/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const createStyles = theme => _reactNative.StyleSheet.create({
  door: {
    flex: 1
  },
  doorFooter: {
    gap: theme.space[4],
    justifyContent: 'flex-start'
  },
  footer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: theme.space[4],
    paddingHorizontal: theme.space[4],
    paddingTop: theme.space[2]
  }
});

/**
 * Footer of a Today task card (Figma `TodayTaskFooter`): the «⋮» more-actions
 * button on the left and the main action on the right — the «Готово!»
 * slider, a door button that fills the rest of the row, or the «Пропущено»
 * capsule.
 */
const TodayTaskFooter = props => {
  const {
    onMenuPress,
    menuAccessibilityLabel,
    isMenuDisabled = false,
    isMenuLoading = false,
    menuTestID,
    style,
    testID
  } = props;
  const theme = (0, _index3.useTheme)();
  const styles = (0, _index3.useThemedStyles)(createStyles);
  const isDoor = props.action === 'door';
  const renderAction = () => {
    switch (props.action) {
      case 'door':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index6.TodayDoorButton, {
          ...props.doorProps,
          style: [styles.door, props.doorProps.style]
        });
      case 'skipped':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index7.TodaySkippedAction, {
          ...props.skippedProps
        });
      default:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.TodayCompletionSlider, {
          ...props.sliderProps
        });
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    testID: testID,
    style: [styles.footer, isDoor && styles.doorFooter, style],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.IconSquareButton, {
      size: theme.space[12],
      icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
        icon: _index.IconEllipsisVertical
      }),
      onPress: onMenuPress,
      disabled: isMenuDisabled,
      loading: isMenuLoading,
      accessibilityLabel: menuAccessibilityLabel,
      testID: menuTestID
    }), renderAction()]
  });
};
exports.TodayTaskFooter = TodayTaskFooter;
//# sourceMappingURL=TodayTaskFooter.js.map