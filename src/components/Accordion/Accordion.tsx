import { createContext, memo, useCallback, useContext, useMemo } from 'react';
import { LayoutAnimation, Pressable, StyleSheet, View } from 'react-native';

import { useThemedStyles, type Theme } from '../../theme';
import type {
  AccordionGroupProps,
  AccordionItemControls,
  AccordionItemProps,
} from './Accordion.types';

/** App open/close animation (ms). */
const FAST_EASE = {
  duration: 180,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
    duration: 120,
  },
  update: { type: LayoutAnimation.Types.easeInEaseOut },
  delete: { type: LayoutAnimation.Types.easeInEaseOut, duration: 120 },
} as const;

const ANDROID_RIPPLE = { borderless: true } as const;

interface AccordionContextValue {
  openId: string | null;
  setOpenId: (id: string | null) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.bg.surface,
      borderRadius: theme.radius.lg,
      borderWidth: theme.stroke[1],
      overflow: 'hidden',
    },
    // Applied after `containerStyle`, as in the app: the border color always wins.
    cardBorder: {
      borderColor: theme.colors.border.default,
    },
    cardError: {
      borderColor: theme.colors.text.error,
    },
    headerTouchable: { padding: theme.space[6] },
    expanded: {
      flex: 1,
      minHeight: 0,
      paddingHorizontal: theme.space[6],
    },
  });

/** Controlled group: only one `AccordionItem` inside is open at a time. */
export const AccordionGroup = ({
  children,
  openId,
  setOpenIdState,
  style,
}: AccordionGroupProps) => {
  const setOpenId = useCallback(
    (id: string | null) => {
      if (openId === id) {
        return;
      }
      LayoutAnimation.configureNext(FAST_EASE);
      setOpenIdState(id);
    },
    [openId, setOpenIdState],
  );

  const value = useMemo(() => ({ openId, setOpenId }), [openId, setOpenId]);

  return (
    <AccordionContext.Provider value={value}>
      <View style={style}>{children}</View>
    </AccordionContext.Provider>
  );
};

/** Bordered card that shows `collapsed` when closed and `expanded` when open. */
export const AccordionItem = memo(function AccordionItem({
  id,
  collapsed,
  expanded,
  pressToToggle = true,
  containerStyle,
  collapsedPressableStyle,
  isError = false,
  pointerEvents,
}: AccordionItemProps) {
  const styles = useThemedStyles(createStyles);
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('AccordionItem must be rendered inside <AccordionGroup>.');
  }

  const { openId, setOpenId } = ctx;
  const isOpen = openId === id;

  const open = useCallback(() => {
    // setOpenId configures the layout animation.
    if (!isOpen) {
      setOpenId(id);
    }
  }, [id, isOpen, setOpenId]);

  const close = useCallback(() => {
    if (isOpen) {
      setOpenId(null);
    }
  }, [isOpen, setOpenId]);

  const toggle = useCallback(
    () => (isOpen ? close() : open()),
    [isOpen, open, close],
  );

  const controls: AccordionItemControls = { isOpen, open, close, toggle };

  return (
    <View
      pointerEvents={pointerEvents}
      style={[
        styles.card,
        containerStyle,
        isError ? styles.cardError : styles.cardBorder,
      ]}
    >
      {!isOpen ? (
        <Pressable
          testID={`accordion.${id}`}
          onPress={pressToToggle ? toggle : undefined}
          accessibilityRole={pressToToggle ? 'button' : undefined}
          accessibilityState={pressToToggle ? { expanded: false } : undefined}
          style={[styles.headerTouchable, collapsedPressableStyle]}
          android_ripple={ANDROID_RIPPLE}
        >
          {collapsed(controls)}
        </Pressable>
      ) : (
        // Visible as soon as it mounts. The open fades in through the layout
        // animation; a JS-started opacity animation could stay at 0 on iOS
        // until the next touch, leaving the open section blank.
        <View style={styles.expanded}>{expanded(controls)}</View>
      )}
    </View>
  );
});
