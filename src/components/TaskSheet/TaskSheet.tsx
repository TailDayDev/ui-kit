import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomModal } from '../CustomModal';
import { ModalHeader } from '../ModalHeader';
import { TaskSheetContent } from '../TaskSheetContent';
import type { TaskSheetProps } from './TaskSheet.types';

const styles = StyleSheet.create({
  // CustomModal's header row keeps its 60pt height; the kit ModalHeader
  // brings its own Figma padding (12/12/12/56), so the row adds none.
  headerRow: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  header: {
    flex: 1,
  },
  replaced: {
    opacity: 0,
  },
});

/**
 * Task actions sheet (Figma `TaskSheet`): bottom sheet with a close-only
 * `ModalHeader` and `TaskSheetContent` rows. Figma `hasFooter=false`, so there
 * is no footer; the "Полоска дома" frame is the device safe area.
 */
export const TaskSheet = ({
  isVisible,
  onClose,
  onDismissed,
  rows,
  closeAccessibilityLabel,
  title,
  isLocked = false,
  isReplaced = false,
  nestedOverlays,
  modalKey,
  closeTestID,
  style,
  testID,
}: TaskSheetProps) => {
  const insets = useSafeAreaInsets();
  const isBlocked = isLocked || isReplaced;

  return (
    <CustomModal
      visible={isVisible}
      onClose={onClose}
      onDismissed={onDismissed}
      isLocked={isBlocked}
      autoHeight
      closeOnBackdropPress
      withBackdrop={!isReplaced}
      containerStyles={isReplaced ? styles.replaced : undefined}
      contentTopPadding={0}
      divider={false}
      modalKey={modalKey}
      closeAccessibilityLabel={closeAccessibilityLabel}
      headerStyles={styles.headerRow}
      header={
        <ModalHeader
          title={title}
          hasTitle={Boolean(title)}
          onClose={onClose}
          closeAccessibilityLabel={closeAccessibilityLabel}
          isDisabled={isBlocked}
          closeTestID={closeTestID}
          style={styles.header}
        />
      }
      nestedOverlays={nestedOverlays}
    >
      <View style={{ paddingBottom: insets.bottom }}>
        <TaskSheetContent rows={rows} style={style} testID={testID} />
      </View>
    </CustomModal>
  );
};
