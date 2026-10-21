"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayMultiPetSummary = void 0;
var _reactNative = require("react-native");
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../primitives/Icon/index.js");
var _index3 = require("../../primitives/Text/index.js");
var _index4 = require("../../theme/index.js");
var _index5 = require("../IconButton/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma TodayMultiPetSummary › Фото питомца: 64×64 circle.
const PHOTO_SIZE = 64;
// Figma TodayMultiPetSummary › Заглушка: 32×32 no-photo artwork.
const NO_PHOTO_IMAGE_SIZE = 32;
// Figma TodayMultiPetSummary › Кнопка · подробнее: 24×24 IconRoundButton
// (the instance is named size=28 but is drawn 24pt: 16pt glyph + 4pt padding).
const DETAILS_BUTTON_SIZE = 24;
// Figma TodayMultiPetSummary › Кнопка · подробнее › chevron-right: 16×16.
const DETAILS_ICON_SIZE = 16;
// off-scale: pressed feedback of the details control, same as the app icon buttons.
const DETAILS_PRESSED_OPACITY = 0.9;
const IDLE_OPACITY = 1;
const createStyles = theme => {
  // Figma draws the 4pt white ring OUTSIDE the 64pt circle; RN borders are
  // inside, so the ring frame is 72pt and pulled back by 4pt on every side.
  const ring = theme.stroke[4];
  return _reactNative.StyleSheet.create({
    block: {
      alignItems: 'center',
      borderRadius: theme.radius.lg,
      gap: theme.space[2],
      paddingBottom: theme.space[2],
      paddingLeft: theme.space[4],
      paddingRight: theme.space[4],
      paddingTop: theme.space[4]
    },
    details: {
      alignItems: 'center',
      borderRadius: theme.radius.sm,
      flexDirection: 'row',
      gap: theme.space[2],
      justifyContent: 'center',
      paddingBottom: theme.space[1],
      paddingLeft: theme.space[3],
      paddingRight: theme.space[1],
      paddingTop: theme.space[1]
    },
    extra: {
      backgroundColor: theme.palette.secondary
    },
    noPhoto: {
      backgroundColor: theme.colors.bg.subtle
    },
    noPhotoImage: {
      alignItems: 'center',
      height: NO_PHOTO_IMAGE_SIZE,
      justifyContent: 'center',
      width: NO_PHOTO_IMAGE_SIZE
    },
    overlap: {
      marginLeft: theme.space.neg2 - ring
    },
    photo: {
      alignItems: 'center',
      borderColor: theme.colors.bg.surface,
      borderRadius: theme.radius.full,
      borderWidth: ring,
      height: PHOTO_SIZE + ring * 2,
      justifyContent: 'center',
      margin: -ring,
      overflow: 'hidden',
      width: PHOTO_SIZE + ring * 2
    },
    photoContent: {
      alignItems: 'center',
      height: PHOTO_SIZE,
      justifyContent: 'center',
      overflow: 'hidden',
      width: PHOTO_SIZE
    },
    stack: {
      alignItems: 'center',
      flexDirection: 'row',
      height: PHOTO_SIZE
    }
  });
};

/** Stack of pet photos with a "show details" control (Figma `TodayMultiPetSummary`). */
const TodayMultiPetSummary = ({
  pets,
  extraCount,
  noPhotoImage,
  detailsLabel,
  onDetailsPress,
  detailsTestID,
  style,
  testID
}) => {
  const styles = (0, _index4.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    testID: testID,
    style: [styles.block, style],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.stack,
      children: [pets.map((pet, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        testID: testID ? `${testID}.pet.${pet.id}` : undefined,
        accessible: Boolean(pet.accessibilityLabel),
        accessibilityRole: pet.accessibilityLabel ? 'image' : undefined,
        accessibilityLabel: pet.accessibilityLabel,
        style: [styles.photo, index > 0 ? styles.overlap : null, pet.photo ? null : styles.noPhoto],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.photoContent,
          children: pet.photo ?? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.noPhotoImage,
            children: noPhotoImage
          })
        })
      }, pet.id)), extraCount ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        testID: testID ? `${testID}.extra` : undefined,
        style: [styles.photo, pets.length > 0 ? styles.overlap : null, styles.extra],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Text, {
          variant: "headline/medium",
          color: "inverse",
          align: "center",
          children: extraCount
        })
      }) : null]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Pressable, {
      testID: detailsTestID,
      onPress: onDetailsPress,
      disabled: !onDetailsPress,
      accessibilityRole: "button",
      accessibilityLabel: detailsLabel,
      accessibilityState: {
        disabled: !onDetailsPress
      },
      style: ({
        pressed
      }) => [styles.details, {
        opacity: pressed ? DETAILS_PRESSED_OPACITY : IDLE_OPACITY
      }],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Text, {
        variant: "body/regular",
        children: detailsLabel
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        pointerEvents: "none",
        accessibilityElementsHidden: true,
        importantForAccessibility: "no-hide-descendants",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.IconRoundButton, {
          size: DETAILS_BUTTON_SIZE,
          accessibilityLabel: detailsLabel,
          icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
            icon: _index.IconChevronRight,
            size: DETAILS_ICON_SIZE
          })
        })
      })]
    })]
  });
};
exports.TodayMultiPetSummary = TodayMultiPetSummary;
//# sourceMappingURL=TodayMultiPetSummary.js.map