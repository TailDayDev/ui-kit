"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceActionSheet = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _index2 = require("../ActionListRow/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const createStyles = theme => _reactNative.StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg.surface,
    paddingHorizontal: theme.space[6],
    paddingVertical: theme.space[1]
  },
  cardRowSpacing: {
    marginBottom: theme.space[2]
  }
});

/**
 * Body of an action sheet (camera / gallery / delete…): a column of
 * `ActionListRow`s. Put it inside the app's modal; it does not open one.
 */
const SourceActionSheet = ({
  actions,
  onClose,
  closeOnAction = true,
  variant = 'trailing-icon',
  containerStyle,
  testID
}) => {
  const styles = (0, _index.useThemedStyles)(createStyles);
  const isCardVariant = variant.startsWith('card-');
  const handlePressAction = action => {
    if (closeOnAction) {
      onClose();
    }
    action.onPress();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    testID: testID,
    style: [styles.container, containerStyle],
    children: actions.map((action, index) => {
      const isLast = index === actions.length - 1;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.ActionListRow, {
        title: action.title,
        description: action.description,
        variant: variant,
        leading: action.icon,
        trailing: action.trailing,
        isDanger: action.isDanger,
        isDisabled: action.isDisabled,
        showDivider: !isCardVariant && !isLast,
        style: isCardVariant && !isLast ? styles.cardRowSpacing : undefined,
        testID: action.testID,
        onPress: () => handlePressAction(action)
      }, action.id);
    })
  });
};
exports.SourceActionSheet = SourceActionSheet;
//# sourceMappingURL=SourceActionSheet.js.map