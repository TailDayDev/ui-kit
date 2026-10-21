"use strict";

import { useContextBridge } from 'its-fine';
import { useLayoutEffect, useRef } from 'react';
import { ModalLayerContextReset } from './ModalLayerContextReset';
import { createModalLayerOrder, mountModalLayer, raiseModalLayerToTop, unmountModalLayer, updateModalLayer } from "./modalLayerStore.js";

/**
 * Renders `children` as a layer of the root ModalLayerHost while keeping every
 * context of the declaration site (screen contexts, navigation, theme…).
 * Contexts that describe the declaration site's own layout — being inside a
 * list, a scroll view or a <Text> — are reset, exactly as RN's <Modal> does.
 *
 * Render it only while the modal is on screen: the bridge subscribes to every
 * context above it, which closed modals must not pay for.
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const ModalLayerPortal = ({
  id,
  phase,
  children,
  getPhase,
  onAttach,
  onDetach,
  onContentError
}) => {
  const ContextBridge = useContextBridge();
  const latestRef = useRef({
    getPhase,
    onAttach,
    onDetach,
    phase
  });
  latestRef.current = {
    getPhase,
    onAttach,
    onDetach,
    phase
  };
  /** Bumped on attach: a detach that finishes after it is stale. */
  const attachGenerationRef = useRef(0);
  const orderRef = useRef(null);
  if (orderRef.current === null) {
    orderRef.current = createModalLayerOrder();
  }
  const previousPhaseRef = useRef(phase);
  useLayoutEffect(() => {
    attachGenerationRef.current += 1;
    const attachGeneration = attachGenerationRef.current;
    // Closed while its screen was frozen: nothing to show again.
    if (latestRef.current.getPhase() === 'closed') {
      return undefined;
    }
    mountModalLayer(id, latestRef.current.phase, orderRef.current ?? 0);
    latestRef.current.onAttach?.();
    return () => {
      const latest = latestRef.current;
      // A modal that finished closing goes away at once.
      if (latest.getPhase() === 'closed' || !latest.onDetach) {
        unmountModalLayer(id);
        return;
      }

      // The owner is gone but the modal is on screen: keep the last element,
      // let the screen below take touches now and animate the layer out.
      updateModalLayer(id, {
        phase: 'exiting'
      });
      latest.onDetach(() => {
        if (attachGeneration === attachGenerationRef.current) {
          unmountModalLayer(id);
        }
      });
    };
  }, [id]);

  // Runs after every render, like a portal: the layer always shows the
  // latest element and the latest bridged context values.
  useLayoutEffect(() => {
    // Opened again while leaving: it must not stay under newer layers.
    if (previousPhaseRef.current === 'exiting' && phase === 'entering') {
      orderRef.current = raiseModalLayerToTop(id) ?? orderRef.current;
    }
    previousPhaseRef.current = phase;
    updateModalLayer(id, {
      phase,
      onContentError,
      element: /*#__PURE__*/_jsx(ContextBridge, {
        children: /*#__PURE__*/_jsx(ModalLayerContextReset, {
          children: children
        })
      })
    });
  });
  return null;
};
//# sourceMappingURL=ModalLayerPortal.js.map