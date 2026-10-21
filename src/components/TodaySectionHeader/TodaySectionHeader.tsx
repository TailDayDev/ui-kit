import { Pressable, StyleSheet, View } from 'react-native';

import { IconChevronDown, IconChevronUp } from '../../icons/figma';
import { Icon } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import { IconRoundButton } from '../IconButton';
import type { TodaySectionHeaderProps } from './TodaySectionHeader.types';

// Figma TodaySectionHeader › Кнопка · свернуть раздел: 24×24 round button.
const CHEVRON_BUTTON_SIZE = 24;
// Figma TodaySectionHeader › chevron-up / chevron-down: 16×16.
const CHEVRON_GLYPH_SIZE = 16;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    chevronAndLine: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      gap: theme.space[2],
    },
    line: {
      backgroundColor: theme.colors.border.default,
      flex: 1,
      height: theme.stroke[1],
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space[2],
      paddingTop: theme.space[3],
    },
  });

/**
 * Today feed section divider (Figma `TodaySectionHeader`): a hairline, the
 * section title with its count, a round collapse chevron and a second
 * hairline. A collapsible row with `onToggle` is one button for the whole
 * width (as in the app); the chevron is its visual cue only.
 */
export const TodaySectionHeader = ({
  title,
  isCollapsible = true,
  isExpanded = true,
  isPastDate = false,
  onToggle,
  style,
  testID,
}: TodaySectionHeaderProps) => {
  const styles = useThemedStyles(createStyles);
  const isToggle = isCollapsible && Boolean(onToggle);

  const content = (
    <>
      <View style={styles.line} />
      <Text color={isPastDate ? 'error' : 'primary'} variant="caption/regular">
        {title}
      </Text>
      <View style={styles.chevronAndLine}>
        {isCollapsible ? (
          // Decorative: the row is the button, so the chevron is hidden from
          // touches and screen readers to avoid a nested second control.
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            pointerEvents="none"
          >
            <IconRoundButton
              accessibilityLabel={title}
              icon={
                <Icon
                  icon={isExpanded ? IconChevronUp : IconChevronDown}
                  size={CHEVRON_GLYPH_SIZE}
                />
              }
              size={CHEVRON_BUTTON_SIZE}
            />
          </View>
        ) : null}
        <View style={styles.line} />
      </View>
    </>
  );

  if (!isToggle) {
    return (
      <View
        accessibilityLabel={title}
        style={[styles.row, style]}
        testID={testID}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ expanded: isExpanded }}
      onPress={onToggle}
      style={[styles.row, style]}
      testID={testID}
    >
      {content}
    </Pressable>
  );
};
