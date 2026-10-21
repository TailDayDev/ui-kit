"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPercentageValueInput = exports.clampPercentageValue = exports.PercentageValueField = exports.PERCENTAGE_VALUE_MAX = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../SyncedTextInput/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const PERCENTAGE_VALUE_MAX = exports.PERCENTAGE_VALUE_MAX = 100;
const PERCENTAGE_VALUE_MIN = 0;
const PERCENTAGE_VALUE_STEP = 1;
/** The min/max labels tuck under the slider's bottom margin (app value). */
const MIN_MAX_OFFSET_TOP = -16;
const clampPercentageValue = value => Math.min(PERCENTAGE_VALUE_MAX, Math.max(PERCENTAGE_VALUE_MIN, value));
exports.clampPercentageValue = clampPercentageValue;
const isPercentageValueInput = value => Number.isInteger(value);

/**
 * Large percentage value with a slider and 0 % / 100 % labels
 * (app `shared/ui/percentage-value-field`). The slider comes from `renderSlider`.
 */
exports.isPercentageValueInput = isPercentageValueInput;
const PercentageValueField = ({
  value,
  onChange,
  renderSlider,
  testID,
  accessibilityLabel
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.valueRow,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.SyncedTextInput, {
        testID: testID,
        accessibilityLabel: accessibilityLabel,
        value: String(value),
        onChangeText: text => {
          if (text.length === 0) {
            onChange(0);
            return;
          }
          const parsed = Number(text);
          if (isPercentageValueInput(parsed)) {
            onChange(clampPercentageValue(parsed));
          }
        },
        keyboardType: "numeric",
        style: styles.value
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "numbers/bold",
        children: "%"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.slider,
      children: renderSlider({
        min: PERCENTAGE_VALUE_MIN,
        max: PERCENTAGE_VALUE_MAX,
        step: PERCENTAGE_VALUE_STEP,
        value,
        onValueChange: onChange
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.minMax,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "caption/regular",
        children: `${PERCENTAGE_VALUE_MIN}%`
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "caption/regular",
        children: `${PERCENTAGE_VALUE_MAX}%`
      })]
    })]
  });
};
exports.PercentageValueField = PercentageValueField;
const createStyles = theme => _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%'
  },
  minMax: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: MIN_MAX_OFFSET_TOP,
    paddingHorizontal: theme.space[1],
    width: '100%'
  },
  slider: {
    width: '100%'
  },
  value: {
    ...theme.typography.numbers.bold,
    color: theme.colors.text.primary
  },
  valueRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.space[1]
  }
});
//# sourceMappingURL=PercentageValueField.js.map