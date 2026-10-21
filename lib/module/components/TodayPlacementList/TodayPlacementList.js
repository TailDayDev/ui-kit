"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma TodayPlacementList › Картинка места: 16×16 image.
const IMAGE_SIZE = 16;
const createStyles = theme => StyleSheet.create({
  firstOfTwo: {
    flexShrink: 1
  },
  image: {
    alignItems: 'center',
    height: IMAGE_SIZE,
    justifyContent: 'center',
    width: IMAGE_SIZE
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[1],
    minWidth: 0
  },
  row: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: theme.space[1]
  },
  secondOfTwo: {
    flexGrow: 1,
    flexShrink: 1
  },
  single: {
    flex: 1
  },
  title: {
    flexShrink: 1
  }
});
/** One placement: image + name (Figma `TodayPlacementList` itemsCount=1 content). */
const PlacementItem = ({
  title,
  image,
  style,
  imageStyle,
  titleStyle,
  testID
}) => /*#__PURE__*/_jsxs(View, {
  testID: testID,
  style: style,
  children: [image ? /*#__PURE__*/_jsx(View, {
    style: imageStyle,
    children: image
  }) : null, /*#__PURE__*/_jsx(Text, {
    variant: "caption/regular",
    color: "secondary",
    numberOfLines: 1,
    ellipsizeMode: "tail",
    style: titleStyle,
    children: title
  })]
});

/** One or two placements of a pet in a row (Figma `TodayPlacementList`). */
export const TodayPlacementList = ({
  itemsCount = 1,
  title,
  image,
  secondTitle = '',
  secondImage,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  const isPair = itemsCount === 2;
  return /*#__PURE__*/_jsxs(View, {
    testID: testID,
    style: [styles.row, style],
    children: [/*#__PURE__*/_jsx(PlacementItem, {
      title: title,
      image: image,
      style: [styles.item, isPair ? styles.firstOfTwo : styles.single],
      imageStyle: styles.image,
      titleStyle: styles.title,
      testID: testID ? `${testID}.item1` : undefined
    }), isPair ? /*#__PURE__*/_jsx(PlacementItem, {
      title: secondTitle,
      image: secondImage,
      style: [styles.item, styles.secondOfTwo],
      imageStyle: styles.image,
      titleStyle: styles.title,
      testID: testID ? `${testID}.item2` : undefined
    }) : null]
  });
};
//# sourceMappingURL=TodayPlacementList.js.map