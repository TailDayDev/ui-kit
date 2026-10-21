"use strict";

import { createContext, useMemo } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export const CustomModalEnvironmentContext = /*#__PURE__*/createContext({});

/**
 * App wiring for every CustomModal below it: the modal registry (logout
 * teardown, close by key), presentation telemetry, the keyboard accessory
 * height and the default close label. Optional: without it modals still
 * work, they just report nothing.
 */
export const CustomModalProvider = ({
  children,
  closeAccessibilityLabel,
  keyboardAccessoryHeight,
  onModalRendered,
  onPresentationStateChange
}) => {
  const environment = useMemo(() => ({
    closeAccessibilityLabel,
    keyboardAccessoryHeight,
    onModalRendered,
    onPresentationStateChange
  }), [closeAccessibilityLabel, keyboardAccessoryHeight, onModalRendered, onPresentationStateChange]);
  return /*#__PURE__*/_jsx(CustomModalEnvironmentContext.Provider, {
    value: environment,
    children: children
  });
};
//# sourceMappingURL=CustomModalProvider.js.map