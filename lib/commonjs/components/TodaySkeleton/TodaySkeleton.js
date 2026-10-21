"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodaySkeleton = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _index2 = require("../BaseSkeleton/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma TodaySkeleton: three "Карточка · заглушка" frames.
const CARD_COUNT = 3;
// Figma TodaySkeleton › Заголовок раздела · заглушка: frame height 44.
const SECTION_HEADER_HEIGHT = 44;
// Figma TodaySkeleton › Заглушка заголовка: 120×20.
const SECTION_TITLE_WIDTH = 120;
const SECTION_TITLE_HEIGHT = 20;
// Figma TodaySkeleton › Плашка: 140×32.
const BADGE_WIDTH = 140;
const BADGE_HEIGHT = 32;
// Figma TodaySkeleton › Круг: 40×40.
const AVATAR_SIZE = 40;
// Figma TodaySkeleton › Полоса (name): 140×16.
const NAME_BAR_WIDTH = 140;
const NAME_BAR_HEIGHT = 16;
// Figma TodaySkeleton › Полоса (breed): 90×12.
const BREED_BAR_WIDTH = 90;
const BREED_BAR_HEIGHT = 12;
// Figma TodaySkeleton › Полоса деталей: 256×16.
const DETAILS_BAR_WIDTH = 256;
const DETAILS_BAR_HEIGHT = 16;
// Figma TodaySkeleton › Полоса действия / Квадрат: height 48, square 48×48.
const FOOTER_CONTROL_SIZE = 48;
const CARD_KEYS = Array.from({
  length: CARD_COUNT
}, (_, index) => index);
const createStyles = theme => _reactNative.StyleSheet.create({
  avatarRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[3],
    paddingHorizontal: theme.space[4],
    paddingTop: theme.space[4]
  },
  card: {
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.lg,
    boxShadow: [...theme.shadows.block],
    paddingTop: theme.space[2]
  },
  container: {
    gap: theme.space[4],
    paddingHorizontal: theme.space[4]
  },
  details: {
    flexDirection: 'row',
    paddingHorizontal: theme.space[4]
  },
  footer: {
    flexDirection: 'row',
    gap: theme.space[3],
    paddingBottom: theme.space[4],
    paddingHorizontal: theme.space[4],
    paddingTop: theme.space[2]
  },
  footerAction: {
    flex: 1
  },
  nameColumn: {
    gap: theme.space[1]
  },
  sectionHeader: {
    height: SECTION_HEADER_HEIGHT,
    paddingTop: theme.space[4]
  }
});

/** One "Карточка · заглушка": badge, avatar + two bars, details bar, footer. */
const SkeletonCard = ({
  styles,
  theme
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
  style: styles.card,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.BaseSkeleton, {
    borderRadius: theme.radius.sm,
    height: BADGE_HEIGHT,
    width: BADGE_WIDTH
  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.avatarRow,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.BaseSkeleton, {
      borderRadius: theme.radius.full,
      height: AVATAR_SIZE,
      width: AVATAR_SIZE
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.nameColumn,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.BaseSkeleton, {
        borderRadius: theme.radius.sm,
        height: NAME_BAR_HEIGHT,
        width: NAME_BAR_WIDTH
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.BaseSkeleton, {
        borderRadius: theme.radius.sm,
        height: BREED_BAR_HEIGHT,
        width: BREED_BAR_WIDTH
      })]
    })]
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.details,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.BaseSkeleton, {
      borderRadius: theme.radius.sm,
      height: DETAILS_BAR_HEIGHT,
      width: DETAILS_BAR_WIDTH
    })
  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.footer,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.BaseSkeleton, {
      borderRadius: theme.radius.sm,
      height: FOOTER_CONTROL_SIZE,
      style: styles.footerAction
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.BaseSkeleton, {
      borderRadius: theme.radius.sm,
      height: FOOTER_CONTROL_SIZE,
      width: FOOTER_CONTROL_SIZE
    })]
  })]
});

/**
 * Loading placeholder of the Today feed (Figma `TodaySkeleton`): a section
 * title bar and three task-card placeholders built from kit `BaseSkeleton`
 * blocks (with its running shimmer).
 */
const TodaySkeleton = ({
  accessibilityLabel,
  style,
  testID
}) => {
  const theme = (0, _index.useTheme)();
  const styles = (0, _index.useThemedStyles)(createStyles);
  const isAnnounced = Boolean(accessibilityLabel);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    accessible: isAnnounced,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: isAnnounced ? 'progressbar' : undefined,
    accessibilityState: isAnnounced ? {
      busy: true
    } : undefined,
    style: [styles.container, style],
    testID: testID,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.sectionHeader,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.BaseSkeleton, {
        borderRadius: theme.radius.sm,
        height: SECTION_TITLE_HEIGHT,
        width: SECTION_TITLE_WIDTH
      })
    }), CARD_KEYS.map(key => /*#__PURE__*/(0, _jsxRuntime.jsx)(SkeletonCard, {
      styles: styles,
      theme: theme
    }, key))]
  });
};
exports.TodaySkeleton = TodaySkeleton;
//# sourceMappingURL=TodaySkeleton.js.map