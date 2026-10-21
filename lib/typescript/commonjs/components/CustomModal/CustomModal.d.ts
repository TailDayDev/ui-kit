import type { CustomModalHandle, CustomModalProps } from './CustomModal.types';
/**
 * A bottom sheet drawn in the root modal layer host (`ModalLayerRoot`).
 * Fully controlled: it is shown while `visible` is true; X, backdrop, swipe
 * and Android Back only ask the owner to close through `onClose`.
 *
 * A modal opened from inside an open CustomModal must be declared inside it
 * (`children`, `header`, `footer` or `nestedOverlays`), never as a sibling:
 * it then closes together with its parent.
 */
export declare const CustomModal: import("react").ForwardRefExoticComponent<CustomModalProps & import("react").RefAttributes<CustomModalHandle>>;
//# sourceMappingURL=CustomModal.d.ts.map