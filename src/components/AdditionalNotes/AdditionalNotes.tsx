import type { AdditionalNotesProps } from './AdditionalNotes.types';
import { AdditionalNotesProvider } from './AdditionalNotesContext';
import { AdditionalNotesField } from './AdditionalNotesField';

/**
 * Notes card with a controlled value: inline textarea, read-only text, or a
 * preview card that opens an edit sheet (`editMode="modal"`).
 * Wraps {@link AdditionalNotesField} in {@link AdditionalNotesProvider};
 * both are also available as `AdditionalNotes.Provider` / `AdditionalNotes.Field`.
 */
export const AdditionalNotes = (props: AdditionalNotesProps) => (
  <AdditionalNotesProvider {...props}>
    <AdditionalNotesField />
  </AdditionalNotesProvider>
);

AdditionalNotes.Provider = AdditionalNotesProvider;
AdditionalNotes.Field = AdditionalNotesField;
