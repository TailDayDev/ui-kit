"use strict";

import { createContext, memo, useCallback, useContext, useMemo } from 'react';
import { LayoutAnimation, Pressable, StyleSheet, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
/** App open/close animation (ms). */
const FAST_EASE = {
  duration: 180,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
    duration: 120
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    duration: 120
  }
};
const ANDROID_RIPPLE = {
  borderless: true
};
const AccordionContext = /*#__PURE__*/createContext(null);
const createStyles = theme => StyleSheet.create({
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
export const AccordionGroup = ({
  children,
  openId,
  setOpenIdState,
  style
}) => {
  const setOpenId = useCallback(id => {
    if (openId === id) {
      return;
    }
    LayoutAnimation.configureNext(FAST_EASE);
    setOpenIdState(id);
  }, [openId, setOpenIdState]);
  const value = useMemo(() => ({
    openId,
    setOpenId
  }), [openId, setOpenId]);
  return /*#__PURE__*/_jsx(AccordionContext.Provider, {
    value: value,
    children: /*#__PURE__*/_jsx(View, {
      style: style,
      children: children
    })
  });
};

/** Bordered card that shows `collapsed` when closed and `expanded` when open. */
export const AccordionItem = /*#__PURE__*/memo(function AccordionItem({
  id,
  collapsed,
  expanded,
  pressToToggle = true,
  containerStyle,
  collapsedPressableStyle,
  isError = false,
  pointerEvents
}) {
  const styles = useThemedStyles(createStyles);
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('AccordionItem must be rendered inside <AccordionGroup>.');
  }
  const {
    openId,
    setOpenId
  } = ctx;
  const isOpen = openId === id;
  const open = useCallback(() => {
    // setOpenId configures the layout animation.
    if (!isOpen) {
      setOpenId(id);
    }
  }, [id, isOpen, setOpenId]);
  const close = useCallback(() => {
    if (isOpen) {
      setOpenId(null);
    }
  }, [isOpen, setOpenId]);
  const toggle = useCallback(() => isOpen ? close() : open(), [isOpen, open, close]);
  const controls = {
    isOpen,
    open,
    close,
    toggle
  };
  return /*#__PURE__*/_jsx(View, {
    pointerEvents: pointerEvents,
    style: [styles.card, containerStyle, isError ? styles.cardError : styles.cardBorder],
    children: !isOpen ? /*#__PURE__*/_jsx(Pressable, {
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
    _jsx(View, {
      style: styles.expanded,
      children: expanded(controls)
    })
  });
});
//# sourceMappingURL=Accordion.js.map