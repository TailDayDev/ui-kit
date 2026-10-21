import { createContext, useMemo } from 'react';

import type { CustomModalProviderProps } from './CustomModal.types';

export type CustomModalEnvironment = Omit<CustomModalProviderProps, 'children'>;

export const CustomModalEnvironmentContext =
  createContext<CustomModalEnvironment>({});

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
  onPresentationStateChange,
}: CustomModalProviderProps) => {
  const environment = useMemo<CustomModalEnvironment>(
    () => ({
      closeAccessibilityLabel,
      keyboardAccessoryHeight,
      onModalRendered,
      onPresentationStateChange,
    }),
    [
      closeAccessibilityLabel,
      keyboardAccessoryHeight,
      onModalRendered,
      onPresentationStateChange,
    ],
  );

  return (
    <CustomModalEnvironmentContext.Provider value={environment}>
      {children}
    </CustomModalEnvironmentContext.Provider>
  );
};
