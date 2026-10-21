"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalLayerTestRoot = void 0;
var _itsFine = require("its-fine");
var _ModalLayerHost = require("./ModalLayerHost.js");
var _ModalLayerMotionContext = require("./ModalLayerMotionContext.js");
var _jsxRuntime = require("react/jsx-runtime");
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
const ModalLayerTestRoot = ({
  children
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_itsFine.FiberProvider, {
  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalLayerMotionContext.ModalLayerMotionContext.Provider, {
    value: REDUCED_MOTION,
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalLayerHost.ModalLayerHost, {})]
  })
});
exports.ModalLayerTestRoot = ModalLayerTestRoot;
//# sourceMappingURL=ModalLayerTestRoot.js.map