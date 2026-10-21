"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.layoutStyles = exports.createStyles = void 0;
var _reactNative = require("react-native");
var _CustomModalConstants = require("./CustomModal.constants.js");
const HEADER_BUTTON_RADIUS = _CustomModalConstants.HEADER_BUTTON_SIZE / 2;
const createStyles = theme => _reactNative.StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: HEADER_BUTTON_RADIUS,
    height: _CustomModalConstants.HEADER_BUTTON_SIZE,
    justifyContent: 'center',
    left: theme.space[3],
    position: 'absolute',
    width: _CustomModalConstants.HEADER_BUTTON_SIZE
  },
  backdrop: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlay.scrim
  },
  closeButton: {
    position: 'absolute',
    right: theme.space[3]
  },
  container: {
    backgroundColor: theme.colors.bg.surface,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    overflow: 'hidden'
  },
  footer: {
    backgroundColor: theme.colors.bg.surface,
    borderTopColor: theme.colors.border.default,
    borderTopWidth: theme.stroke[1],
    paddingBottom: theme.space[6],
    paddingHorizontal: theme.space[6],
    paddingTop: theme.space[4]
  },
  footerWithoutDivider: {
    borderTopWidth: 0
  },
  footerSurface: {
    backgroundColor: theme.colors.bg.surface
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    flexDirection: 'row',
    gap: theme.space[2],
    height: _CustomModalConstants.HEADER_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: theme.space[3],
    paddingVertical: theme.space[3]
  },
  scrollContainer: {
    flexGrow: 1
  },
  title: {
    ...theme.typography.headline.bold,
    color: theme.colors.text.primary,
    flex: 1,
    marginHorizontal: theme.space[12],
    textAlign: 'center'
  }
});
exports.createStyles = createStyles;
/** Layout styles that do not depend on the theme. */
const layoutStyles = exports.layoutStyles = _reactNative.StyleSheet.create({
  fill: {
    flex: 1
  },
  noGrow: {
    flexGrow: 0
  },
  pagesClip: {
    overflow: 'hidden'
  },
  pagesRow: {
    flexDirection: 'row'
  },
  sheetWrapper: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});
//# sourceMappingURL=CustomModal.styles.js.map