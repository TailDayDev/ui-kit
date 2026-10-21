import { createContext } from 'react';

export interface IModalLayerMotion {
  /**
   * Modals change phase at once, without enter/leave animations and without
   * waiting for the sheet's first layout (e.g. tests, reduced motion).
   */
  isReducedMotion: boolean;
}

export const ModalLayerMotionContext = createContext<IModalLayerMotion>({
  isReducedMotion: false,
});
