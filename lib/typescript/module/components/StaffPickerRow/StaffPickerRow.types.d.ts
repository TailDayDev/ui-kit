import type { StyleProp, ViewStyle } from 'react-native';
import type { EmptyProfileImageProps } from '../EmptyProfileImage/index.js';
/** Staff member in a picker list (Figma `StaffPickerRow`). */
export interface StaffPickerRowProps {
    /** Full name; its first two words also give the avatar initials. Figma TEXT `name`. */
    name: string;
    /** Job position under the name. Hidden when empty (app behaviour). Figma TEXT `position`. */
    position?: string | null;
    /** Selected look: soft accent fill, accent border, active radio. Figma VARIANT `isSelected`. Defaults to `false`. */
    isSelected?: boolean;
    /** Called on tap. */
    onPress?: () => void;
    /** Blocks the press and dims the row. Not in Figma. */
    disabled?: boolean;
    /** Staff photo; without it the initials tile is shown (`EmptyProfileImage` `imageUrl`). */
    imageUrl?: EmptyProfileImageProps['imageUrl'];
    /** Draws the photo instead of the built-in `Image` (`EmptyProfileImage` `renderImage`). */
    renderImage?: EmptyProfileImageProps['renderImage'];
    /** Screen-reader label. Defaults to `name`. */
    accessibilityLabel?: string;
    /** Outer layout style, applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the row. */
    testID?: string;
}
//# sourceMappingURL=StaffPickerRow.types.d.ts.map