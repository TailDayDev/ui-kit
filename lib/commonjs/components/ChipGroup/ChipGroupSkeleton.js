"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChipGroupSkeleton = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../BaseSkeleton/index.js");
var _chipGroupVariantConfig = require("./chipGroupVariantConfig.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App placeholder chip widths. */const SKELETON_CHIP_WIDTHS = [40, 90, 50, 90];
const styles = _reactNative.StyleSheet.create({
  content: {
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  }
});
const ChipGroupSkeletonComponent = ({
  variant = 'compact'
}) => {
  const config = (0, _chipGroupVariantConfig.getChipGroupVariantConfig)(variant);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: [styles.content, {
      minHeight: config.itemHeight,
      paddingHorizontal: config.contentPaddingHorizontal
    }],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.row, {
        columnGap: config.gap
      }],
      children: SKELETON_CHIP_WIDTHS.map((width, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.BaseSkeleton
      // Static placeholder list; widths repeat, so position is the key.
      , {
        height: config.itemHeight,
        width: width,
        borderRadius: config.chipBorderRadius
      }, index))
    })
  });
};

/** Placeholder row shown while the chips load. */
const ChipGroupSkeleton = exports.ChipGroupSkeleton = /*#__PURE__*/(0, _react.memo)(ChipGroupSkeletonComponent);
//# sourceMappingURL=ChipGroupSkeleton.js.map