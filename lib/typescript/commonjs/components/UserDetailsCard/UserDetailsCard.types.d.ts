import type { EmptyProfileImageProps } from '../EmptyProfileImage';
/** One label/value row of `UserDetailsCard`. */
export interface UserDetailsCardDetail {
    /** Left text, e.g. "Email". */
    label: string;
    /** Small grey text under the row. */
    subLabel?: string | null;
    /** Right text (accent). Rows without a value are hidden. */
    value?: string | null;
    /** Makes the value tappable (e.g. call / mail). The tap does not bubble to the card. */
    onPress?: () => void;
}
/** Owner / contact summary card: title, avatar with name, detail rows and an action button. */
export interface UserDetailsCardProps {
    /** Text of the bottom action button. */
    actionText: string;
    /** Detail rows; rows with an empty `value` are skipped. */
    details: UserDetailsCardDetail[];
    /** Full name. Its first two words feed the avatar initials. */
    name: string;
    /** Avatar photo URL. Empty or `null` shows the initials. */
    photoUrl?: string | null;
    /** Test identifier of the action button. */
    testID?: string;
    /** Card title, e.g. "Owner". */
    title: string;
    /** Shown instead of `name` when it is empty. */
    fallbackName: string;
    /** Called by the action button. */
    onActionPress: () => void;
    /**
     * Draws the avatar photo instead of the built-in `Image` (app: `DinamicImage`).
     * Passed to `EmptyProfileImage.renderImage`.
     */
    renderAvatarImage?: EmptyProfileImageProps['renderImage'];
}
//# sourceMappingURL=UserDetailsCard.types.d.ts.map