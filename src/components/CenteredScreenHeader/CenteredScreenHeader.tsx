import { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChevronLeftIcon } from '../../icons/ChevronLeftIcon';
import { Icon } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useTheme, type Theme } from '../../theme';
import type { CenteredScreenHeaderProps } from './CenteredScreenHeader.types';
import {
  SCREEN_HEADER_BACK_BUTTON_SIZE,
  SCREEN_HEADER_BAR_HEIGHT,
  SCREEN_HEADER_DIVIDER_WIDTH,
  SCREEN_HEADER_HORIZONTAL_PADDING,
} from './screenHeaderMetrics';

/** Space kept free on both sides of the centered title for the back button and right action. */
const HEADER_SIDE_RESERVE = 104;
/** Extra touch area around the back button. */
const BACK_BUTTON_HIT_SLOP = 8;
/** App back chevron size. */
const BACK_ICON_SIZE = 20;
// off-scale: the app subtitle is `body/regular` at 12pt (no Figma text style).
const SUBTITLE_FONT_SIZE = 12;

const createStyles = (theme: Theme, topInset: number) =>
  StyleSheet.create({
    backButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      borderRadius: SCREEN_HEADER_BACK_BUTTON_SIZE / 2,
      height: SCREEN_HEADER_BACK_BUTTON_SIZE,
      justifyContent: 'center',
      width: SCREEN_HEADER_BACK_BUTTON_SIZE,
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.surface,
      borderBottomColor: theme.colors.border.default,
      borderBottomWidth: SCREEN_HEADER_DIVIDER_WIDTH,
      flexDirection: 'row',
      height: SCREEN_HEADER_BAR_HEIGHT + topInset,
      paddingHorizontal: SCREEN_HEADER_HORIZONTAL_PADDING,
      paddingTop: topInset,
      position: 'relative',
      width: '100%',
    },
    rightAction: {
      alignItems: 'flex-end',
      flexShrink: 0,
      marginLeft: 'auto',
      zIndex: 1,
    },
    subtitle: {
      fontSize: SUBTITLE_FONT_SIZE,
      marginTop: theme.space[0.25],
    },
    titleLayer: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      left: 0,
      paddingHorizontal: HEADER_SIDE_RESERVE,
      position: 'absolute',
      right: 0,
      top: topInset,
    },
  });

/**
 * Screen header: centered title (+ subtitle), round back button on the left,
 * optional action on the right. Adds the top safe-area inset.
 */
export const CenteredScreenHeader = ({
  title,
  goBack,
  backButtonTestID,
  rightAction,
  subtitle,
  testID,
}: CenteredScreenHeaderProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(
    () => createStyles(theme, insets.top),
    [insets.top, theme],
  );

  return (
    <View style={styles.container} testID={testID}>
      <View pointerEvents="none" style={styles.titleLayer}>
        <Text variant="headline/bold" align="center" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text
            variant="body/regular"
            color="secondary"
            align="center"
            numberOfLines={1}
            style={styles.subtitle}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        hitSlop={BACK_BUTTON_HIT_SLOP}
        style={styles.backButton}
        testID={backButtonTestID}
        onPress={goBack}
      >
        <Icon icon={ChevronLeftIcon} size={BACK_ICON_SIZE} />
      </Pressable>
      {rightAction ? (
        <View style={styles.rightAction}>{rightAction}</View>
      ) : null}
    </View>
  );
};
