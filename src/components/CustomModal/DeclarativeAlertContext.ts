import { createContext, useCallback, useContext } from 'react';

export interface DeclarativeAlertAction {
  title: string;
  onPress?: () => void;
  style?: 'cancel' | 'default' | 'destructive';
}

export interface DeclarativeAlert {
  actions?: readonly DeclarativeAlertAction[];
  title: string;
  message?: string;
}

export interface DeclarativeAlertContextValue {
  defaultErrorTitle: string;
  showAlert: (alert: DeclarativeAlert) => void;
}

export interface DeclarativeApiErrorOptions {
  alert?: boolean;
  title?: string;
}

export const DeclarativeAlertContext =
  createContext<DeclarativeAlertContextValue | null>(null);

export const useDeclarativeAlert = (): Pick<
  DeclarativeAlertContextValue,
  'showAlert'
> => {
  const context = useContext(DeclarativeAlertContext);

  if (!context) {
    throw new Error(
      'useDeclarativeAlert must be used within DeclarativeAlertProvider',
    );
  }

  return { showAlert: context.showAlert };
};

/** Logs an error and, when asked, shows it as an alert. */
export const useDeclarativeApiErrorHandler = () => {
  const context = useContext(DeclarativeAlertContext);

  if (!context) {
    throw new Error(
      'useDeclarativeApiErrorHandler must be used within DeclarativeAlertProvider',
    );
  }

  const { defaultErrorTitle, showAlert } = context;

  return useCallback(
    (message: string, error: unknown, options?: DeclarativeApiErrorOptions) => {
      console.error(message, error);

      if (options?.alert) {
        showAlert({
          title: options.title ?? defaultErrorTitle,
          message,
        });
      }
    },
    [defaultErrorTitle, showAlert],
  );
};
