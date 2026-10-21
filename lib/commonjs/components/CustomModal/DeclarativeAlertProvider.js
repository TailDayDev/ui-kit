"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dismissDeclarativeAlertsForTeardown = exports.DeclarativeAlertProvider = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _CloseIcon = require("../../icons/CloseIcon.js");
var _index = require("../../theme/index.js");
var _index2 = require("../Button/index.js");
var _index3 = require("../IconButton/index.js");
var _CustomModal = require("./CustomModal.js");
var _DeclarativeAlertContext = require("./DeclarativeAlertContext.js");
var _useModalPresence = require("./useModalPresence.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App alert close button and glyph. */const CLOSE_BUTTON_SIZE = 48;
const CLOSE_GLYPH_SIZE = 24;
/** App alert header height (off-scale). */
const HEADER_HEIGHT = 72;
/** App alert bottom padding (off-scale: not in Figma Spacing). */
const CONTENT_PADDING_BOTTOM = 53;
const teardownHandlers = new Set();

/**
 * Drops queued alerts and dismisses the current one without running any action.
 * For session teardown (logout), when the screens an alert closure refers to
 * are about to unmount.
 */
const dismissDeclarativeAlertsForTeardown = () => {
  [...teardownHandlers].forEach(handler => handler());
};

/**
 * Shows declarative alerts one at a time, FIFO. An alert is a modal layer of
 * its own, so it opens above whatever modal is on screen; the next one opens
 * after the previous has dismissed, and an action runs once its alert is gone.
 */
exports.dismissDeclarativeAlertsForTeardown = dismissDeclarativeAlertsForTeardown;
const DeclarativeAlertProvider = ({
  children,
  closeAccessibilityLabel,
  defaultErrorTitle
}) => {
  const theme = (0, _index.useTheme)();
  const styles = (0, _index.useThemedStyles)(createStyles);
  const [activeAlert, setActiveAlert] = (0, _react.useState)(null);
  const activeAlertRef = (0, _react.useRef)(null);
  const isAlertOnScreenRef = (0, _react.useRef)(false);
  const queuedAlertsRef = (0, _react.useRef)([]);
  const pendingActionRef = (0, _react.useRef)(null);
  const alertPresence = (0, _useModalPresence.useModalPresence)(activeAlert);
  const presentAlert = (0, _react.useCallback)(alert => {
    activeAlertRef.current = alert;
    isAlertOnScreenRef.current = alert !== null;
    setActiveAlert(alert);
  }, []);
  const showAlert = (0, _react.useCallback)(alert => {
    if (isAlertOnScreenRef.current) {
      queuedAlertsRef.current.push(alert);
      return;
    }
    presentAlert(alert);
  }, [presentAlert]);
  const handleClose = (0, _react.useCallback)(() => {
    if (!activeAlertRef.current) {
      return;
    }

    // Still on screen until it has dismissed: new alerts keep queueing.
    activeAlertRef.current = null;
    setActiveAlert(null);
  }, []);
  const handleActionPress = (0, _react.useCallback)(action => {
    if (!activeAlertRef.current) {
      return;
    }
    pendingActionRef.current = action.onPress ?? null;
    handleClose();
  }, [handleClose]);
  const alertPresenceDismissedRef = (0, _react.useRef)(alertPresence.onDismissed);
  alertPresenceDismissedRef.current = alertPresence.onDismissed;

  // Teardown hides the modal without a `visible` edge from here; a fresh
  // modal instance makes the next alert a real show, even when it arrives
  // in the same batch as the teardown.
  const [modalGeneration, setModalGeneration] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    const handleTeardown = () => {
      queuedAlertsRef.current = [];
      pendingActionRef.current = null;
      presentAlert(null);
      alertPresenceDismissedRef.current();
      setModalGeneration(generation => generation + 1);
    };
    teardownHandlers.add(handleTeardown);
    return () => {
      teardownHandlers.delete(handleTeardown);
    };
  }, [presentAlert]);
  const handleDismissed = (0, _react.useCallback)(() => {
    const pendingAction = pendingActionRef.current;
    pendingActionRef.current = null;
    alertPresence.onDismissed();
    try {
      pendingAction?.();
    } finally {
      presentAlert(queuedAlertsRef.current.shift() ?? null);
    }
  }, [alertPresence, presentAlert]);
  const renderedAlert = alertPresence.value;
  const renderedActions = renderedAlert?.actions ?? [{
    title: closeAccessibilityLabel,
    style: 'cancel'
  }];
  const contextValue = (0, _react.useMemo)(() => ({
    defaultErrorTitle,
    showAlert
  }), [defaultErrorTitle, showAlert]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DeclarativeAlertContext.DeclarativeAlertContext.Provider, {
    value: contextValue,
    children: [children, alertPresence.isMounted && renderedAlert ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CustomModal.CustomModal, {
      autoHeight: true,
      closeAccessibilityLabel: closeAccessibilityLabel,
      closeOnBackdropPress: false,
      containerStyles: styles.container,
      divider: false,
      header: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.IconRoundButton, {
        accessibilityLabel: closeAccessibilityLabel,
        icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CloseIcon.CloseIcon, {
          color: theme.colors.icon.default,
          size: CLOSE_GLYPH_SIZE
        }),
        onPress: handleClose,
        size: CLOSE_BUTTON_SIZE,
        testID: "button.declarativeAlert.close"
      }),
      headerStyles: styles.header,
      modalKey: "DeclarativeAlert",
      onClose: handleClose,
      onDismissed: handleDismissed,
      scrollEnabled: false,
      title: "",
      visible: alertPresence.visible,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.content,
        testID: "modal.declarativeAlert",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.textWrapper,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.title,
            children: renderedAlert.title
          }), renderedAlert.message ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.message,
            children: renderedAlert.message
          }) : null]
        }), renderedActions.length > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.actions,
          children: renderedActions.map((action, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Button, {
            onPress: () => handleActionPress(action),
            restStyle: styles.actionButton,
            style: resolveActionButtonStyle(action),
            testID: `button.declarativeAlert.action.${index}`,
            title: action.title
          }, `${action.title}-${index}`))
        }) : null]
      })
    }, modalGeneration) : null]
  });
};

/** cancel → light; destructive → red fill, white text (Figma `red`). */
exports.DeclarativeAlertProvider = DeclarativeAlertProvider;
const resolveActionButtonStyle = action => {
  if (action.style === 'cancel') {
    return 'light';
  }
  return action.style === 'destructive' ? 'danger' : 'default';
};
const createStyles = theme => _reactNative.StyleSheet.create({
  actions: {
    gap: theme.space[4],
    width: '100%'
  },
  container: {
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg
  },
  content: {
    alignItems: 'center',
    gap: theme.space[10],
    paddingBottom: CONTENT_PADDING_BOTTOM,
    paddingHorizontal: theme.space[6],
    width: '100%'
  },
  header: {
    height: HEADER_HEIGHT,
    justifyContent: 'flex-end',
    paddingHorizontal: theme.space[3],
    paddingVertical: theme.space[3]
  },
  message: {
    ...theme.typography.caption.regular,
    color: theme.colors.text.secondary,
    textAlign: 'center'
  },
  actionButton: {
    width: '100%'
  },
  textWrapper: {
    alignItems: 'center',
    gap: theme.space[2],
    width: '100%'
  },
  title: {
    ...theme.typography.title.bold,
    color: theme.colors.text.primary,
    textAlign: 'center'
  }
});
//# sourceMappingURL=DeclarativeAlertProvider.js.map