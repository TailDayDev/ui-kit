"use strict";

import { Fragment } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Width of the value column in narrow mode (app value). */
const NARROW_VALUE_WIDTH = '77%';
/** Extra touch area around a tappable value. */
const VALUE_HIT_SLOP = 4;
/** Maximum value lines. */
const VALUE_NUMBER_OF_LINES = 2;
const createStyles = theme => StyleSheet.create({
  description: {
    width: '100%'
  },
  divider: {
    backgroundColor: theme.colors.border.default,
    height: theme.stroke[1],
    marginVertical: theme.space[3]
  },
  label: {
    flexShrink: 0
  },
  row: {
    gap: theme.space[1],
    width: '100%'
  },
  topRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: theme.space[2],
    width: '100%'
  },
  valueContainer: {
    flex: 1,
    minWidth: 0
  },
  valueContainerNarrow: {
    flex: 0,
    marginLeft: 'auto',
    width: NARROW_VALUE_WIDTH
  },
  valuePressable: {
    alignSelf: 'flex-end',
    flexGrow: 0,
    flexShrink: 1,
    maxWidth: '100%'
  }
});

/** Label / value detail row with a divider after it (unless `isLast`). */
export const LabeledDetailRow = ({
  label,
  value,
  description,
  isLast,
  isValueNarrow = false,
  onPress,
  onValuePress,
  testID,
  valueTestID
}) => {
  const styles = useThemedStyles(createStyles);
  const handlePress = event => {
    event.stopPropagation();
    onPress?.();
  };
  const handleValuePress = event => {
    event.stopPropagation();
    onValuePress?.();
  };
  return /*#__PURE__*/_jsxs(Fragment, {
    children: [/*#__PURE__*/_jsxs(Pressable, {
      style: styles.row,
      testID: testID,
      disabled: !onPress,
      onPress: handlePress,
      accessibilityRole: onPress ? 'button' : undefined,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.topRow,
        children: [/*#__PURE__*/_jsx(Text, {
          variant: "body/regular",
          style: styles.label,
          numberOfLines: 1,
          ellipsizeMode: "tail",
          children: label
        }), /*#__PURE__*/_jsx(View, {
          style: [styles.valueContainer, isValueNarrow ? styles.valueContainerNarrow : null],
          children: /*#__PURE__*/_jsx(Pressable, {
            disabled: !onValuePress,
            hitSlop: VALUE_HIT_SLOP,
            onPress: handleValuePress,
            style: styles.valuePressable,
            testID: valueTestID,
            accessibilityRole: onValuePress ? 'button' : undefined,
            children: /*#__PURE__*/_jsx(Text, {
              variant: "body/regular",
              color: "accent",
              align: "right",
              numberOfLines: VALUE_NUMBER_OF_LINES,
              children: value
            })
          })
        })]
      }), description ? /*#__PURE__*/_jsx(Text, {
        variant: "caption/regular",
        color: "secondary",
        style: styles.description,
        children: description
      }) : null]
    }), !isLast ? /*#__PURE__*/_jsx(View, {
      style: styles.divider
    }) : null]
  });
};
//# sourceMappingURL=LabeledDetailRow.js.map