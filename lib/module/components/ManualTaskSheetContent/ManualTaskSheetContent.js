"use strict";

import { StyleSheet, View } from 'react-native';
import { IconClock3, IconPawPrint, IconUser } from "../../icons/figma/index.js";
import { Icon } from "../../primitives/Icon/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { FieldRow } from "../FieldRow/index.js";
import { Textarea } from "../Textarea/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma ManualTaskSheetContent › Textarea › Поле: 104 high (120 with the counter).
const TITLE_FIELD_HEIGHT = 104;
const createStyles = theme => {
  const counterGap = theme.space[1];
  const counterLineHeight = theme.typography.smallCaption.medium.lineHeight ?? 0;
  // The kit Textarea draws its counter absolutely under the field (and keeps
  // a 16pt margin for it); pin it at the Figma gap (4) + counter line (12).
  const counterSpace = counterGap + counterLineHeight;
  return StyleSheet.create({
    container: {
      gap: theme.space[6],
      paddingHorizontal: theme.space[6]
    },
    rows: {
      gap: theme.space[2]
    },
    titleCounter: {
      ...theme.typography.smallCaption.medium,
      bottom: -counterSpace,
      paddingTop: 0
    },
    titleField: {
      height: TITLE_FIELD_HEIGHT,
      justifyContent: 'flex-start',
      // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
      paddingBottom: theme.space[3] - theme.stroke[1],
      paddingLeft: theme.space[4] - theme.stroke[1],
      paddingRight: theme.space[3] - theme.stroke[1],
      paddingTop: theme.space[3] - theme.stroke[1]
    },
    titleLabel: {
      color: theme.colors.text.secondary
    }
  });
};

/**
 * Body of the manual task sheet (Figma `ManualTaskSheetContent`). The parent
 * owns the draft and opens the pickers from the row callbacks.
 */
export const ManualTaskSheetContent = ({
  title,
  onTitleChange,
  titleMaxLength,
  isTitleAutoFocused = false,
  onTitleFocus,
  labels,
  dueValue,
  isDueEmpty = true,
  onDuePress,
  petValue,
  isPetEmpty = true,
  onPetPress,
  staffValue,
  isStaffEmpty = true,
  onStaffPress,
  testIDs,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(View, {
    testID: testID,
    style: [styles.container, style],
    children: [/*#__PURE__*/_jsx(Textarea, {
      testID: testIDs?.title,
      value: title,
      setValue: onTitleChange,
      label: labels.title,
      placeholder: labels.titlePlaceholder,
      maxLength: titleMaxLength,
      autoFocus: isTitleAutoFocused,
      onFocus: onTitleFocus,
      containerStyle: styles.titleField,
      labelStyle: styles.titleLabel,
      counterStyle: styles.titleCounter
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.rows,
      children: [/*#__PURE__*/_jsx(FieldRow, {
        testID: testIDs?.due,
        icon: /*#__PURE__*/_jsx(Icon, {
          icon: IconClock3
        }),
        label: labels.due,
        value: dueValue,
        isEmpty: isDueEmpty,
        onPress: onDuePress
      }), /*#__PURE__*/_jsx(FieldRow, {
        testID: testIDs?.pet,
        icon: /*#__PURE__*/_jsx(Icon, {
          icon: IconPawPrint
        }),
        label: labels.pet,
        value: petValue,
        isEmpty: isPetEmpty,
        onPress: onPetPress
      }), /*#__PURE__*/_jsx(FieldRow, {
        testID: testIDs?.staff,
        icon: /*#__PURE__*/_jsx(Icon, {
          icon: IconUser
        }),
        label: labels.staff,
        value: staffValue,
        isEmpty: isStaffEmpty,
        onPress: onStaffPress
      })]
    })]
  });
};
//# sourceMappingURL=ManualTaskSheetContent.js.map