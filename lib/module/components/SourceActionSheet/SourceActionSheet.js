"use strict";

import { StyleSheet, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { ActionListRow } from "../ActionListRow/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const createStyles = theme => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg.surface,
    paddingHorizontal: theme.space[6],
    paddingVertical: theme.space[1]
  },
  cardRowSpacing: {
    marginBottom: theme.space[2]
  }
});

/**
 * Body of an action sheet (camera / gallery / delete…): a column of
 * `ActionListRow`s. Put it inside the app's modal; it does not open one.
 */
export const SourceActionSheet = ({
  actions,
  onClose,
  closeOnAction = true,
  variant = 'trailing-icon',
  containerStyle,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  const isCardVariant = variant.startsWith('card-');
  const handlePressAction = action => {
    if (closeOnAction) {
      onClose();
    }
    action.onPress();
  };
  return /*#__PURE__*/_jsx(View, {
    testID: testID,
    style: [styles.container, containerStyle],
    children: actions.map((action, index) => {
      const isLast = index === actions.length - 1;
      return /*#__PURE__*/_jsx(ActionListRow, {
        title: action.title,
        description: action.description,
        variant: variant,
        leading: action.icon,
        trailing: action.trailing,
        isDanger: action.isDanger,
        isDisabled: action.isDisabled,
        showDivider: !isCardVariant && !isLast,
        style: isCardVariant && !isLast ? styles.cardRowSpacing : undefined,
        testID: action.testID,
        onPress: () => handlePressAction(action)
      }, action.id);
    })
  });
};
//# sourceMappingURL=SourceActionSheet.js.map