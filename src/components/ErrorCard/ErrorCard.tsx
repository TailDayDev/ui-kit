import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';

import { CloseIcon } from '../../icons/CloseIcon';
import { ErrorIcon } from '../../icons/ErrorIcon';
import { Text } from '../../primitives/Text';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import type { ErrorCardProps } from './ErrorCard.types';

/** App default gap to the screen edges (`space[10]`). */
const DEFAULT_HORIZONTAL_INSET = 40;
/** App default icon size (off-scale). */
const DEFAULT_ICON_SIZE = 36;
/** App close icon frame. */
const CLOSE_ICON_SIZE = 24;
/** App close button pressed opacity (differs from `opacity.pressed`). */
const CLOSE_PRESSED_OPACITY = 0.8;

/*
 * App shadow, no Figma effect: `rgba(0,0,0,0.15)`, offset 0/6, opacity 0.3,
 * radius 12, Android elevation 4. The color is black with a 0x26 (15 %) alpha
 * suffix so iOS and Android render exactly as before.
 */
const SHADOW_COLOR_ALPHA_HEX = '26';
const SHADOW_OFFSET_Y = 6;
const SHADOW_OPACITY = 0.3;
const SHADOW_RADIUS = 12;
const SHADOW_ELEVATION = 4;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bg.surface,
      borderColor: theme.colors.border.default,
      borderWidth: theme.stroke[1],
      borderRadius: theme.radius.lg,
      padding: theme.space[4],
      shadowColor: `${theme.palette.black}${SHADOW_COLOR_ALPHA_HEX}`,
      shadowOffset: { width: 0, height: SHADOW_OFFSET_Y },
      shadowOpacity: SHADOW_OPACITY,
      shadowRadius: SHADOW_RADIUS,
      elevation: SHADOW_ELEVATION,
      alignSelf: 'center',
      alignItems: 'flex-start',
      gap: theme.space[3],
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      gap: theme.space[3],
    },
    textContainer: {
      flex: 1,
      gap: theme.space[1],
    },
    error: {
      textTransform: 'uppercase',
    },
    closeButton: {
      alignSelf: 'flex-start',
    },
    childrenContainer: {
      width: '100%',
      marginTop: theme.space[2],
    },
  });

/** Floating error card: red icon, title, description, error text, close button, optional actions. */
export const ErrorCard = ({
  onCancel,
  closeButtonTestID,
  testID,
  errorTextTestID,
  title,
  description,
  errorText,
  children,
  horizontalInset = DEFAULT_HORIZONTAL_INSET,
  iconSize = DEFAULT_ICON_SIZE,
  closeAccessibilityLabel,
}: ErrorCardProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const screenWidth = Dimensions.get('screen').width;
  const widthStyle: ViewStyle = { width: screenWidth - horizontalInset * 2 };

  return (
    <View style={[styles.container, widthStyle]} testID={testID}>
      <View style={styles.header}>
        <ErrorIcon color={theme.colors.text.error} size={iconSize} />

        <View style={styles.textContainer}>
          {title ? (
            <Text variant="body/bold" color="primary">
              {title}
            </Text>
          ) : null}
          {description ? (
            <Text variant="smallCaption/regular" color="secondary">
              {description}
            </Text>
          ) : null}
          {errorText ? (
            <Text
              variant="smallCaption/regular"
              color="error"
              style={styles.error}
              testID={errorTextTestID}
            >
              {errorText}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          testID={closeButtonTestID}
          onPress={onCancel}
          style={styles.closeButton}
          activeOpacity={CLOSE_PRESSED_OPACITY}
          accessibilityRole="button"
          accessibilityLabel={closeAccessibilityLabel}
        >
          <CloseIcon size={CLOSE_ICON_SIZE} color={theme.colors.icon.default} />
        </TouchableOpacity>
      </View>

      {children ? (
        <View style={styles.childrenContainer}>{children}</View>
      ) : null}
    </View>
  );
};
