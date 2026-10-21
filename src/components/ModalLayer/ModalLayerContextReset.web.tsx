import type { ReactNode } from 'react';

/**
 * Web (Storybook): react-native-web does not expose React Native's internal
 * list, scroll view and text contexts, so there is nothing to reset.
 */
export const ModalLayerContextReset = ({
  children,
}: {
  children: ReactNode;
}) => <>{children}</>;
