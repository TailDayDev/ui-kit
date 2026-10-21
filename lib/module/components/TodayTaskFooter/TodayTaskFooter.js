"use strict";

import { StyleSheet, View } from 'react-native';
import { IconEllipsisVertical } from "../../icons/figma/index.js";
import { Icon } from "../../primitives/Icon/index.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { IconSquareButton } from "../IconButton/index.js";
import { TodayCompletionSlider } from "../TodayCompletionSlider/index.js";
import { TodayDoorButton } from "../TodayDoorButton/index.js";
import { TodaySkippedAction } from "../TodaySkippedAction/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const createStyles = theme => StyleSheet.create({
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
export const TodayTaskFooter = props => {
  const {
    onMenuPress,
    menuAccessibilityLabel,
    isMenuDisabled = false,
    isMenuLoading = false,
    menuTestID,
    style,
    testID
  } = props;
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const isDoor = props.action === 'door';
  const renderAction = () => {
    switch (props.action) {
      case 'door':
        return /*#__PURE__*/_jsx(TodayDoorButton, {
          ...props.doorProps,
          style: [styles.door, props.doorProps.style]
        });
      case 'skipped':
        return /*#__PURE__*/_jsx(TodaySkippedAction, {
          ...props.skippedProps
        });
      default:
        return /*#__PURE__*/_jsx(TodayCompletionSlider, {
          ...props.sliderProps
        });
    }
  };
  return /*#__PURE__*/_jsxs(View, {
    testID: testID,
    style: [styles.footer, isDoor && styles.doorFooter, style],
    children: [/*#__PURE__*/_jsx(IconSquareButton, {
      size: theme.space[12],
      icon: /*#__PURE__*/_jsx(Icon, {
        icon: IconEllipsisVertical
      }),
      onPress: onMenuPress,
      disabled: isMenuDisabled,
      loading: isMenuLoading,
      accessibilityLabel: menuAccessibilityLabel,
      testID: menuTestID
    }), renderAction()]
  });
};
//# sourceMappingURL=TodayTaskFooter.js.map