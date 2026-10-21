import type { AdditionalNotesProps } from './AdditionalNotes.types';
/**
 * Notes card with a controlled value: inline textarea, read-only text, or a
 * preview card that opens an edit sheet (`editMode="modal"`).
 * Wraps {@link AdditionalNotesField} in {@link AdditionalNotesProvider};
 * both are also available as `AdditionalNotes.Provider` / `AdditionalNotes.Field`.
 */
export declare const AdditionalNotes: {
    (props: AdditionalNotesProps): import("react").JSX.Element;
    Provider: ({ children, ...props }: import("./AdditionalNotes.types").AdditionalNotesProviderProps) => import("react").JSX.Element;
    Field: () => import("react").JSX.Element;
};
//# sourceMappingURL=AdditionalNotes.d.ts.map