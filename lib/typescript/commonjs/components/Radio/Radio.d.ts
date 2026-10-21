import type { RadioProps } from './Radio.types';
/** App `Radio` default outer diameter (Figma `Radio` size=24). */
export declare const DEFAULT_RADIO_SIZE = 24;
/** App `Radio` default inner dot diameter. */
export declare const DEFAULT_RADIO_DOT_SIZE = 12;
/**
 * Radio indicator. Purely visual: put it inside a tappable row that sets
 * `accessibilityRole="radio"` and `accessibilityState={{ checked }}`.
 */
export declare const Radio: ({ isActive, dotSize, size, style, testID, }: RadioProps) => import("react").JSX.Element;
//# sourceMappingURL=Radio.d.ts.map