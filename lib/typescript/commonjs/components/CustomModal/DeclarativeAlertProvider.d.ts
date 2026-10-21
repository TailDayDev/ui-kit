import { type ReactNode } from 'react';
export interface DeclarativeAlertProviderProps {
    children?: ReactNode;
    /** Screen-reader text of the X; also the label of the default action. */
    closeAccessibilityLabel: string;
    /** Title of alerts shown by `useDeclarativeApiErrorHandler`. */
    defaultErrorTitle: string;
}
/**
 * Drops queued alerts and dismisses the current one without running any action.
 * For session teardown (logout), when the screens an alert closure refers to
 * are about to unmount.
 */
export declare const dismissDeclarativeAlertsForTeardown: () => void;
/**
 * Shows declarative alerts one at a time, FIFO. An alert is a modal layer of
 * its own, so it opens above whatever modal is on screen; the next one opens
 * after the previous has dismissed, and an action runs once its alert is gone.
 */
export declare const DeclarativeAlertProvider: ({ children, closeAccessibilityLabel, defaultErrorTitle, }: DeclarativeAlertProviderProps) => import("react").JSX.Element;
//# sourceMappingURL=DeclarativeAlertProvider.d.ts.map