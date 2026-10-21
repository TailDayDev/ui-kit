import { StyleSheet, View } from 'react-native';

import { useThemedStyles, type Theme } from '../../theme';
import { Button } from '../Button';
import { CustomModal } from '../CustomModal';
import type { ModalWithFooterActionsProps } from './ModalWithFooterActions.types';

/** App footer bottom padding (off-scale: not in Figma Spacing). */
const FOOTER_ACTIONS_BOTTOM_PADDING = 14;

/**
 * CustomModal with a Cancel (`light`) + main action footer.
 * Figma: `CustomModalFooterActions` (row).
 */
export const ModalWithFooterActions = ({
  children,
  modalKey,
  onClose,
  onPressPrimary,
  onPressSecondary,
  primaryTitle,
  secondaryTitle,
  title,
  visible,
  autoHeight = false,
  contentStyle,
  footerActionsStyle,
  footerStyle,
  handleBackBtn,
  isPrimaryDisabled = false,
  isPrimaryLoading = false,
  isLocked = false,
  modalRef,
  onDismissed,
  primaryButtonStyle,
  primaryButtonTestID,
  secondaryButtonTestID,
  scrollEnabled = false,
  pageHost,
  nestedOverlays,
}: ModalWithFooterActionsProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <CustomModal
      ref={modalRef}
      modalKey={modalKey}
      visible={visible}
      onClose={onClose}
      isLocked={isLocked}
      onDismissed={onDismissed}
      divider={false}
      autoHeight={autoHeight}
      withoutContainerFooter
      scrollEnabled={scrollEnabled}
      pageHost={pageHost}
      nestedOverlays={nestedOverlays}
      title={title}
      handleBackBtn={handleBackBtn}
      footer={
        <View style={[styles.footer, footerStyle]}>
          <View style={[styles.footerActions, footerActionsStyle]}>
            <Button
              title={secondaryTitle}
              onPress={onPressSecondary}
              style="light"
              testID={secondaryButtonTestID}
            />
            <Button
              title={primaryTitle}
              onPress={onPressPrimary}
              disabled={isPrimaryDisabled}
              loading={isPrimaryLoading}
              style={primaryButtonStyle}
              testID={primaryButtonTestID}
            />
          </View>
        </View>
      }
    >
      <View style={[styles.content, contentStyle]}>{children}</View>
    </CustomModal>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      flex: 1,
    },
    footer: {
      backgroundColor: theme.colors.bg.surface,
      borderTopColor: theme.colors.border.default,
      borderTopWidth: theme.stroke[1],
      paddingTop: theme.space[4],
    },
    footerActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: theme.space[6],
      paddingBottom: FOOTER_ACTIONS_BOTTOM_PADDING,
    },
  });
