"use strict";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CloseIcon } from "../../icons/CloseIcon.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { Button } from "../Button/index.js";
import { IconRoundButton } from "../IconButton/index.js";
import { CustomModal } from "./CustomModal.js";
import { DeclarativeAlertContext } from "./DeclarativeAlertContext.js";
import { useModalPresence } from "./useModalPresence.js";

/** App alert close button and glyph. */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const CLOSE_BUTTON_SIZE = 48;
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
export const dismissDeclarativeAlertsForTeardown = () => {
  [...teardownHandlers].forEach(handler => handler());
};

/**
 * Shows declarative alerts one at a time, FIFO. An alert is a modal layer of
 * its own, so it opens above whatever modal is on screen; the next one opens
 * after the previous has dismissed, and an action runs once its alert is gone.
 */
export const DeclarativeAlertProvider = ({
  children,
  closeAccessibilityLabel,
  defaultErrorTitle
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const [activeAlert, setActiveAlert] = useState(null);
  const activeAlertRef = useRef(null);
  const isAlertOnScreenRef = useRef(false);
  const queuedAlertsRef = useRef([]);
  const pendingActionRef = useRef(null);
  const alertPresence = useModalPresence(activeAlert);
  const presentAlert = useCallback(alert => {
    activeAlertRef.current = alert;
    isAlertOnScreenRef.current = alert !== null;
    setActiveAlert(alert);
  }, []);
  const showAlert = useCallback(alert => {
    if (isAlertOnScreenRef.current) {
      queuedAlertsRef.current.push(alert);
      return;
    }
    presentAlert(alert);
  }, [presentAlert]);
  const handleClose = useCallback(() => {
    if (!activeAlertRef.current) {
      return;
    }

    // Still on screen until it has dismissed: new alerts keep queueing.
    activeAlertRef.current = null;
    setActiveAlert(null);
  }, []);
  const handleActionPress = useCallback(action => {
    if (!activeAlertRef.current) {
      return;
    }
    pendingActionRef.current = action.onPress ?? null;
    handleClose();
  }, [handleClose]);
  const alertPresenceDismissedRef = useRef(alertPresence.onDismissed);
  alertPresenceDismissedRef.current = alertPresence.onDismissed;

  // Teardown hides the modal without a `visible` edge from here; a fresh
  // modal instance makes the next alert a real show, even when it arrives
  // in the same batch as the teardown.
  const [modalGeneration, setModalGeneration] = useState(0);
  useEffect(() => {
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
  const handleDismissed = useCallback(() => {
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
  const contextValue = useMemo(() => ({
    defaultErrorTitle,
    showAlert
  }), [defaultErrorTitle, showAlert]);
  return /*#__PURE__*/_jsxs(DeclarativeAlertContext.Provider, {
    value: contextValue,
    children: [children, alertPresence.isMounted && renderedAlert ? /*#__PURE__*/_jsx(CustomModal, {
      autoHeight: true,
      closeAccessibilityLabel: closeAccessibilityLabel,
      closeOnBackdropPress: false,
      containerStyles: styles.container,
      divider: false,
      header: /*#__PURE__*/_jsx(IconRoundButton, {
        accessibilityLabel: closeAccessibilityLabel,
        icon: /*#__PURE__*/_jsx(CloseIcon, {
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
      children: /*#__PURE__*/_jsxs(View, {
        style: styles.content,
        testID: "modal.declarativeAlert",
        children: [/*#__PURE__*/_jsxs(View, {
          style: styles.textWrapper,
          children: [/*#__PURE__*/_jsx(Text, {
            style: styles.title,
            children: renderedAlert.title
          }), renderedAlert.message ? /*#__PURE__*/_jsx(Text, {
            style: styles.message,
            children: renderedAlert.message
          }) : null]
        }), renderedActions.length > 0 ? /*#__PURE__*/_jsx(View, {
          style: styles.actions,
          children: renderedActions.map((action, index) => /*#__PURE__*/_jsx(Button, {
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
const resolveActionButtonStyle = action => {
  if (action.style === 'cancel') {
    return 'light';
  }
  return action.style === 'destructive' ? 'danger' : 'default';
};
const createStyles = theme => StyleSheet.create({
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