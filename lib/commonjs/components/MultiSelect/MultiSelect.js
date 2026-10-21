"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiSelect = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _ids = require("./ids.js");
var _MultiSelectCard = require("./MultiSelectCard.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App: screen padding of the wrapped two-column grid (2×24 + 8 gap). */const WRAPPED_GRID_HORIZONTAL_INSET = 56;
/** App: opacity of a locked (`disabledItems`) option (differs from `opacity.disabled`). */
const LOCKED_OPTION_OPACITY = 0.4;
const {
  width: WINDOW_WIDTH
} = _reactNative.Dimensions.get('window');
const ITEM_WIDTH = (WINDOW_WIDTH - WRAPPED_GRID_HORIZONTAL_INSET) / 2;
const createStyles = theme => _reactNative.StyleSheet.create({
  disabledOption: {
    opacity: LOCKED_OPTION_OPACITY
  },
  itemWrapped: {
    alignItems: 'flex-start',
    borderRadius: theme.radius.sm,
    flexDirection: 'column',
    gap: theme.space[2],
    height: 'auto',
    justifyContent: 'flex-start',
    padding: theme.space[2],
    paddingVertical: theme.space[2],
    paddingHorizontal: theme.space[2],
    width: ITEM_WIDTH
  },
  list: {
    display: 'flex',
    gap: theme.space[2]
  },
  listWrapped: {
    alignItems: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.space[2],
    justifyContent: 'space-between'
  },
  rowWrapped: {
    alignItems: 'flex-start',
    flexDirection: 'column'
  }
});
const toDisplayOrder = item => {
  const rawValue = item?.displayOrder;
  const parsed = typeof rawValue === 'number' ? rawValue : Number(rawValue ?? NaN);
  return Number.isFinite(parsed) ? parsed : Number.MAX_SAFE_INTEGER;
};

// Items are read by a caller-chosen field name (`parameter`), so they are
// viewed as plain records here; the value is narrowed right after.
const readField = (item, field) => item[field];

/** List of selectable option cards (vertical or two-column wrapped). */
const MultiSelect = ({
  list = [],
  selectedItems,
  parameter = 'id',
  handlePress,
  disabled = false,
  variant,
  disabledItems,
  children,
  iconSize,
  isItemColor = true,
  showDescription = true,
  showIcon = true,
  gap,
  selectionMode = 'multiple',
  itemComponent: ItemComponent,
  onItemPress,
  onSelectionChange,
  itemStyle,
  itemTestID,
  preserveOrder = false,
  renderItemIcon,
  resolveDescriptionCode
}) => {
  const styles = (0, _index.useThemedStyles)(createStyles);
  const selectedValues = selectionMode === 'single' ? selectedItems.slice(0, 1) : selectedItems;
  const isWrapped = variant === 'wrapped';
  const sortedList = (0, _react.useMemo)(() => {
    if (preserveOrder) {
      return list;
    }
    return [...list].sort((left, right) => {
      const customDiff = Number(Boolean(left?.isCustom)) - Number(Boolean(right?.isCustom));
      if (customDiff !== 0) {
        return customDiff;
      }
      const orderDiff = toDisplayOrder(left) - toDisplayOrder(right);
      if (orderDiff !== 0) {
        return orderDiff;
      }
      const leftKey = String(readField(left, parameter) ?? left?.title ?? '');
      const rightKey = String(readField(right, parameter) ?? right?.title ?? '');
      return leftKey.localeCompare(rightKey);
    });
  }, [list, parameter, preserveOrder]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.list, gap !== undefined ? {
      gap
    } : null, isWrapped ? styles.listWrapped : null],
    children: [sortedList.map((item, index) => {
      const rawValue = readField(item, parameter);
      const value = typeof rawValue === 'number' || typeof rawValue === 'string' ? rawValue : undefined;
      const isSelectedValue = candidate => value !== undefined && (0, _ids.areNormalizedIdsEqual)(candidate, value);
      const isDisabledValue = disabledItems?.some(isSelectedValue) ?? false;
      const selected = value !== undefined && (selectedValues.some(isSelectedValue) || isDisabledValue);
      const isDisabled = disabled || isDisabledValue;
      const handleItemPress = () => {
        if (isDisabled || value === undefined) {
          return;
        }
        handlePress(value);
        onItemPress?.(item, value);
        item.onPress?.();
        const isCurrentlySelected = selectedValues.some(isSelectedValue);
        if (selectionMode === 'single') {
          onSelectionChange?.(isCurrentlySelected ? [] : [value]);
        } else {
          onSelectionChange?.(isCurrentlySelected ? selectedValues.filter(selectedItem => !isSelectedValue(selectedItem)) : [...selectedValues, value]);
        }
      };
      const itemKey = value !== undefined ? String(value) : String(item.title ?? item.code ?? item.titleCode ?? index);
      const itemProps = {
        item,
        index,
        selected,
        disabled: isDisabled,
        onPress: handleItemPress
      };
      return ItemComponent ? /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemComponent, {
        ...itemProps
      }, itemKey) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_MultiSelectCard.MultiSelectCard, {
        testID: itemTestID?.(item, index),
        item: item,
        selected: selected,
        disabled: isDisabled,
        isItemColor: isItemColor,
        restStyle: [isDisabledValue ? styles.disabledOption : null, isWrapped ? styles.itemWrapped : null, itemStyle],
        showDescription: showDescription,
        showIcon: showIcon,
        iconSize: iconSize,
        rowStyles: isWrapped ? styles.rowWrapped : undefined,
        handlePress: handleItemPress,
        renderIcon: renderItemIcon,
        resolveDescriptionCode: resolveDescriptionCode
      }, itemKey);
    }), children]
  });
};
exports.MultiSelect = MultiSelect;
//# sourceMappingURL=MultiSelect.js.map