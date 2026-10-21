import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import type { TextColorRole } from '../../tokens';
import type {
  TodayTaskTimeProps,
  TodayTaskTimeTone,
} from './TodayTaskTime.types';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
});

const TONE_COLORS: Record<
  TodayTaskTimeTone,
  { title: TextColorRole; subtitle: TextColorRole }
> = {
  default: { title: 'primary', subtitle: 'secondary' },
  overdue: { title: 'error', subtitle: 'error' },
  completed: { title: 'primary', subtitle: 'secondary' },
};

/** Right-aligned task time and caption of a Today task card (Figma `TodayTaskTime`). */
export const TodayTaskTime = ({
  title,
  subtitle,
  hasSubtitle = true,
  tone = 'default',
  style,
  testID,
}: TodayTaskTimeProps) => {
  const colors = TONE_COLORS[tone];
  const isSubtitleVisible = hasSubtitle && Boolean(subtitle);

  return (
    <View testID={testID} style={[styles.container, style]}>
      <Text
        variant="headline/bold"
        color={colors.title}
        align="right"
        numberOfLines={1}
      >
        {title}
      </Text>
      {isSubtitleVisible ? (
        <Text
          variant="smallCaption/regular"
          color={colors.subtitle}
          align="right"
          numberOfLines={1}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
};
