import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives';
import { useThemedStyles, type Theme } from '../../theme';
import { SyncedTextInput } from '../SyncedTextInput';
import type { PercentageValueFieldProps } from './PercentageValueField.types';

export const PERCENTAGE_VALUE_MAX = 100;
const PERCENTAGE_VALUE_MIN = 0;
const PERCENTAGE_VALUE_STEP = 1;
/** The min/max labels tuck under the slider's bottom margin (app value). */
const MIN_MAX_OFFSET_TOP = -16;

export const clampPercentageValue = (value: number): number =>
  Math.min(PERCENTAGE_VALUE_MAX, Math.max(PERCENTAGE_VALUE_MIN, value));

export const isPercentageValueInput = (value: number): boolean =>
  Number.isInteger(value);

/**
 * Large percentage value with a slider and 0 % / 100 % labels
 * (app `shared/ui/percentage-value-field`). The slider comes from `renderSlider`.
 */
export const PercentageValueField = ({
  value,
  onChange,
  renderSlider,
  testID,
  accessibilityLabel,
}: PercentageValueFieldProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.valueRow}>
        <SyncedTextInput
          testID={testID}
          accessibilityLabel={accessibilityLabel}
          value={String(value)}
          onChangeText={text => {
            if (text.length === 0) {
              onChange(0);
              return;
            }
            const parsed = Number(text);
            if (isPercentageValueInput(parsed)) {
              onChange(clampPercentageValue(parsed));
            }
          }}
          keyboardType="numeric"
          style={styles.value}
        />
        <Text variant="numbers/bold">%</Text>
      </View>
      <View style={styles.slider}>
        {renderSlider({
          min: PERCENTAGE_VALUE_MIN,
          max: PERCENTAGE_VALUE_MAX,
          step: PERCENTAGE_VALUE_STEP,
          value,
          onValueChange: onChange,
        })}
      </View>
      <View style={styles.minMax}>
        <Text variant="caption/regular">{`${PERCENTAGE_VALUE_MIN}%`}</Text>
        <Text variant="caption/regular">{`${PERCENTAGE_VALUE_MAX}%`}</Text>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '100%',
    },
    minMax: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: MIN_MAX_OFFSET_TOP,
      paddingHorizontal: theme.space[1],
      width: '100%',
    },
    slider: {
      width: '100%',
    },
    value: {
      ...theme.typography.numbers.bold,
      color: theme.colors.text.primary,
    },
    valueRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: theme.space[1],
    },
  });
