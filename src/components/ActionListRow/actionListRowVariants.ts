import type { TextStyle, ViewStyle } from 'react-native';

import type { Theme } from '../../theme';
import type { ActionListRowVariant } from './ActionListRow.types';

interface ActionListRowVariantStyles {
  row: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  rightText: TextStyle;
  titleNumberOfLines: number;
  descriptionNumberOfLines: number;
  iconPlacement?: 'leading' | 'trailing';
}

/** Default number of title / description lines. */
const DEFAULT_LINES = 2;
const SINGLE_LINE = 1;
/** App card-source / card-settings row height (off-scale size, not spacing). */
const CARD_ROW_HEIGHT = 52;
/** Card-source / card-settings content height: row height minus the two 1pt borders. */
const CARD_CONTENT_MIN_HEIGHT = 50;
/** App card-attachment row height. */
const ATTACHMENT_ROW_MIN_HEIGHT = 58;
/** Card-attachment content height: row height minus the two 1pt borders. */
const ATTACHMENT_CONTENT_MIN_HEIGHT = 56;

const EMPTY_VARIANT: ActionListRowVariantStyles = {
  row: {},
  content: {},
  title: {},
  description: {},
  rightText: {},
  titleNumberOfLines: DEFAULT_LINES,
  descriptionNumberOfLines: DEFAULT_LINES,
};

/** Variant overrides on top of the flat row. `null` for `flat`. */
export const getActionListRowVariantStyles = (
  theme: Theme,
  variant: ActionListRowVariant,
): ActionListRowVariantStyles | null => {
  if (variant === 'flat') {
    return null;
  }

  if (variant === 'trailing-icon') {
    return { ...EMPTY_VARIANT, iconPlacement: 'trailing' };
  }

  const cardBase: ViewStyle = {
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    paddingVertical: 0,
  };

  if (variant === 'card-source' || variant === 'card-source-trailing') {
    return {
      row: {
        ...cardBase,
        minHeight: CARD_ROW_HEIGHT,
        paddingHorizontal: theme.space[4],
      },
      content: { minHeight: CARD_CONTENT_MIN_HEIGHT },
      title: {
        ...theme.typography.body.medium,
        color: theme.colors.text.primary,
      },
      description: {
        ...theme.typography.caption.regular,
        color: theme.colors.text.secondary,
        marginTop: theme.space[1],
      },
      rightText: {
        ...theme.typography.body.regular,
        color: theme.colors.text.primary,
      },
      titleNumberOfLines: DEFAULT_LINES,
      descriptionNumberOfLines: DEFAULT_LINES,
      iconPlacement:
        variant === 'card-source-trailing' ? 'trailing' : 'leading',
    };
  }

  if (variant === 'card-settings') {
    return {
      row: {
        ...cardBase,
        height: CARD_ROW_HEIGHT,
        paddingHorizontal: theme.space[3],
      },
      content: { minHeight: CARD_CONTENT_MIN_HEIGHT },
      title: {
        ...theme.typography.caption.medium,
        color: theme.colors.text.primary,
      },
      description: {
        ...theme.typography.caption.regular,
        color: theme.colors.text.secondary,
        marginTop: theme.space[1],
      },
      rightText: {
        ...theme.typography.caption.medium,
        color: theme.colors.text.accent,
      },
      titleNumberOfLines: SINGLE_LINE,
      descriptionNumberOfLines: DEFAULT_LINES,
    };
  }

  return {
    row: {
      ...cardBase,
      minHeight: ATTACHMENT_ROW_MIN_HEIGHT,
      paddingHorizontal: theme.space[3],
    },
    content: { minHeight: ATTACHMENT_CONTENT_MIN_HEIGHT },
    title: {
      ...theme.typography.caption.medium,
      color: theme.colors.text.primary,
    },
    description: {
      ...theme.typography.smallCaption.regular,
      color: theme.colors.text.secondary,
      marginTop: theme.space[0.5],
    },
    rightText: {
      ...theme.typography.body.regular,
      color: theme.colors.text.primary,
    },
    titleNumberOfLines: SINGLE_LINE,
    descriptionNumberOfLines: SINGLE_LINE,
  };
};

/** `true` for the bordered `card-*` variants. */
export const isActionListRowCardVariant = (
  variant: ActionListRowVariant,
): boolean => variant.startsWith('card-');
