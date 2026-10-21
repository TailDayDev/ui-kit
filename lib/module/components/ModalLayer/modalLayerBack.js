"use strict";

// Screens subscribe to Android Back through this module, so an open modal
// always gets Back first.
import { BackHandler } from 'react-native';
import { dispatchModalLayerBack } from "./modalLayerStore.js";
/**
 * BackHandler.addEventListener for screens. BackHandler runs the latest
 * subscription first, so a screen that subscribes while a modal is open
 * would take Back from it; this one hands Back to the modal first.
 */
export const addHardwareBackPressListener = handler => BackHandler.addEventListener('hardwareBackPress', () => dispatchModalLayerBack() || handler());

/** Subscribes the modal stack itself; see ModalLayerHost. */
export const addModalLayerBackListener = () => BackHandler.addEventListener('hardwareBackPress', dispatchModalLayerBack);
//# sourceMappingURL=modalLayerBack.js.map