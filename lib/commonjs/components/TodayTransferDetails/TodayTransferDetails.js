"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayTransferDetails = void 0;
var _reactNative = require("react-native");
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../primitives/Icon/index.js");
var _index3 = require("../../primitives/Text/index.js");
var _index4 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma TodayTransferDetails › Картинка места: 24×24 image.
const IMAGE_SIZE = 24;
// Figma TodayTransferDetails › Откуда и куда: 56pt row (8 + 40 content + 8).
const ROW_MIN_HEIGHT = 56;
// Figma TodayTransferDetails › Стрелка: 32pt circle centered on the divider.
const ARROW_SIZE = 32;
// Figma TodayTransferDetails › chevron-right: 20pt glyph.
const ARROW_ICON_SIZE = 20;
const HALF = 2;
const createStyles = theme => _reactNative.StyleSheet.create({
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
const TodayTransferDetails = ({
  fromTitle,
  toTitle,
  fromImage,
  toImage,
  style,
  testID
}) => {
  const styles = (0, _index4.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    testID: testID,
    style: [styles.block, style],
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      testID: testID ? `${testID}.row` : undefined,
      style: styles.row,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        testID: testID ? `${testID}.from` : undefined,
        style: [styles.placement, styles.from],
        children: [fromImage ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.image,
          children: fromImage
        }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Text, {
          variant: "body/bold",
          style: styles.title,
          children: fromTitle
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.divider
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        testID: testID ? `${testID}.to` : undefined,
        style: [styles.placement, styles.to],
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Text, {
          variant: "body/bold",
          align: "right",
          style: styles.title,
          children: toTitle
        }), toImage ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.image,
          children: toImage
        }) : null]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        testID: testID ? `${testID}.arrow` : undefined,
        style: styles.arrow,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
          icon: _index.IconChevronRight,
          size: ARROW_ICON_SIZE,
          color: "accent"
        })
      })]
    })
  });
};
exports.TodayTransferDetails = TodayTransferDetails;
//# sourceMappingURL=TodayTransferDetails.js.map