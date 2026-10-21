import { StyleSheet, View } from 'react-native';

import { useThemedStyles, type Theme } from '../../theme';
import type { RadioProps } from './Radio.types';

/** App `Radio` default outer diameter (Figma `Radio` size=24). */
export const DEFAULT_RADIO_SIZE = 24;
/** App `Radio` default inner dot diameter. */
export const DEFAULT_RADIO_DOT_SIZE = 12;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    dot: {
      backgroundColor: theme.colors.bg.accent,
      borderRadius: theme.radius.full,
    },
    ring: {
      borderColor: theme.colors.icon.default,
      borderRadius: theme.radius.full,
      borderWidth: theme.stroke[1],
    },
    ringActive: {
      alignItems: 'center',
      borderColor: theme.colors.icon.accent,
      justifyContent: 'center',
    },
  });

/**
 * Radio indicator. Purely visual: put it inside a tappable row that sets
 * `accessibilityRole="radio"` and `accessibilityState={{ checked }}`.
 */
export const Radio = ({
  isActive,
  dotSize = DEFAULT_RADIO_DOT_SIZE,
  size = DEFAULT_RADIO_SIZE,
  style,
  testID,
}: RadioProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View
      testID={testID}
      style={[
        styles.ring,
        { height: size, width: size },
        isActive && styles.ringActive,
        style,
      ]}
    >
      {isActive ? (
        <View
          testID={testID ? `${testID}.dot` : undefined}
          style={[styles.dot, { height: dotSize, width: dotSize }]}
        />
      ) : null}
    </View>
  );
};
