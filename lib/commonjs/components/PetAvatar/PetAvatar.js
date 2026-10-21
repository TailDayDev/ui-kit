"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetAvatar = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _PetAvatarTypes = require("./PetAvatar.types.js");
var _jsxRuntime = require("react/jsx-runtime");
const styles = _reactNative.StyleSheet.create({
  frame: {
    backgroundColor: 'transparent',
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    width: '100%'
  }
});
const PetAvatarComponent = ({
  accessibilityLabel,
  cache,
  photoUrl,
  photoCacheKey,
  shape = 'circle',
  size = 'l',
  placeholder,
  renderImage,
  testID
}) => {
  const theme = (0, _index.useTheme)();
  const [failedUri, setFailedUri] = (0, _react.useState)(null);
  const dimension = _PetAvatarTypes.PET_AVATAR_SIZES[size];
  const borderRadius = shape === 'circle' ? dimension / 2 : theme.radius.sm;
  const uri = photoUrl?.trim() ?? '';
  const frameStyle = (0, _react.useMemo)(() => ({
    borderRadius,
    height: dimension,
    width: dimension
  }), [borderRadius, dimension]);
  (0, _react.useEffect)(() => {
    setFailedUri(null);
  }, [uri]);
  const placeholderNode = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.fill,
    testID: testID ? `${testID}.placeholder` : undefined,
    children: placeholder
  });
  const renderContent = () => {
    if (renderImage) {
      return renderImage({
        uri,
        size: dimension,
        borderRadius,
        cache,
        photoCacheKey: uri ? photoCacheKey : undefined,
        placeholder: placeholderNode
      });
    }
    if (!uri || failedUri === uri) {
      return placeholderNode;
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
      source: {
        uri,
        cache
      },
      style: [_reactNative.StyleSheet.absoluteFill, {
        borderRadius
      }],
      resizeMode: "cover",
      onError: () => setFailedUri(uri),
      testID: testID ? `${testID}.photo` : undefined
    });
  };
  const isLabelled = Boolean(accessibilityLabel);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    accessible: isLabelled,
    accessibilityRole: isLabelled ? 'image' : undefined,
    accessibilityLabel: accessibilityLabel,
    style: [styles.frame, frameStyle],
    testID: testID,
    children: renderContent()
  });
};

/** Pet photo in a circle or rounded square; shows `placeholder` without a photo. */
const PetAvatar = exports.PetAvatar = /*#__PURE__*/(0, _react.memo)(PetAvatarComponent);
//# sourceMappingURL=PetAvatar.js.map