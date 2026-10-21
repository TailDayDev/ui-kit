"use strict";

import { StyleSheet, View } from 'react-native';
import { IconChevronRight } from "../../icons/figma/index.js";
import { Icon } from "../../primitives/Icon/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma TodayTransferDetails › Картинка места: 24×24 image.
const IMAGE_SIZE = 24;
// Figma TodayTransferDetails › Откуда и куда: 56pt row (8 + 40 content + 8).
const ROW_MIN_HEIGHT = 56;
// Figma TodayTransferDetails › Стрелка: 32pt circle centered on the divider.
const ARROW_SIZE = 32;
// Figma TodayTransferDetails › chevron-right: 20pt glyph.
const ARROW_ICON_SIZE = 20;
const HALF = 2;
const createStyles = theme => StyleSheet.create({
  arrow: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.full,
    borderWidth: theme.stroke[1],
    height: ARROW_SIZE,
    justifyContent: 'center',
    left: '50%',
    marginLeft: -ARROW_SIZE / HALF,
    marginTop: -ARROW_SIZE / HALF,
    position: 'absolute',
    top: '50%',
    width: ARROW_SIZE
  },
  block: {
    gap: theme.space[3],
    justifyContent: 'center',
    padding: theme.space[4]
  },
  divider: {
    alignSelf: 'stretch',
    backgroundColor: theme.colors.border.default,
    width: theme.stroke[1]
  },
  from: {
    paddingBottom: theme.space[2],
    paddingLeft: theme.space[2],
    paddingRight: theme.space[5],
    paddingTop: theme.space[2]
  },
  image: {
    alignItems: 'center',
    height: IMAGE_SIZE,
    justifyContent: 'center',
    width: IMAGE_SIZE
  },
  placement: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: theme.space[2],
    minWidth: 0
  },
  row: {
    alignItems: 'center',
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    minHeight: ROW_MIN_HEIGHT
  },
  title: {
    flex: 1
  },
  to: {
    justifyContent: 'flex-end',
    paddingBottom: theme.space[2],
    paddingLeft: theme.space[5],
    paddingRight: theme.space[2],
    paddingTop: theme.space[2]
  }
});

/** From → to placements in a bordered row with a round arrow (Figma `TodayTransferDetails`). */
export const TodayTransferDetails = ({
  fromTitle,
  toTitle,
  fromImage,
  toImage,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsx(View, {
    testID: testID,
    style: [styles.block, style],
    children: /*#__PURE__*/_jsxs(View, {
      testID: testID ? `${testID}.row` : undefined,
      style: styles.row,
      children: [/*#__PURE__*/_jsxs(View, {
        testID: testID ? `${testID}.from` : undefined,
        style: [styles.placement, styles.from],
        children: [fromImage ? /*#__PURE__*/_jsx(View, {
          style: styles.image,
          children: fromImage
        }) : null, /*#__PURE__*/_jsx(Text, {
          variant: "body/bold",
          style: styles.title,
          children: fromTitle
        })]
      }), /*#__PURE__*/_jsx(View, {
        style: styles.divider
      }), /*#__PURE__*/_jsxs(View, {
        testID: testID ? `${testID}.to` : undefined,
        style: [styles.placement, styles.to],
        children: [/*#__PURE__*/_jsx(Text, {
          variant: "body/bold",
          align: "right",
          style: styles.title,
          children: toTitle
        }), toImage ? /*#__PURE__*/_jsx(View, {
          style: styles.image,
          children: toImage
        }) : null]
      }), /*#__PURE__*/_jsx(View, {
        testID: testID ? `${testID}.arrow` : undefined,
        style: styles.arrow,
        children: /*#__PURE__*/_jsx(Icon, {
          icon: IconChevronRight,
          size: ARROW_ICON_SIZE,
          color: "accent"
        })
      })]
    })
  });
};
//# sourceMappingURL=TodayTransferDetails.js.map