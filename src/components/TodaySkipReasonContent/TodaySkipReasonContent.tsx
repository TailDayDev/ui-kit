import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import { OptionRow } from '../OptionRow';
import { Textarea } from '../Textarea';
import type { TodaySkipReasonContentProps } from './TodaySkipReasonContent.types';

// Figma TodaySkipReasonContent › Ввод причины › Поле: fixed height 132.
const REASON_FIELD_HEIGHT = 132;

const createStyles = (theme: Theme) => {
  const counterGap = theme.space[2];
  const counterLineHeight =
    theme.typography.smallCaption.medium.lineHeight ?? 0;
  // The kit Textarea draws its counter absolutely under the field; reserve
  // the Figma gap (8) + counter line (12) and pin the counter there.
  const counterSpace = counterGap + counterLineHeight;
  return StyleSheet.create({
    container: {
      gap: theme.space[8],
      paddingBottom: theme.space[6],
      paddingHorizontal: theme.space[6],
      paddingTop: theme.space[2],
    },
    heading: {
      gap: theme.space[2],
    },
    otherReason: {
      backgroundColor: theme.colors.bg.surface,
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.lg,
      borderWidth: theme.stroke[1],
      gap: theme.space[2],
      padding: theme.space[4],
    },
    reasonCounter: {
      ...theme.typography.smallCaption.medium,
      bottom: -counterSpace,
      paddingTop: 0,
    },
    reasonField: {
      height: REASON_FIELD_HEIGHT,
      justifyContent: 'flex-start',
      paddingBottom: 0,
      paddingHorizontal: theme.space[4],
      paddingTop: theme.space[3],
    },
    reasonFieldWithCounter: {
      marginBottom: counterSpace,
    },
    reasonInput: {
      ...theme.typography.body.regular,
      flex: 1,
    },
    reasons: {
      gap: theme.space[4],
    },
  });
};

const noopChange = () => undefined;

/**
 * Body of the skip-task modal (Figma `TodaySkipReasonContent`). Data in,
 * callbacks out: the parent owns the selected reason and the text.
 */
export const TodaySkipReasonContent = ({
  title,
  subtitle,
  reasons,
  selectedReasonKey = null,
  onSelectReason,
  hasOtherReason = false,
  reasonLabel,
  reasonDescription = '',
  onReasonDescriptionChange = noopChange,
  reasonMaxLength,
  reasonPlaceholder,
  reasonInputTestID,
  style,
  testID,
}: TodaySkipReasonContentProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View testID={testID} style={[styles.container, style]}>
      <View style={styles.heading}>
        <Text variant="largeTitle/semibold" accessibilityRole="header">
          {title}
        </Text>
        <Text variant="caption/regular" color="secondary">
          {subtitle}
        </Text>
      </View>
      <View style={styles.reasons}>
        <View
          accessibilityRole="radiogroup"
          accessibilityLabel={title}
          style={styles.reasons}
        >
          {reasons.map(reason => (
            <OptionRow
              key={reason.key}
              label={reason.label}
              isSelected={reason.key === selectedReasonKey}
              onPress={() => onSelectReason(reason.key)}
              testID={reason.testID}
            />
          ))}
        </View>
        {hasOtherReason ? (
          <View
            testID={testID ? `${testID}.otherReason` : undefined}
            style={styles.otherReason}
          >
            {reasonLabel ? (
              <Text variant="headline/bold">{reasonLabel}</Text>
            ) : null}
            <Textarea
              testID={reasonInputTestID}
              value={reasonDescription}
              setValue={onReasonDescriptionChange}
              placeholder={reasonPlaceholder}
              accessibilityLabel={reasonLabel}
              maxLength={reasonMaxLength}
              containerStyle={[
                styles.reasonField,
                reasonMaxLength ? styles.reasonFieldWithCounter : null,
              ]}
              inputStyle={styles.reasonInput}
              counterStyle={styles.reasonCounter}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};
