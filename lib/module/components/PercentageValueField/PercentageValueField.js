"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { SyncedTextInput } from "../SyncedTextInput/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const PERCENTAGE_VALUE_MAX = 100;
const PERCENTAGE_VALUE_MIN = 0;
const PERCENTAGE_VALUE_STEP = 1;
/** The min/max labels tuck under the slider's bottom margin (app value). */
const MIN_MAX_OFFSET_TOP = -16;
export const clampPercentageValue = value => Math.min(PERCENTAGE_VALUE_MAX, Math.max(PERCENTAGE_VALUE_MIN, value));
export const isPercentageValueInput = value => Number.isInteger(value);

/**
 * Large percentage value with a slider and 0 % / 100 % labels
 * (app `shared/ui/percentage-value-field`). The slider comes from `renderSlider`.
 */
export const PercentageValueField = ({
  value,
  onChange,
  renderSlider,
  testID,
  accessibilityLabel
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.valueRow,
      children: [/*#__PURE__*/_jsx(SyncedTextInput, {
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
      }), /*#__PURE__*/_jsx(Text, {
        variant: "numbers/bold",
        children: "%"
      })]
    }), /*#__PURE__*/_jsx(View, {
      style: styles.slider,
      children: renderSlider({
        min: PERCENTAGE_VALUE_MIN,
        max: PERCENTAGE_VALUE_MAX,
        step: PERCENTAGE_VALUE_STEP,
        value,
        onValueChange: onChange
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.minMax,
      children: [/*#__PURE__*/_jsx(Text, {
        variant: "caption/regular",
        children: `${PERCENTAGE_VALUE_MIN}%`
      }), /*#__PURE__*/_jsx(Text, {
        variant: "caption/regular",
        children: `${PERCENTAGE_VALUE_MAX}%`
      })]
    })]
  });
};
const createStyles = theme => StyleSheet.create({
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