import { StyleSheet, View } from 'react-native';

import { IconX } from '../../icons/figma';
import { Icon } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import { IconRoundButton } from '../IconButton';
import type { ModalHeaderProps } from './ModalHeader.types';

// Figma ModalHeader › CloseButton: IconRoundButton size=36.
const CLOSE_BUTTON_SIZE = 36;
// Figma ModalHeader › CloseButton › x: 20×20.
const CLOSE_GLYPH_SIZE = 20;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.surface,
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: theme.radius.xl,
      flexDirection: 'row',
      gap: theme.space[2],
      justifyContent: 'flex-end',
      // Left 56 = close button (36) + gap (8) + right padding (12): keeps the title centered.
      paddingBottom: theme.space[3],
      paddingLeft: theme.space[14],
      paddingRight: theme.space[3],
      paddingTop: theme.space[3],
    },
    title: {
      flex: 1,
    },
  });

/** Bottom-sheet header (Figma `ModalHeader`): centered title, round × on the right. */
export const ModalHeader = ({
  title,
  hasTitle = true,
  onClose,
  closeAccessibilityLabel,
  isDisabled = false,
  closeTestID,
  style,
  testID,
}: ModalHeaderProps) => {
  const styles = useThemedStyles(createStyles);
  const isTitleVisible = hasTitle && Boolean(title);

  return (
    <View style={[styles.header, style]} testID={testID}>
      {isTitleVisible ? (
        <Text
          accessibilityRole="header"
          align="center"
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.title}
          variant="headline/bold"
        >
          {title}
        </Text>
      ) : null}
      <IconRoundButton
        accessibilityLabel={closeAccessibilityLabel}
        disabled={isDisabled}
        icon={<Icon icon={IconX} size={CLOSE_GLYPH_SIZE} />}
        onPress={onClose}
        size={CLOSE_BUTTON_SIZE}
        testID={closeTestID}
      />
    </View>
  );
};
