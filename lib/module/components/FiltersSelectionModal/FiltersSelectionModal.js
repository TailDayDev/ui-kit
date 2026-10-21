"use strict";

import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { Button } from "../Button/index.js";
import { CustomModal } from "../CustomModal/index.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/** App image slot of a filter option. */
export const FILTER_OPTION_IMAGE_SIZE = 32;
const FilterSelectionCard = ({
  isSelected,
  onPress,
  option,
  renderOptionImage
}) => {
  const styles = useThemedStyles(createStyles);
  const isRightBlockVisible = option.rightLabel !== undefined || option.rightValue !== undefined;
  return /*#__PURE__*/_jsxs(Pressable, {
    onPress: () => onPress(option.id),
    style: [styles.optionContainer, isSelected && styles.selectedContainer],
    accessibilityRole: "checkbox",
    accessibilityLabel: option.title,
    accessibilityState: {
      checked: isSelected
    },
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.left,
      children: [option.imageUrl?.trim() && renderOptionImage ? renderOptionImage(option, FILTER_OPTION_IMAGE_SIZE) : null, /*#__PURE__*/_jsx(Text, {
        style: [styles.title, isSelected && styles.selectedText],
        numberOfLines: 2,
        children: option.title
      })]
    }), isRightBlockVisible ? /*#__PURE__*/_jsxs(View, {
      style: styles.right,
      children: [option.rightLabel !== undefined ? /*#__PURE__*/_jsx(Text, {
        style: [styles.label, isSelected && styles.selectedText],
        children: option.rightLabel
      }) : null, option.rightValue !== undefined ? /*#__PURE__*/_jsx(Text, {
        style: [styles.count, isSelected && styles.selectedText],
        children: option.rightValue
      }) : null]
    }) : null]
  });
};

/** Multi-select filters sheet: grouped option cards, Reset + Apply footer. */
export const FiltersSelectionModal = ({
  applyTitle,
  groups,
  modalKey = 'FiltersSelectionModal',
  onApply,
  onChange,
  onClose,
  onReset,
  resetTitle,
  title,
  value,
  visible,
  renderOptionImage
}) => {
  const styles = useThemedStyles(createStyles);
  const handleToggleOption = useCallback((groupKey, optionId) => {
    const currentGroupValue = value[groupKey] ?? [];
    const isSelected = currentGroupValue.includes(optionId);
    const nextGroupValue = isSelected ? currentGroupValue.filter(id => id !== optionId) : [...currentGroupValue, optionId];
    onChange({
      ...value,
      [groupKey]: nextGroupValue
    });
  }, [onChange, value]);
  const handleReset = useCallback(() => {
    onReset?.();
    onClose();
  }, [onClose, onReset]);
  const handleApply = useCallback(() => {
    onApply?.();
    onClose();
  }, [onApply, onClose]);
  return /*#__PURE__*/_jsx(CustomModal, {
    closeButtonTestID: `${modalKey}.close`,
    visible: visible,
    modalKey: modalKey,
    onClose: onClose,
    scrollEnabled: false,
    divider: false,
    title: title,
    footer: /*#__PURE__*/_jsxs(View, {
      style: styles.footer,
      children: [/*#__PURE__*/_jsx(Button, {
        title: resetTitle,
        style: "danger",
        restStyle: styles.footerButton,
        onPress: handleReset
      }), /*#__PURE__*/_jsx(Button, {
        title: applyTitle,
        onPress: handleApply,
        restStyle: styles.footerButton
      })]
    }),
    children: /*#__PURE__*/_jsx(ScrollView, {
      style: styles.scrollView,
      children: groups.map((group, index) => {
        const previousGroup = groups[index - 1];
        const isDividerVisible = previousGroup !== undefined && previousGroup.options.length > 0 && group.options.length > 0;
        return /*#__PURE__*/_jsxs(View, {
          children: [isDividerVisible ? /*#__PURE__*/_jsx(View, {
            style: styles.divider
          }) : null, group.options.length > 0 ? /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(Text, {
              style: styles.sectionTitle,
              children: group.sectionTitle
            }), group.options.map(option => /*#__PURE__*/_jsx(FilterSelectionCard, {
              option: option,
              isSelected: (value[group.key] ?? []).includes(option.id),
              onPress: id => handleToggleOption(group.key, id),
              renderOptionImage: renderOptionImage
            }, option.id))]
          }) : group.emptyMessage ? /*#__PURE__*/_jsx(Text, {
            style: styles.emptyText,
            children: group.emptyMessage
          }) : null]
        }, group.key);
      })
    })
  });
};
const createStyles = theme => StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    borderWidth: theme.stroke[1],
    borderColor: theme.colors.border.default,
    padding: theme.space[3],
    marginBottom: theme.space[3],
    justifyContent: 'space-between',
    gap: theme.space[3]
  },
  selectedContainer: {
    borderColor: theme.palette.primary,
    backgroundColor: theme.colors.bg.accentSoft
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[3]
  },
  title: {
    ...theme.typography.body.medium,
    color: theme.colors.text.primary,
    flex: 1
  },
  selectedText: {
    color: theme.colors.text.accent
  },
  right: {
    alignItems: 'flex-end',
    gap: theme.space[1],
    flexShrink: 0
  },
  label: {
    ...theme.typography.caption.regular,
    color: theme.colors.text.primary
  },
  count: {
    ...theme.typography.body.medium,
    color: theme.colors.text.primary
  },
  sectionTitle: {
    ...theme.typography.body.medium,
    color: theme.palette.black,
    marginBottom: theme.space[2]
  },
  emptyText: {
    ...theme.typography.body.regular,
    textAlign: 'center',
    marginVertical: theme.space[4],
    color: theme.colors.text.primary
  },
  scrollView: {
    paddingHorizontal: theme.space[6]
  },
  divider: {
    height: theme.stroke[1],
    borderTopColor: theme.colors.border.default,
    borderTopWidth: theme.stroke[1],
    marginVertical: theme.space[6]
  },
  footerButton: {
    flex: 1
  },
  footer: {
    gap: theme.space[4],
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});
//# sourceMappingURL=FiltersSelectionModal.js.map