"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdditionalNotes = void 0;
var _AdditionalNotesContext = require("./AdditionalNotesContext.js");
var _AdditionalNotesField = require("./AdditionalNotesField.js");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Notes card with a controlled value: inline textarea, read-only text, or a
 * preview card that opens an edit sheet (`editMode="modal"`).
 * Wraps {@link AdditionalNotesField} in {@link AdditionalNotesProvider};
 * both are also available as `AdditionalNotes.Provider` / `AdditionalNotes.Field`.
 */
const AdditionalNotes = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_AdditionalNotesContext.AdditionalNotesProvider, {
  ...props,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_AdditionalNotesField.AdditionalNotesField, {})
});
exports.AdditionalNotes = AdditionalNotes;
AdditionalNotes.Provider = _AdditionalNotesContext.AdditionalNotesProvider;
AdditionalNotes.Field = _AdditionalNotesField.AdditionalNotesField;
//# sourceMappingURL=AdditionalNotes.js.map