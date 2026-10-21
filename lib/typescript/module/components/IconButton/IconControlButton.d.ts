import type { IconControlButtonProps } from './IconButton.types.js';
/** App `DEFAULT_ICON_CONTROL_BUTTON_SIZE` (Figma IconRoundButton size=40). */
export declare const DEFAULT_ICON_CONTROL_BUTTON_SIZE = 40;
interface IconControlButtonInternalProps extends IconControlButtonProps {
    /** Corner radius chosen by the public wrapper (round or square). */
    borderRadius: number;
}
/**
 * Shared pressable shell for the icon buttons. Shape comes from the public
 * wrappers, not a type prop. Not exported from the kit.
 *
 * Uses React Native `Pressable` rather than the kit primitive because the kit
 * primitive's opacities (0.45 / 0.85) would change the shipped look.
 */
export declare const IconControlButton: ({ accessibilityLabel, borderRadius, disabled, loading, icon, onPress, size, style, testID, }: IconControlButtonInternalProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=IconControlButton.d.ts.map