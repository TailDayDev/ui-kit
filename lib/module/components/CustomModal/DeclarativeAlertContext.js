"use strict";

import { createContext, useCallback, useContext } from 'react';
export const DeclarativeAlertContext = /*#__PURE__*/createContext(null);
export const useDeclarativeAlert = () => {
  const context = useContext(DeclarativeAlertContext);
  if (!context) {
    throw new Error('useDeclarativeAlert must be used within DeclarativeAlertProvider');
  }
  return {
    showAlert: context.showAlert
  };
};

/** Logs an error and, when asked, shows it as an alert. */
export const useDeclarativeApiErrorHandler = () => {
  const context = useContext(DeclarativeAlertContext);
  if (!context) {
    throw new Error('useDeclarativeApiErrorHandler must be used within DeclarativeAlertProvider');
  }
  const {
    defaultErrorTitle,
    showAlert
  } = context;
  return useCallback((message, error, options) => {
    console.error(message, error);
    if (options?.alert) {
      showAlert({
        title: options.title ?? defaultErrorTitle,
        message
      });
    }
  }, [defaultErrorTitle, showAlert]);
};
//# sourceMappingURL=DeclarativeAlertContext.js.map