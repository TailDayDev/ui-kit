"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTheme = exports.ThemeProvider = void 0;
var _react = require("react");
var _theme = require("./theme.js");
var _jsxRuntime = require("react/jsx-runtime");
const ThemeContext = /*#__PURE__*/(0, _react.createContext)(_theme.lightTheme);
/** Makes the theme available to every kit component below it. Mount once near the app root. */
const ThemeProvider = ({
  theme = _theme.lightTheme,
  children
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(ThemeContext.Provider, {
  value: theme,
  children: children
});

/**
 * Returns the current theme. Works without a provider (falls back to the light
 * theme) so components render in tests and isolated previews.
 */
exports.ThemeProvider = ThemeProvider;
const useTheme = () => (0, _react.useContext)(ThemeContext);
exports.useTheme = useTheme;
//# sourceMappingURL=ThemeProvider.js.map