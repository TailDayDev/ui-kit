import { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  View,
  type TextInput,
} from 'react-native';

import { IconSearch } from '../../icons/figma';
import { Icon } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import { InputClearButton } from '../InputClearButton';
import { SyncedTextInput } from '../SyncedTextInput';
import { TodaySectionHeader } from '../TodaySectionHeader';
import { TodayTaskCard } from '../TodayTaskCard';
import type {
  TodaySearchModalContentProps,
  TodaySearchModalContentSection,
  TodaySearchModalContentTask,
} from './TodaySearchModalContent.types';

// Figma TodaySearchModalContent › Поле поиска: 48pt tall.
const FIELD_HEIGHT = 48;
// Figma TodaySearchModalContent › Слот лупы: 24×24 slot, search glyph 18×18.
const SEARCH_SLOT_SIZE = 24;
const SEARCH_ICON_SIZE = 18;
// Figma TodaySearchModalContent › Кнопка стирания: 36×48.
const CLEAR_BUTTON_WIDTH = 36;

type Row =
  | { kind: 'header'; key: string; section: TodaySearchModalContentSection }
  | { kind: 'task'; key: string; task: TodaySearchModalContentTask };

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    body: {
      flex: 1,
      paddingTop: theme.space[2],
    },
    clearButton: {
      height: FIELD_HEIGHT,
      paddingTop: theme.space[3],
      width: CLEAR_BUTTON_WIDTH,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: theme.space[10],
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
      paddingLeft: theme.space[4],
    },
    // Figma shows the field focused in every state: accent stroke + shadow/focus.
    fieldFocused: {
      borderColor: theme.palette.primary,
      boxShadow: [...theme.shadows.focus],
    },
    input: {
      ...theme.typography.headline.regular,
      color: theme.colors.text.primary,
      flex: 1,
      padding: 0,
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingBottom: theme.space[6],
      paddingTop: theme.space[5],
    },
    screen: {
      backgroundColor: theme.colors.bg.screen,
      flex: 1,
      paddingHorizontal: theme.space[4],
    },
    searchSlot: {
      alignItems: 'center',
      height: SEARCH_SLOT_SIZE,
      justifyContent: 'center',
      width: SEARCH_SLOT_SIZE,
    },
    separator: {
      height: theme.space[4],
    },
  });

const buildRows = (sections: TodaySearchModalContentSection[]): Row[] =>
  sections.flatMap(section => [
    { kind: 'header' as const, key: `section:${section.id}`, section },
    ...section.tasks.map(task => ({
      kind: 'task' as const,
      key: `task:${task.id}`,
      task,
    })),
  ]);

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
  emptyStateTestID,
}: TodaySearchModalContentProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(isAutoFocused);
  const rows = useMemo(
    () => (state === 'results' ? buildRows(sections) : []),
    [sections, state],
  );

  const clear = () => (onClear ? onClear() : onQueryChange(''));

  const renderRow = ({ item }: { item: Row }) => {
    if (item.kind === 'header') {
      return (
        <TodaySectionHeader
          title={item.section.title}
          isCollapsible={false}
          isPastDate={item.section.isPastDate}
        />
      );
    }
    const card = <TodayTaskCard {...item.task} />;
    return <>{renderTask ? renderTask(item.task, card) : card}</>;
  };

  const emptyState =
    state === 'results' ? null : (
      <View testID={emptyStateTestID} style={styles.emptyState}>
        <Text variant="headline/medium" color="secondary" align="center">
          {state === 'no-results' ? labels.noResults : labels.initial}
        </Text>
      </View>
    );

  return (
    <View testID={testID} style={[styles.body, style]}>
      <View style={styles.screen}>
        <View
          testID={testID ? `${testID}.field` : undefined}
          style={[styles.field, isFocused && styles.fieldFocused]}
        >
          <View style={styles.searchSlot}>
            <Icon icon={IconSearch} size={SEARCH_ICON_SIZE} />
          </View>
          <SyncedTextInput
            ref={inputRef}
            testID={inputTestID}
            accessibilityLabel={labels.placeholder}
            placeholder={labels.placeholder}
            placeholderTextColor={theme.palette.lightGray}
            selectionColor={theme.colors.bg.accent}
            value={query}
            onChangeText={onQueryChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={() => Keyboard.dismiss()}
            autoFocus={isAutoFocused}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            submitBehavior="blurAndSubmit"
            style={styles.input}
          />
          {query.length > 0 ? (
            <InputClearButton
              accessibilityLabel={labels.clear}
              inputRef={inputRef}
              onClear={clear}
              style={styles.clearButton}
              testID={clearTestID}
            />
          ) : null}
        </View>
        <FlatList
          testID={listTestID}
          data={rows}
          keyExtractor={row => row.key}
          renderItem={renderRow}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={emptyState}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      </View>
      {nestedOverlay}
    </View>
  );
};

// Figma Список: gap 16 between the section header and cards.
const Separator = () => {
  const styles = useThemedStyles(createStyles);
  return <View style={styles.separator} />;
};
