"use strict";

import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { PetOwnerAvatar } from "../PetOwnerAvatar/index.js";
import { TodayPlacementList } from "../TodayPlacementList/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// off-scale: the app pet block presses to 0.65, not the kit `opacity.pressed` (0.85).
const PRESSED_OPACITY = 0.65;
const IDLE_OPACITY = 1;
const createStyles = theme => StyleSheet.create({
  block: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[3],
    paddingBottom: 0,
    paddingLeft: theme.space[4],
    paddingRight: theme.space[4],
    paddingTop: theme.space[4]
  },
  text: {
    alignSelf: 'stretch',
    flex: 1,
    gap: theme.space[0.5],
    justifyContent: 'center',
    minWidth: 0
  }
});

/** Pet photo, name, breed and placement in a Today task card (Figma `TodayPetIdentity`). */
export const TodayPetIdentity = ({
  name,
  meta,
  hasPlacements = true,
  avatar,
  placements,
  onPress,
  accessibilityLabel,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  const isInteractive = Boolean(onPress);
  return /*#__PURE__*/_jsxs(Pressable, {
    testID: testID,
    onPress: onPress,
    disabled: !isInteractive,
    accessible: isInteractive,
    accessibilityRole: isInteractive ? 'button' : undefined,
    accessibilityLabel: isInteractive ? accessibilityLabel ?? name : undefined,
    style: ({
      pressed
    }) => [styles.block, {
      opacity: isInteractive && pressed ? PRESSED_OPACITY : IDLE_OPACITY
    }, style],
    children: [/*#__PURE__*/_jsx(PetOwnerAvatar, {
      size: 64,
      ...avatar,
      testID: avatar.testID ?? (testID ? `${testID}.avatar` : undefined)
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.text,
      children: [/*#__PURE__*/_jsx(Text, {
        variant: "headline/bold",
        numberOfLines: 1,
        children: name
      }), meta ? /*#__PURE__*/_jsx(Text, {
        variant: "caption/regular",
        color: "secondary",
        numberOfLines: 1,
        children: meta
      }) : null, hasPlacements && placements ? /*#__PURE__*/_jsx(TodayPlacementList, {
        ...placements
      }) : null]
    })]
  });
};
//# sourceMappingURL=TodayPetIdentity.js.map