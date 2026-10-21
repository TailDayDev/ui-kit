"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconButton = void 0;
Object.defineProperty(exports, "IconRoundButton", {
  enumerable: true,
  get: function () {
    return _IconRoundButton.IconRoundButton;
  }
});
Object.defineProperty(exports, "IconSquareButton", {
  enumerable: true,
  get: function () {
    return _IconSquareButton.IconSquareButton;
  }
});
var _IconRoundButton = require("./IconRoundButton.js");
var _IconSquareButton = require("./IconSquareButton.js");
/**
 * @deprecated Use `IconRoundButton` or `IconSquareButton`. This export is a
 * round-button alias kept so app call sites only swap the import.
 */
const IconButton = exports.IconButton = _IconRoundButton.IconRoundButton;
//# sourceMappingURL=IconButton.js.map