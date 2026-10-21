import type { CustomModalProviderProps } from './CustomModal.types.js';
export type CustomModalEnvironment = Omit<CustomModalProviderProps, 'children'>;
export declare const CustomModalEnvironmentContext: import("react").Context<CustomModalEnvironment>;
/**
 * App wiring for every CustomModal below it: the modal registry (logout
 * teardown, close by key), presentation telemetry, the keyboard accessory
 * height and the default close label. Optional: without it modals still
 * work, they just report nothing.
 */
export declare const CustomModalProvider: ({ children, closeAccessibilityLabel, keyboardAccessoryHeight, onModalRendered, onPresentationStateChange, }: CustomModalProviderProps) => import("react").JSX.Element;
//# sourceMappingURL=CustomModalProvider.d.ts.map