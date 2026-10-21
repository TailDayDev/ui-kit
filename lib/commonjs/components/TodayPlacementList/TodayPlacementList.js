"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayPlacementList = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma TodayPlacementList › Картинка места: 16×16 image.
const IMAGE_SIZE = 16;
const createStyles = theme => _reactNative.StyleSheet.create({
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
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
  testID: testID,
  style: style,
  children: [image ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: imageStyle,
    children: image
  }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
    variant: "caption/regular",
    color: "secondary",
    numberOfLines: 1,
    ellipsizeMode: "tail",
    style: titleStyle,
    children: title
  })]
});

/** One or two placements of a pet in a row (Figma `TodayPlacementList`). */
const TodayPlacementList = ({
  itemsCount = 1,
  title,
  image,
  secondTitle = '',
  secondImage,
  style,
  testID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const isPair = itemsCount === 2;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    testID: testID,
    style: [styles.row, style],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(PlacementItem, {
      title: title,
      image: image,
      style: [styles.item, isPair ? styles.firstOfTwo : styles.single],
      imageStyle: styles.image,
      titleStyle: styles.title,
      testID: testID ? `${testID}.item1` : undefined
    }), isPair ? /*#__PURE__*/(0, _jsxRuntime.jsx)(PlacementItem, {
      title: secondTitle,
      image: secondImage,
      style: [styles.item, styles.secondOfTwo],
      imageStyle: styles.image,
      titleStyle: styles.title,
      testID: testID ? `${testID}.item2` : undefined
    }) : null]
  });
};
exports.TodayPlacementList = TodayPlacementList;
//# sourceMappingURL=TodayPlacementList.js.map