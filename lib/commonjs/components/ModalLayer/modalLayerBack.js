"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addModalLayerBackListener = exports.addHardwareBackPressListener = void 0;
var _reactNative = require("react-native");
var _modalLayerStore = require("./modalLayerStore.js");
// Screens subscribe to Android Back through this module, so an open modal
// always gets Back first.

/**
 * BackHandler.addEventListener for screens. BackHandler runs the latest
 * subscription first, so a screen that subscribes while a modal is open
 * would take Back from it; this one hands Back to the modal first.
 */
const addHardwareBackPressListener = handler => _reactNative.BackHandler.addEventListener('hardwareBackPress', () => (0, _modalLayerStore.dispatchModalLayerBack)() || handler());

/** Subscribes the modal stack itself; see ModalLayerHost. */
exports.addHardwareBackPressListener = addHardwareBackPressListener;
const addModalLayerBackListener = () => _reactNative.BackHandler.addEventListener('hardwareBackPress', _modalLayerStore.dispatchModalLayerBack);
exports.addModalLayerBackListener = addModalLayerBackListener;
//# sourceMappingURL=modalLayerBack.js.map