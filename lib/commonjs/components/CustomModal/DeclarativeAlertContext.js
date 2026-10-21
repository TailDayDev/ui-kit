"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDeclarativeApiErrorHandler = exports.useDeclarativeAlert = exports.DeclarativeAlertContext = void 0;
var _react = require("react");
const DeclarativeAlertContext = exports.DeclarativeAlertContext = /*#__PURE__*/(0, _react.createContext)(null);
const useDeclarativeAlert = () => {
  const context = (0, _react.useContext)(DeclarativeAlertContext);
  if (!context) {
    throw new Error('useDeclarativeAlert must be used within DeclarativeAlertProvider');
  }
  return {
    showAlert: context.showAlert
  };
};

/** Logs an error and, when asked, shows it as an alert. */
exports.useDeclarativeAlert = useDeclarativeAlert;
const useDeclarativeApiErrorHandler = () => {
  const context = (0, _react.useContext)(DeclarativeAlertContext);
  if (!context) {
    throw new Error('useDeclarativeApiErrorHandler must be used within DeclarativeAlertProvider');
  }
  const {
    defaultErrorTitle,
    showAlert
  } = context;
  return (0, _react.useCallback)((message, error, options) => {
    console.error(message, error);
    if (options?.alert) {
      showAlert({
        title: options.title ?? defaultErrorTitle,
        message
      });
    }
  }, [defaultErrorTitle, showAlert]);
};
exports.useDeclarativeApiErrorHandler = useDeclarativeApiErrorHandler;
//# sourceMappingURL=DeclarativeAlertContext.js.map