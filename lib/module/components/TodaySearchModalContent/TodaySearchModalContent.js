"use strict";

import { useMemo, useRef, useState } from 'react';
import { FlatList, Keyboard, StyleSheet, View } from 'react-native';
import { IconSearch } from "../../icons/figma/index.js";
import { Icon } from "../../primitives/Icon/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { InputClearButton } from "../InputClearButton/index.js";
import { SyncedTextInput } from "../SyncedTextInput/index.js";
import { TodaySectionHeader } from "../TodaySectionHeader/index.js";
import { TodayTaskCard } from "../TodayTaskCard/index.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// Figma TodaySearchModalContent › Поле поиска: 48pt tall.
const FIELD_HEIGHT = 48;
// Figma TodaySearchModalContent › Слот лупы: 24×24 slot, search glyph 18×18.
const SEARCH_SLOT_SIZE = 24;
const SEARCH_ICON_SIZE = 18;
// Figma TodaySearchModalContent › Кнопка стирания: 36×48.
const CLEAR_BUTTON_WIDTH = 36;
const createStyles = theme => StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: theme.space[2]
  },
  clearButton: {
    height: FIELD_HEIGHT,
    paddingTop: theme.space[3],
    width: CLEAR_BUTTON_WIDTH
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.space[10]
  },
  field: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    // Unfocused look kept from the app (Figma draws only the focused field).
    borderColor: theme.palette.lightGray,
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    gap: theme.space[3],
    height: FIELD_HEIGHT,
    paddingLeft: theme.space[4]
  },
  // Figma shows the field focused in every state: accent stroke + shadow/focus.
  fieldFocused: {
    borderColor: theme.palette.primary,
    boxShadow: [...theme.shadows.focus]
  },
  input: {
    ...theme.typography.headline.regular,
    color: theme.colors.text.primary,
    flex: 1,
    padding: 0
  },
  list: {
    flex: 1
  },
  listContent: {
    paddingBottom: theme.space[6],
    paddingTop: theme.space[5]
  },
  screen: {
    backgroundColor: theme.colors.bg.screen,
    flex: 1,
    paddingHorizontal: theme.space[4]
  },
  searchSlot: {
    alignItems: 'center',
    height: SEARCH_SLOT_SIZE,
    justifyContent: 'center',
    width: SEARCH_SLOT_SIZE
  },
  separator: {
    height: theme.space[4]
  }
});
const buildRows = sections => sections.flatMap(section => [{
  kind: 'header',
  key: `section:${section.id}`,
  section
}, ...section.tasks.map(task => ({
  kind: 'task',
  key: `task:${task.id}`,
  task
}))]);

/** Today search modal body: search field and found tasks by section (Figma `TodaySearchModalContent`). */
export const TodaySearchModalContent = ({
  state = 'initial',
  query,
  onQueryChange,
  onClear,
  sections = [],
  renderTask,
  labels,
  isAutoFocused = true,
  nestedOverlay,
  style,
  testID,
  inputTestID,
  clearTestID,
  listTestID,
  emptyStateTestID
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(isAutoFocused);
  const rows = useMemo(() => state === 'results' ? buildRows(sections) : [], [sections, state]);
  const clear = () => onClear ? onClear() : onQueryChange('');
  const renderRow = ({
    item
  }) => {
    if (item.kind === 'header') {
      return /*#__PURE__*/_jsx(TodaySectionHeader, {
        title: item.section.title,
        isCollapsible: false,
        isPastDate: item.section.isPastDate
      });
    }
    const card = /*#__PURE__*/_jsx(TodayTaskCard, {
      ...item.task
    });
    return /*#__PURE__*/_jsx(_Fragment, {
      children: renderTask ? renderTask(item.task, card) : card
    });
  };
  const emptyState = state === 'results' ? null : /*#__PURE__*/_jsx(View, {
    testID: emptyStateTestID,
    style: styles.emptyState,
    children: /*#__PURE__*/_jsx(Text, {
      variant: "headline/medium",
      color: "secondary",
      align: "center",
      children: state === 'no-results' ? labels.noResults : labels.initial
    })
  });
  return /*#__PURE__*/_jsxs(View, {
    testID: testID,
    style: [styles.body, style],
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.screen,
      children: [/*#__PURE__*/_jsxs(View, {
        testID: testID ? `${testID}.field` : undefined,
        style: [styles.field, isFocused && styles.fieldFocused],
        children: [/*#__PURE__*/_jsx(View, {
          style: styles.searchSlot,
          children: /*#__PURE__*/_jsx(Icon, {
            icon: IconSearch,
            size: SEARCH_ICON_SIZE
          })
        }), /*#__PURE__*/_jsx(SyncedTextInput, {
          ref: inputRef,
          testID: inputTestID,
          accessibilityLabel: labels.placeholder,
          placeholder: labels.placeholder,
          placeholderTextColor: theme.palette.lightGray,
          selectionColor: theme.colors.bg.accent,
          value: query,
          onChangeText: onQueryChange,
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
          onSubmitEditing: () => Keyboard.dismiss(),
          autoFocus: isAutoFocused,
          autoCapitalize: "none",
          autoCorrect: false,
          returnKeyType: "done",
          submitBehavior: "blurAndSubmit",
          style: styles.input
        }), query.length > 0 ? /*#__PURE__*/_jsx(InputClearButton, {
          accessibilityLabel: labels.clear,
          inputRef: inputRef,
          onClear: clear,
          style: styles.clearButton,
          testID: clearTestID
        }) : null]
      }), /*#__PURE__*/_jsx(FlatList, {
        testID: listTestID,
        data: rows,
        keyExtractor: row => row.key,
        renderItem: renderRow,
        ItemSeparatorComponent: Separator,
        ListEmptyComponent: emptyState,
        keyboardDismissMode: "interactive",
        keyboardShouldPersistTaps: "handled",
        showsVerticalScrollIndicator: false,
        style: styles.list,
        contentContainerStyle: styles.listContent
      })]
    }), nestedOverlay]
  });
};

// Figma Список: gap 16 between the section header and cards.
const Separator = () => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsx(View, {
    style: styles.separator
  });
};
//# sourceMappingURL=TodaySearchModalContent.js.map