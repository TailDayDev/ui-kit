import type { ReactNode } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

import { ChevronLeftIcon } from '../../icons/ChevronLeftIcon';
import { CloseIcon } from '../../icons/CloseIcon';
import { useTheme } from '../../theme';
import { IconRoundButton } from '../IconButton';
import { HEADER_BUTTON_SIZE, HEADER_GLYPH_SIZE } from './CustomModal.constants';
import type { CustomModalStyles } from './CustomModal.styles';

/** Back tap area beyond the button (app value). */
const BACK_HIT_SLOP = 4;

interface IModalHeaderProps {
  styles: CustomModalStyles;
  title?: ReactNode;
  /** Fades the title in on every page change. */
  titleOpacity: Animated.Value;
  /** Shows the back button when set. */
  onBack?: () => void;
  onClose: () => void;
  isDisabled: boolean;
  closeTestID: string;
  closeAccessibilityLabel: string;
}

/** The default header: back (pages), title, close. */
export const ModalHeader = ({
  styles,
  title,
  titleOpacity,
  onBack,
  onClose,
  isDisabled,
  closeTestID,
  closeAccessibilityLabel,
}: IModalHeaderProps) => {
  const theme = useTheme();

  return (
    <>
      {onBack ? (
        <TouchableOpacity
          accessibilityRole="button"
          disabled={isDisabled}
          hitSlop={BACK_HIT_SLOP}
          onPress={onBack}
          style={styles.backButton}
          testID="custom-modal-back"
        >
          <ChevronLeftIcon
            color={theme.colors.icon.default}
            size={HEADER_GLYPH_SIZE}
          />
        </TouchableOpacity>
      ) : null}
      {title ? (
        <Animated.Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[styles.title, { opacity: titleOpacity }]}
        >
          {title}
        </Animated.Text>
      ) : null}
      <IconRoundButton
        accessibilityLabel={closeAccessibilityLabel}
        disabled={isDisabled}
        icon={
          <CloseIcon
            color={theme.colors.icon.default}
            size={HEADER_GLYPH_SIZE}
          />
        }
        onPress={onClose}
        size={HEADER_BUTTON_SIZE}
        style={styles.closeButton}
        testID={closeTestID}
      />
    </>
  );
};
