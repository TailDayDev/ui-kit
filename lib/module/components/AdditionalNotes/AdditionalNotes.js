"use strict";

import { AdditionalNotesProvider } from "./AdditionalNotesContext.js";
import { AdditionalNotesField } from "./AdditionalNotesField.js";

/**
 * Notes card with a controlled value: inline textarea, read-only text, or a
 * preview card that opens an edit sheet (`editMode="modal"`).
 * Wraps {@link AdditionalNotesField} in {@link AdditionalNotesProvider};
 * both are also available as `AdditionalNotes.Provider` / `AdditionalNotes.Field`.
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const AdditionalNotes = props => /*#__PURE__*/_jsx(AdditionalNotesProvider, {
  ...props,
  children: /*#__PURE__*/_jsx(AdditionalNotesField, {})
});
AdditionalNotes.Provider = AdditionalNotesProvider;
AdditionalNotes.Field = AdditionalNotesField;
//# sourceMappingURL=AdditionalNotes.js.map