import { StyleSheet, View } from 'react-native';

import { useThemedStyles, type Theme } from '../../theme';
import { Button } from '../Button';
import type { CustomModalFooterActionsProps } from './CustomModalFooterActions.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    column: {
      alignItems: 'stretch',
      flexDirection: 'column',
      gap: theme.space[4],
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

/**
 * Sheet footer (Figma `CustomModalFooterActions`): a light "Cancel" button and
 * the main action, side by side (`row`) or stacked with the main one on top
 * (`column`).
 */
export const CustomModalFooterActions = ({
  cancelLabel,
  primaryLabel,
  onCancel,
  onPrimary,
  isPrimaryDisabled = false,
  isPrimaryLoading = false,
  primaryStyle = 'default',
  direction = 'row',
  style,
  testID,
  cancelTestID,
  primaryTestID,
}: CustomModalFooterActionsProps) => {
  const styles = useThemedStyles(createStyles);
  const isColumn = direction === 'column';

  const cancelButton = (
    <Button
      onPress={onCancel}
      style="light"
      testID={cancelTestID}
      title={cancelLabel}
    />
  );
  const primaryButton = (
    <Button
      disabled={isPrimaryDisabled}
      loading={isPrimaryLoading}
      onPress={onPrimary}
      style={primaryStyle}
      testID={primaryTestID}
      title={primaryLabel}
    />
  );

  return (
    <View
      style={[isColumn ? styles.column : styles.row, style]}
      testID={testID}
    >
      {isColumn ? primaryButton : cancelButton}
      {isColumn ? cancelButton : primaryButton}
    </View>
  );
};
