import { type RefObject } from 'react';
import type { CustomModalHandle, CustomModalPresentationState } from '../CustomModal.types.js';
interface IModalRegistrationParams {
    instanceId: string;
    modalKey?: string;
    /** The modal has a layer (entering, open or leaving). */
    isRendered: boolean;
    /** Android Back while this is the top layer. */
    onBackPress: () => void;
    /** The imperative handle (logout teardown and close by key use it). */
    handleRef: RefObject<CustomModalHandle | null>;
}
/**
 * Tells the app about a rendered modal through CustomModalProvider (registry,
 * dev stack) and gives the layer store its Back handler (the host gives Back
 * to the top layer only, whatever order screens subscribed in; a locked
 * modal takes and ignores it).
 */
export declare const useModalRegistration: ({ instanceId, modalKey, isRendered, onBackPress, handleRef, }: IModalRegistrationParams) => void;
/** Reports presentation state changes of a modal that is or was shown. */
export declare const useModalPresentationTelemetry: ({ modalKey, isVisible, isRendered, isTopModal, isClosing, canInteract, isLocked, pageHost, }: CustomModalPresentationState) => void;
export {};
//# sourceMappingURL=useModalRegistration.d.ts.map