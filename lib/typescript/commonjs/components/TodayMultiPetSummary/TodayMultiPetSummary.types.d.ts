import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
/** One pet photo in the stack. */
export interface TodayMultiPetSummaryPet {
    /** Stable React key (pet id). */
    id: string;
    /**
     * The photo, filling a 64pt circle (Figma `Фото питомца` image). The app
     * passes a ready element (`DinamicImage`). Omit to show the no-photo circle.
     */
    photo?: ReactNode;
    /** Screen-reader text of the photo, e.g. the pet name. */
    accessibilityLabel?: string;
}
/**
 * Several pets in one Today task (Figma `TodayMultiPetSummary`): an
 * overlapping stack of round photos, an optional "+N" circle and a
 * "show details" control.
 */
export interface TodayMultiPetSummaryProps {
    /** Pets in the stack, drawn left to right; the caller limits how many. */
    pets: TodayMultiPetSummaryPet[];
    /** Text of the green "+N" circle after the photos. Figma `extraCount`. Empty hides the circle. */
    extraCount?: string;
    /**
     * 32×32 artwork in the no-photo circle (Figma `Заглушка · img:NoImageIcon`).
     * The app passes a ready element.
     */
    noPhotoImage?: ReactNode;
    /** Text of the details control. Figma `detailsLabel`. */
    detailsLabel: string;
    /** Opens the pet list. */
    onDetailsPress?: () => void;
    /** Test identifier of the details control. */
    detailsTestID?: string;
    /** Outer style. Applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the block. */
    testID?: string;
}
//# sourceMappingURL=TodayMultiPetSummary.types.d.ts.map