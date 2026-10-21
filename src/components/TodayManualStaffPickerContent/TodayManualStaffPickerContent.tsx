import { StyleSheet, View } from 'react-native';

import { useThemedStyles, type Theme } from '../../theme';
import { StaffPickerRow } from '../StaffPickerRow';
import { PickerNoneRow } from '../PickerNoneRow';
import type { TodayManualStaffPickerContentProps } from './TodayManualStaffPickerContent.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: theme.space[6],
      paddingHorizontal: theme.space[6],
      paddingTop: theme.space[2],
    },
    list: {
      gap: theme.space[2],
    },
  });

/**
 * Body of the "choose staff" modal (Figma `TodayManualStaffPickerContent`).
 * The parent owns the (draft) selection; the modal and its footer stay outside.
 */
export const TodayManualStaffPickerContent = ({
  staff,
  selectedId,
  onSelect,
  noneLabel,
  accessibilityLabel,
  noneTestID,
  style,
  testID,
}: TodayManualStaffPickerContentProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View testID={testID} style={[styles.container, style]}>
      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        style={styles.list}
      >
        <PickerNoneRow
          label={noneLabel}
          isSelected={selectedId === null}
          onPress={() => onSelect(null)}
          testID={noneTestID}
        />
        {staff.map(member => (
          <StaffPickerRow
            key={member.id}
            name={member.name}
            position={member.position}
            imageUrl={member.imageUrl}
            renderImage={member.renderImage}
            isSelected={member.id === selectedId}
            onPress={() => onSelect(member.id)}
            testID={member.testID}
          />
        ))}
      </View>
    </View>
  );
};
