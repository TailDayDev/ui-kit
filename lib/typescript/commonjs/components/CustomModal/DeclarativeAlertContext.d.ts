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
export declare const DeclarativeAlertContext: import("react").Context<DeclarativeAlertContextValue | null>;
export declare const useDeclarativeAlert: () => Pick<DeclarativeAlertContextValue, "showAlert">;
/** Logs an error and, when asked, shows it as an alert. */
export declare const useDeclarativeApiErrorHandler: () => (message: string, error: unknown, options?: DeclarativeApiErrorOptions) => void;
//# sourceMappingURL=DeclarativeAlertContext.d.ts.map