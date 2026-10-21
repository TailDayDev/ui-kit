"use strict";

import { FiberProvider } from 'its-fine';
import { ModalLayerHost } from "./ModalLayerHost.js";
import { ModalLayerMotionContext } from "./ModalLayerMotionContext.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const REDUCED_MOTION = {
  isReducedMotion: true
};

/**
 * The modal layer root for tests: what ModalLayerRoot gives the app, minus
 * the background wrapper, so a test tree without open modals renders exactly
 * as before. Modals open and close at once (there is no native layout or
 * animation frame in tests); a suite that tests the transitions provides
 * `isReducedMotion: false` itself. Use it as the `wrapper` of a render (or
 * wrap every test tree with it in jest setup).
 */
export const ModalLayerTestRoot = ({
  children
}) => /*#__PURE__*/_jsx(FiberProvider, {
  children: /*#__PURE__*/_jsxs(ModalLayerMotionContext.Provider, {
    value: REDUCED_MOTION,
    children: [children, /*#__PURE__*/_jsx(ModalLayerHost, {})]
  })
});
//# sourceMappingURL=ModalLayerTestRoot.js.map