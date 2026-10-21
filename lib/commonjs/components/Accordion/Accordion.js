"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccordionItem = exports.AccordionGroup = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App open/close animation (ms). */
const FAST_EASE = {
  duration: 180,
  create: {
    type: _reactNative.LayoutAnimation.Types.easeInEaseOut,
    property: _reactNative.LayoutAnimation.Properties.opacity,
    duration: 120
  },
  update: {
    type: _reactNative.LayoutAnimation.Types.easeInEaseOut
  },
  delete: {
    type: _reactNative.LayoutAnimation.Types.easeInEaseOut,
    duration: 120
  }
};
const ANDROID_RIPPLE = {
  borderless: true
};
const AccordionContext = /*#__PURE__*/(0, _react.createContext)(null);
const createStyles = theme => _reactNative.StyleSheet.create({
  card: {
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.lg,
    borderWidth: theme.stroke[1],
    overflow: 'hidden'
  },
  // Applied after `containerStyle`, as in the app: the border color always wins.
  cardBorder: {
    borderColor: theme.colors.border.default
  },
  cardError: {
    borderColor: theme.colors.text.error
  },
  headerTouchable: {
    padding: theme.space[6]
  },
  expanded: {
    flex: 1,
    minHeight: 0,
    paddingHorizontal: theme.space[6]
  }
});

/** Controlled group: only one `AccordionItem` inside is open at a time. */
const AccordionGroup = ({
  children,
  openId,
  setOpenIdState,
  style
}) => {
  const setOpenId = (0, _react.useCallback)(id => {
    if (openId === id) {
      return;
    }
    _reactNative.LayoutAnimation.configureNext(FAST_EASE);
    setOpenIdState(id);
  }, [openId, setOpenIdState]);
  const value = (0, _react.useMemo)(() => ({
    openId,
    setOpenId
  }), [openId, setOpenId]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(AccordionContext.Provider, {
    value: value,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: style,
      children: children
    })
  });
};

/** Bordered card that shows `collapsed` when closed and `expanded` when open. */
exports.AccordionGroup = AccordionGroup;
const AccordionItem = exports.AccordionItem = /*#__PURE__*/(0, _react.memo)(function AccordionItem({
  id,
  collapsed,
  expanded,
  pressToToggle = true,
  containerStyle,
  collapsedPressableStyle,
  isError = false,
  pointerEvents
}) {
  const styles = (0, _index.useThemedStyles)(createStyles);
  const ctx = (0, _react.useContext)(AccordionContext);
  if (!ctx) {
    throw new Error('AccordionItem must be rendered inside <AccordionGroup>.');
  }
  const {
    openId,
    setOpenId
  } = ctx;
  const isOpen = openId === id;
  const open = (0, _react.useCallback)(() => {
    // setOpenId configures the layout animation.
    if (!isOpen) {
      setOpenId(id);
    }
  }, [id, isOpen, setOpenId]);
  const close = (0, _react.useCallback)(() => {
    if (isOpen) {
      setOpenId(null);
    }
  }, [isOpen, setOpenId]);
  const toggle = (0, _react.useCallback)(() => isOpen ? close() : open(), [isOpen, open, close]);
  const controls = {
    isOpen,
    open,
    close,
    toggle
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    pointerEvents: pointerEvents,
    style: [styles.card, containerStyle, isError ? styles.cardError : styles.cardBorder],
    children: !isOpen ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
      testID: `accordion.${id}`,
      onPress: pressToToggle ? toggle : undefined,
      accessibilityRole: pressToToggle ? 'button' : undefined,
      accessibilityState: pressToToggle ? {
        expanded: false
      } : undefined,
      style: [styles.headerTouchable, collapsedPressableStyle],
      android_ripple: ANDROID_RIPPLE,
      children: collapsed(controls)
    }) :
    /*#__PURE__*/
    // Visible as soon as it mounts. The open fades in through the layout
    // animation; a JS-started opacity animation could stay at 0 on iOS
    // until the next touch, leaving the open section blank.
    (0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.expanded,
      children: expanded(controls)
    })
  });
});
//# sourceMappingURL=Accordion.js.map