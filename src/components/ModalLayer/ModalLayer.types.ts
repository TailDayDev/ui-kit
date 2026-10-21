import type { ReactNode } from 'react';

import type { ModalLayerPhase } from './modalLayerPhase';

export interface ModalLayerRootProps {
  /** The app content drawn under the modal layers. */
  children: ReactNode;
  /** Drawn above the modal layers (e.g. the keyboard «Done» bar). */
  overlay?: ReactNode;
}

export interface ModalLayerBackgroundProps {
  /** The app content; hidden from screen readers while a modal is open. */
  children: ReactNode;
}

export interface ModalLayerTestRootProps {
  /** The tree under test. */
  children: ReactNode;
}

export interface ModalLayerPortalProps {
  /** Stable id of the layer in the stack (one per modal instance). */
  id: string;
  /** The owner's current phase; the layer takes touches while active. */
  phase: ModalLayerPhase;
  /** What the layer draws. Keeps the contexts of the declaration site. */
  children: ReactNode;
  /** The owner's live phase; read when the portal is detached. */
  getPhase: () => ModalLayerPhase;
  /** The portal is (re)attached: a frozen screen came back on screen. */
  onAttach?: () => void;
  /**
   * The owner left while its modal was on screen (unmounted, or its screen
   * was frozen). The layer stays, releases touches and is removed once the
   * owner's leave animation calls `onFinished`.
   */
  onDetach?: (onFinished: () => void) => void;
  /** The layer's content threw; the owner should close the modal. */
  onContentError?: () => void;
}
