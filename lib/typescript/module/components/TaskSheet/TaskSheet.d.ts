import type { TaskSheetProps } from './TaskSheet.types.js';
/**
 * Task actions sheet (Figma `TaskSheet`): bottom sheet with a close-only
 * `ModalHeader` and `TaskSheetContent` rows. Figma `hasFooter=false`, so there
 * is no footer; the "Полоска дома" frame is the device safe area.
 */
export declare const TaskSheet: ({ isVisible, onClose, onDismissed, rows, closeAccessibilityLabel, title, isLocked, isReplaced, nestedOverlays, modalKey, closeTestID, style, testID, }: TaskSheetProps) => import("react").JSX.Element;
//# sourceMappingURL=TaskSheet.d.ts.map