"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MODAL_LAYER_HEIGHT_STEP = exports.KEYBOARD_FOOTER_GAP = exports.HEADER_SWIPE_REGION_HEIGHT = exports.HEADER_HEIGHT = exports.HEADER_GLYPH_SIZE = exports.HEADER_BUTTON_SIZE = exports.FOOTER_HEIGHT = exports.FOOTER_BOTTOM_PADDING = exports.DEFAULT_KEYBOARD_INSET_BOTTOM_OFFSET = exports.CUSTOM_MODAL_CLOSE_TEST_ID = exports.CUSTOM_FOOTER_BOTTOM_PADDING = void 0;
/** Height the footer row reserves under the pages (app CustomModal). */
const FOOTER_HEIGHT = exports.FOOTER_HEIGHT = 70;
/** Footer padding above the safe area: space[6]. */
const FOOTER_BOTTOM_PADDING = exports.FOOTER_BOTTOM_PADDING = 24;
const CUSTOM_FOOTER_BOTTOM_PADDING = exports.CUSTOM_FOOTER_BOTTOM_PADDING = FOOTER_BOTTOM_PADDING;
/** Gap between a lifted footer and the keyboard: space[3]. */
const KEYBOARD_FOOTER_GAP = exports.KEYBOARD_FOOTER_GAP = 12;

/** Figma ModalHeader button. */
const HEADER_BUTTON_SIZE = exports.HEADER_BUTTON_SIZE = 36;
const HEADER_GLYPH_SIZE = exports.HEADER_GLYPH_SIZE = 20;
/** Figma ModalHeader height. */
const HEADER_HEIGHT = exports.HEADER_HEIGHT = 60;
/** A swipe to close starts in this band at the top of the sheet. */
const HEADER_SWIPE_REGION_HEIGHT = exports.HEADER_SWIPE_REGION_HEIGHT = 160;
/** Each open layer below pushes a sheet down by this much. */
const MODAL_LAYER_HEIGHT_STEP = exports.MODAL_LAYER_HEIGHT_STEP = 20;
const DEFAULT_KEYBOARD_INSET_BOTTOM_OFFSET = exports.DEFAULT_KEYBOARD_INSET_BOTTOM_OFFSET = 24;
/** Close button testID when the owner gives none (e2e flows close any modal). */
const CUSTOM_MODAL_CLOSE_TEST_ID = exports.CUSTOM_MODAL_CLOSE_TEST_ID = 'custom-modal-close';
//# sourceMappingURL=CustomModal.constants.js.map