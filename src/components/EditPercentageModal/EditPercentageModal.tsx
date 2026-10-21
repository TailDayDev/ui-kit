import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme, useThemedStyles, type Theme } from '../../theme';
import { Button } from '../Button';
import { CustomModal } from '../CustomModal';
import { PercentageValueField } from '../PercentageValueField';
import type {
  EditPercentageModalProps,
  RequestDiscardConfirmation,
} from './EditPercentageModal.types';

/** App content bottom padding (off-scale: not in Figma Spacing). */
const CONTENT_BOTTOM_PADDING = 80;
/** App description width. */
const DESCRIPTION_MAX_WIDTH = 204;

const closeWithoutConfirmation: RequestDiscardConfirmation = (
  _hasChanges,
  onConfirm,
) => onConfirm();

/** Sheet with a percentage field and a Cancel / Save footer. */
export const EditPercentageModal = ({
  onConfirm,
  onClose,
  isVisible,
  onDismissed,
  title,
  defaultValue = 0,
  description,
  isSaving = false,
  cancelTitle,
  saveTitle,
  renderSlider,
  requestConfirmation = closeWithoutConfirmation,
  nestedOverlays,
}: EditPercentageModalProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();
  const [value, setValue] = useState<number>(defaultValue ?? 0);

  useEffect(() => {
    // Seed on open only; the leaving sheet keeps its value.
    if (isVisible) {
      setValue(defaultValue ?? 0);
    }
  }, [title, defaultValue, isVisible]);

  const hasChanges = useMemo(
    () => defaultValue !== value,
    [defaultValue, value],
  );

  // Close request (X, backdrop, Cancel): refused while a save is in flight;
  // with changes the discard confirmation closes it once confirmed.
  const handleCloseRequest = () => {
    if (isSaving) {
      return;
    }
    requestConfirmation(hasChanges, onClose);
  };

  return (
    <CustomModal
      modalKey="EditPercentageModal"
      isLocked={isSaving}
      nestedOverlays={nestedOverlays}
      autoHeight
      avoidKeyboard
      divider={false}
      withoutContainerFooter
      title={title ?? ''}
      visible={isVisible}
      onDismissed={onDismissed}
      onClose={handleCloseRequest}
      footer={
        <View
          style={[
            styles.controlWrapper,
            { paddingBottom: insets.bottom + theme.space[4] },
          ]}
        >
          <Button
            style="light"
            onPress={handleCloseRequest}
            title={cancelTitle}
          />
          <Button
            onPress={() => {
              // The owner shows the error; a rejection must not go unhandled.
              void Promise.resolve(onConfirm(value)).catch(() => undefined);
            }}
            disabled={!hasChanges || isSaving}
            loading={isSaving}
            title={saveTitle}
          />
        </View>
      }
    >
      <View style={styles.modalContent}>
        <PercentageValueField
          value={value}
          onChange={setValue}
          renderSlider={renderSlider}
        />
        {description ? (
          <Text style={styles.modalDescription}>{description}</Text>
        ) : null}
      </View>
    </CustomModal>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    // paddingBottom (bottom inset + space[4]) is added at render.
    controlWrapper: {
      borderColor: theme.colors.border.default,
      borderTopWidth: theme.stroke[1],
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: theme.space[6],
      paddingTop: theme.space[4],
      width: '100%',
    },
    modalContent: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: theme.space[10],
      paddingBottom: CONTENT_BOTTOM_PADDING,
    },
    modalDescription: {
      ...theme.typography.caption.regular,
      color: theme.colors.text.secondary,
      marginBottom: theme.space[12],
      maxWidth: DESCRIPTION_MAX_WIDTH,
      textAlign: 'center',
    },
  });
