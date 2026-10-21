import type { IconComponentProps } from '../primitives';
export interface SimpleArrowIconProps extends IconComponentProps {
    /** Pointing side. Defaults to `'left'`. */
    direction?: 'left' | 'right';
}
/**
 * Thin chevron used by calendar month arrows (copied from the app
 * `shared/icons/SimpleArrowIcon`). 7×11 unless `width`/`height` are set; `size`
 * is ignored because the glyph is not square. Color comes from `color`.
 */
export declare const SimpleArrowIcon: ({ direction, color, width, height, }: SimpleArrowIconProps) => import("react").JSX.Element;
//# sourceMappingURL=SimpleArrowIcon.d.ts.map