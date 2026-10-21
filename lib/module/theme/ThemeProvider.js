"use strict";

import { createContext, useContext } from 'react';
import { lightTheme } from "./theme.js";
import { jsx as _jsx } from "react/jsx-runtime";
const ThemeContext = /*#__PURE__*/createContext(lightTheme);
/** Makes the theme available to every kit component below it. Mount once near the app root. */
export const ThemeProvider = ({
  theme = lightTheme,
  children
}) => /*#__PURE__*/_jsx(ThemeContext.Provider, {
  value: theme,
  children: children
});

/**
 * Returns the current theme. Works without a provider (falls back to the light
 * theme) so components render in tests and isolated previews.
 */
export const useTheme = () => useContext(ThemeContext);
//# sourceMappingURL=ThemeProvider.js.map