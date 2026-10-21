"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultipleResultsList = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../Button/index.js");
var _index4 = require("../Card/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App accommodation image / placeholder side. */
const IMAGE_SIZE = 40;
/** App edit button height (off-scale: matches the `extraSmall` button). */
const EDIT_BUTTON_HEIGHT = 28;
/** App colored side bar width. */
const SIDE_BAR_WIDTH = 4;
/** App side bar end radius (off-scale: below `radius.sm`). */
const SIDE_BAR_RADIUS = 2;
const noop = () => undefined;
const createStyles = theme => _reactNative.StyleSheet.create({
  multipleCard: {
    gap: 0,
    minHeight: 'auto'
  },
  header: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.space[3]
  },
  title: {
    marginBottom: theme.space[5]
  },
  editButton: {
    height: EDIT_BUTTON_HEIGHT
  },
  editButtonText: {
    ...theme.typography.caption.medium
  },
  multipleCardColumn: {
    flex: 1
  },
  multipleCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: theme.space[3],
    minHeight: IMAGE_SIZE
  },
  petBookRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    minHeight: IMAGE_SIZE,
    width: '100%',
    paddingVertical: theme.space[3]
  },
  firstRow: {
    paddingTop: 0
  },
  lastRow: {
    paddingBottom: 0
  },
  iconWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    flexShrink: 1,
    gap: theme.space[4]
  },
  iconPlaceholder: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE
  },
  textWrapper: {
    flex: 1,
    flexShrink: 1,
    gap: theme.space[1]
  },
  sideBar: {
    height: '100%',
    width: SIDE_BAR_WIDTH,
    backgroundColor: theme.colors.bg.accent
  },
  sideBarFirst: {
    borderTopRightRadius: SIDE_BAR_RADIUS,
    borderTopLeftRadius: SIDE_BAR_RADIUS
  },
  sideBarOdd: {
    backgroundColor: theme.palette.secondary
  },
  sideBarLast: {
    borderBottomRightRadius: SIDE_BAR_RADIUS,
    borderBottomLeftRadius: SIDE_BAR_RADIUS
  },
  petBookRight: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.space[1]
  },
  petBookRightCentered: {
    alignItems: 'center'
  },
  petBookPeriodColumn: {
    gap: theme.space[1],
    alignItems: 'flex-end'
  },
  petBookPeriodLabel: {
    marginRight: theme.space[0.25],
    paddingBottom: theme.space[0.25],
    textTransform: 'lowercase'
  },
  divider: {
    height: theme.stroke[1],
    backgroundColor: theme.colors.border.default,
    width: '100%'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.space[4],
    marginTop: theme.space[3],
    borderTopWidth: theme.stroke[1],
    borderTopColor: theme.colors.border.default,
    flex: 1,
    width: '100%'
  }
});

/** Card listing several accommodation bookings with dates, prices and an optional total. */
const MultipleResultsList = ({
  title,
  items,
  labels,
  onEdit,
  isSingleDateCentered = false,
  totalValue,
  totalLabel
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const lastIndex = items.length - 1;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index4.Card, {
    style: styles.multipleCard,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.header,
      children: [title ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "headline/bold",
        style: styles.title,
        children: title
      }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Button, {
        title: labels.edit,
        style: "softGray",
        size: "small",
        restStyle: styles.editButton,
        textStyle: styles.editButtonText,
        onPress: onEdit ?? noop
      })]
    }), items.map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.multipleCardRow,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.multipleCardColumn,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: [styles.petBookRow, index === 0 && styles.firstRow, index === lastIndex && styles.lastRow],
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.iconWrapper,
            children: [item.image ?? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.iconPlaceholder
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.textWrapper,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
                variant: "body/bold",
                children: item.title
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
                variant: "smallCaption/regular",
                color: "secondary",
                children: item.priceText
              })]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: [styles.petBookRight, isSingleDateCentered && item.dates.length <= 1 ? styles.petBookRightCentered : null],
            children: [item.isRange ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.petBookPeriodColumn,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
                variant: "caption/regular",
                style: styles.petBookPeriodLabel,
                children: labels.from
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
                variant: "caption/regular",
                style: styles.petBookPeriodLabel,
                children: labels.to
              })]
            }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.petBookPeriodColumn,
              children: item.dates.map((date, dateIndex) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
                variant: "body/bold",
                children: date
              }, `${date}:${dateIndex}`))
            })]
          })]
        }), index < lastIndex ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.divider
        }) : null]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.sideBar, index === 0 && styles.sideBarFirst, index % 2 === 1 && styles.sideBarOdd, index === lastIndex && styles.sideBarLast]
      })]
    }, item.key ?? `row-${index}`)), totalValue !== undefined ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.totalRow,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "body/medium",
        children: totalLabel
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "body/regular",
        children: totalValue
      })]
    }) : null]
  });
};
exports.MultipleResultsList = MultipleResultsList;
//# sourceMappingURL=MultipleResultsList.js.map