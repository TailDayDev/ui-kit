import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { TodayTaskCardProps } from '../TodayTaskCard';

/** Figma VARIANT `state` of `TodaySearchModalContent`. */
export type TodaySearchModalContentState = 'initial' | 'results' | 'no-results';

/** One found task: the props of its `TodayTaskCard` plus a key. */
export interface TodaySearchModalContentTask extends TodayTaskCardProps {
  /** Stable React key (feed item id). */
  id: string;
}

/** A group of found tasks under one `TodaySectionHeader` (e.g. "Morning — 20 October: 1"). */
export interface TodaySearchModalContentSection {
  /** Stable React key (section id + date). */
  id: string;
  /** Section label including the count (Figma `TodaySectionHeader` `title`). */
  title: string;
  /** Title in red for an overdue section from a past day (`TodaySectionHeader` `isPastDate`). */
  isPastDate?: boolean;
  /** Tasks of the section, top to bottom. */
  tasks: TodaySearchModalContentTask[];
}

/** Texts of the search body. All come from the app (translated). */
export interface TodaySearchModalContentLabels {
  /** Hint in the empty field (Figma `Текст запроса` in `state=initial`, e.g. "Search"). Also the field's screen-reader label. */
  placeholder: string;
  /** Text before anything is typed (Figma `Начальное состояние`, e.g. "Search results will appear here"). */
  initial: string;
  /** Text when nothing matches (Figma `Ничего не найдено`). */
  noResults: string;
  /** Screen-reader label of the clear control (Figma `Кнопка стирания`). */
  clear: string;
}

/**
 * Body of the Today task search modal (Figma `TodaySearchModalContent`): a
 * search field and the found tasks grouped by section. Data in, callbacks out.
 */
export interface TodaySearchModalContentProps {
  /** Figma VARIANT `state`: hint, found tasks or "nothing found". Defaults to `'initial'`. */
  state?: TodaySearchModalContentState;
  /** Text in the field (controlled). Figma TEXT `query`. */
  query: string;
  /** Called with the new text on every keystroke. */
  onQueryChange: (query: string) => void;
  /** Called by the clear control. Defaults to `onQueryChange('')`. */
  onClear?: () => void;
  /** Found tasks grouped by section. Shown when `state='results'`. */
  sections?: TodaySearchModalContentSection[];
  /**
   * Wraps a rendered card (e.g. in the app's completion-exit animation row).
   * Defaults to the card itself.
   */
  renderTask?: (
    task: TodaySearchModalContentTask,
    card: ReactNode,
  ) => ReactNode;
  /** Texts of the field and the empty states. */
  labels: TodaySearchModalContentLabels;
  /** Focuses the field on mount. Defaults to `true`. */
  isAutoFocused?: boolean;
  /**
   * A modal opened from inside this body (e.g. the «⋮» sheet). Rendered inside
   * the body, not as a sibling of the parent modal: iOS shows only one level.
   */
  nestedOverlay?: ReactNode;
  /** Outer style. The body fills its parent. Applied last. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the body; the search field gets `${testID}.field`. */
  testID?: string;
  /** Test identifier of the text input. */
  inputTestID?: string;
  /** Test identifier of the clear control. */
  clearTestID?: string;
  /** Test identifier of the results list. */
  listTestID?: string;
  /** Test identifier of the initial / no-results text block. */
  emptyStateTestID?: string;
}
