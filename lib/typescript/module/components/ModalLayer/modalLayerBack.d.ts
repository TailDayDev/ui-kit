import { type NativeEventSubscription } from 'react-native';
type BackPressHandler = () => boolean | null | undefined;
/**
 * BackHandler.addEventListener for screens. BackHandler runs the latest
 * subscription first, so a screen that subscribes while a modal is open
 * would take Back from it; this one hands Back to the modal first.
 */
export declare const addHardwareBackPressListener: (handler: BackPressHandler) => NativeEventSubscription;
/** Subscribes the modal stack itself; see ModalLayerHost. */
export declare const addModalLayerBackListener: () => NativeEventSubscription;
export {};
//# sourceMappingURL=modalLayerBack.d.ts.map