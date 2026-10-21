"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalLayerPortal = void 0;
var _itsFine = require("its-fine");
var _react = require("react");
var _ModalLayerContextReset = require("./ModalLayerContextReset");
var _modalLayerStore = require("./modalLayerStore.js");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Renders `children` as a layer of the root ModalLayerHost while keeping every
 * context of the declaration site (screen contexts, navigation, theme…).
 * Contexts that describe the declaration site's own layout — being inside a
 * list, a scroll view or a <Text> — are reset, exactly as RN's <Modal> does.
 *
 * Render it only while the modal is on screen: the bridge subscribes to every
 * context above it, which closed modals must not pay for.
 */
const ModalLayerPortal = ({
  id,
  phase,
  children,
  getPhase,
  onAttach,
  onDetach,
  onContentError
}) => {
  const ContextBridge = (0, _itsFine.useContextBridge)();
  const latestRef = (0, _react.useRef)({
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
  const attachGenerationRef = (0, _react.useRef)(0);
  const orderRef = (0, _react.useRef)(null);
  if (orderRef.current === null) {
    orderRef.current = (0, _modalLayerStore.createModalLayerOrder)();
  }
  const previousPhaseRef = (0, _react.useRef)(phase);
  (0, _react.useLayoutEffect)(() => {
    attachGenerationRef.current += 1;
    const attachGeneration = attachGenerationRef.current;
    // Closed while its screen was frozen: nothing to show again.
    if (latestRef.current.getPhase() === 'closed') {
      return undefined;
    }
    (0, _modalLayerStore.mountModalLayer)(id, latestRef.current.phase, orderRef.current ?? 0);
    latestRef.current.onAttach?.();
    return () => {
      const latest = latestRef.current;
      // A modal that finished closing goes away at once.
      if (latest.getPhase() === 'closed' || !latest.onDetach) {
        (0, _modalLayerStore.unmountModalLayer)(id);
        return;
      }

      // The owner is gone but the modal is on screen: keep the last element,
      // let the screen below take touches now and animate the layer out.
      (0, _modalLayerStore.updateModalLayer)(id, {
        phase: 'exiting'
      });
      latest.onDetach(() => {
        if (attachGeneration === attachGenerationRef.current) {
          (0, _modalLayerStore.unmountModalLayer)(id);
        }
      });
    };
  }, [id]);

  // Runs after every render, like a portal: the layer always shows the
  // latest element and the latest bridged context values.
  (0, _react.useLayoutEffect)(() => {
    // Opened again while leaving: it must not stay under newer layers.
    if (previousPhaseRef.current === 'exiting' && phase === 'entering') {
      orderRef.current = (0, _modalLayerStore.raiseModalLayerToTop)(id) ?? orderRef.current;
    }
    previousPhaseRef.current = phase;
    (0, _modalLayerStore.updateModalLayer)(id, {
      phase,
      onContentError,
      element: /*#__PURE__*/(0, _jsxRuntime.jsx)(ContextBridge, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalLayerContextReset.ModalLayerContextReset, {
          children: children
        })
      })
    });
  });
  return null;
};
exports.ModalLayerPortal = ModalLayerPortal;
//# sourceMappingURL=ModalLayerPortal.js.map