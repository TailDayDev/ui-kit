"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { Card } from "../Card/index.js";
import { LabeledDetailRow } from "../LabeledDetailRow/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const createStyles = theme => StyleSheet.create({
  footer: {
    marginTop: theme.space[4]
  },
  header: {
    marginBottom: theme.space[4]
  },
  headerDivider: {
    backgroundColor: theme.colors.border.default,
    height: theme.stroke[1],
    width: '100%'
  },
  headerWithDivider: {
    gap: theme.space[3],
    marginBottom: theme.space[3]
  }
});
const isMessageProps = props => 'message' in props;

/** Card with label / value contact rows (or a message / empty text). */
export const ContactDetailsCard = props => {
  const {
    disabled,
    title,
    testID,
    withShadow = false,
    header,
    hasHeaderDivider = false,
    footer,
    onPress
  } = props;
  const styles = useThemedStyles(createStyles);
  if (isMessageProps(props)) {
    return /*#__PURE__*/_jsx(Card, {
      title: title,
      disabled: disabled,
      testID: testID,
      withShadow: withShadow,
      onPress: onPress,
      children: /*#__PURE__*/_jsx(Text, {
        color: "secondary",
        children: props.message
      })
    });
  }
  const {
    emptyText,
    rows
  } = props;
  const isHeaderDividerVisible = hasHeaderDivider && rows.length > 0;
  return /*#__PURE__*/_jsxs(Card, {
    title: title,
    disabled: disabled,
    testID: testID,
    withShadow: withShadow,
    onPress: onPress,
    children: [header ? /*#__PURE__*/_jsxs(View, {
      style: [styles.header, isHeaderDividerVisible ? styles.headerWithDivider : null],
      children: [header, isHeaderDividerVisible ? /*#__PURE__*/_jsx(View, {
        style: styles.headerDivider
      }) : null]
    }) : null, rows.length ? /*#__PURE__*/_jsx(View, {
      children: rows.map((row, index) => /*#__PURE__*/_jsx(LabeledDetailRow, {
        label: row.label,
        value: row.value,
        description: row.description,
        isLast: index === rows.length - 1,
        isValueNarrow: row.isValueNarrow,
        onPress: row.onPress,
        onValuePress: row.onValuePress,
        testID: row.testID,
        valueTestID: row.valueTestID
      }, row.id))
    }) : /*#__PURE__*/_jsx(Text, {
      color: "secondary",
      children: emptyText
    }), footer ? /*#__PURE__*/_jsx(View, {
      style: styles.footer,
      children: footer
    }) : null]
  });
};
//# sourceMappingURL=ContactDetailsCard.js.map