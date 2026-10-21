import type { ComponentType, ReactElement, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Minimal structural shape of an option. App nomenclature / accommodation
 * items are structurally compatible, so they can be passed directly.
 */
export interface MultiSelectItem {
  id?: string | number | null;
  title?: string | number | null;
  description?: ReactNode | string | number | null;
  /** Icon: URL, bundled image module or a ready element. */
  imageUrl?: string | number | ReactElement | null;
  /** Translation key shown (grey) when there is no `description`; resolved by `resolveDescriptionCode`. */
  descriptionCode?: string | null;
  code?: string | null;
  titleCode?: string | null;
  /** App image key; resolved by `renderIcon` / `renderItemIcon`. */
  imageCode?: string | null;
  /** Custom items sort after the built-in ones. */
  isCustom?: boolean;
  /** Sort position; missing values sort last. */
  displayOrder?: number | string | null;
  /** Called after the item was activated. */
  onPress?: () => void;
}

/** Values `MultiSelectCard` hands to `renderIcon`. */
export interface MultiSelectIconRenderParams {
  /** The option being drawn. */
  item: MultiSelectItem;
  /** Icon side in points. */
  size: number;
  /** Tint: accent when selected, secondary otherwise; `undefined` when `isItemColor` is off. */
  color?: string;
}

/** Option card used by `MultiSelect` (also usable alone). */
export interface MultiSelectCardProps {
  /** The option. Without it only `children` are drawn. */
  item?: MultiSelectItem;
  /** Called on tap. Without it the card is static. */
  handlePress?: () => void;
  /** Blocks taps and dims the card (0.6). */
  disabled?: boolean;
  /** Accent border, soft accent fill and accent texts. */
  selected?: boolean;
  /** Extra card style, applied last. */
  restStyle?: StyleProp<ViewStyle>;
  /** Style of the icon + text row. */
  rowStyles?: ViewStyle;
  /** Extra content after the row. */
  children?: ReactNode;
  /** Icon size. Defaults to 24. */
  iconSize?: number;
  /** Tints the icon with the selection color. Defaults to `false`. */
  isItemColor?: boolean;
  /** Shows the description line. Defaults to `true`. */
  showDescription?: boolean;
  /** Shows the icon. Defaults to `true`. */
  showIcon?: boolean;
  /** Test identifier of the card. */
  testID?: string;
  /** Draws the card shadow. Defaults to `false`. */
  withShadow?: boolean;
  /**
   * Draws the icon (app: `DinamicImage` with `getImage(item.imageCode)`).
   * Without it, an element `imageUrl` is shown as is and a URL / module with RN `Image`.
   */
  renderIcon?: (params: MultiSelectIconRenderParams) => ReactNode;
  /** Turns `descriptionCode` into text (app: `translate`). Without it the code is shown as is. */
  resolveDescriptionCode?: (code: string) => string;
}

export type MultiSelectSelectionMode = 'multiple' | 'single';

/** Props a custom `itemComponent` receives for each option. */
export interface MultiSelectItemComponentProps {
  item: MultiSelectItem;
  index: number;
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
}

/** List of selectable option cards (vertical or two-column wrapped). */
export interface MultiSelectProps {
  /** Options. Sorted by `isCustom`, `displayOrder`, then `parameter` unless `preserveOrder`. */
  list: MultiSelectItem[];
  /** Called with the option value (`item[parameter]`) on tap. */
  handlePress: (code: number | string) => void;
  /** Selected values. */
  selectedItems: (number | string)[];
  /** Item field used as the value. Defaults to `'id'`. */
  parameter?: string;
  /** Disables every option. */
  disabled?: boolean;
  /** `'wrapped'` lays options out in two columns. */
  variant?: string;
  /** Values shown as selected and locked (dimmed to 0.4). */
  disabledItems?: Array<number | string>;
  /** Content after the options. */
  children?: ReactNode;
  /** Icon size of each card. */
  iconSize?: number;
  /** Tints icons with the selection color. Defaults to `true`. */
  isItemColor?: boolean;
  /** Shows descriptions. Defaults to `true`. */
  showDescription?: boolean;
  /** Shows icons. Defaults to `true`. */
  showIcon?: boolean;
  /** Gap between options. Defaults to 8. */
  gap?: ViewStyle['gap'];
  /** Keeps the historical multi-select behavior by default. */
  selectionMode?: MultiSelectSelectionMode;
  /** Optional renderer for replacing the default MultiSelectCard per item. */
  itemComponent?: ComponentType<MultiSelectItemComponentProps>;
  /** Runs in addition to handlePress for the item that was activated. */
  onItemPress?: (item: MultiSelectItem, value: number | string) => void;
  /** Optional controlled-state helper; receives the next ids for the active mode. */
  onSelectionChange?: (selectedItems: (number | string)[]) => void;
  /** Extra style of every card. */
  itemStyle?: StyleProp<ViewStyle>;
  /** Test identifier per card. */
  itemTestID?: (item: MultiSelectItem, index: number) => string | undefined;
  /** Keeps `list` order instead of sorting. */
  preserveOrder?: boolean;
  /** Passed to every card's `renderIcon`. */
  renderItemIcon?: MultiSelectCardProps['renderIcon'];
  /** Passed to every card's `resolveDescriptionCode`. */
  resolveDescriptionCode?: MultiSelectCardProps['resolveDescriptionCode'];
}
