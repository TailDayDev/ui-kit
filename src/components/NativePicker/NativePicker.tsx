import { useMemo } from 'react';
import { Platform, View, type TextStyle } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useTheme } from '../../theme';
import type {
  NativePickerProps,
  NativePickerValue,
} from './NativePicker.types';
import { useNativeEchoValue } from '../../utils/useNativeEchoValue';

/** Platform picker (iOS wheel / Android dropdown) with theme text colors. */
export const NativePicker = <T extends NativePickerValue>({
  containerStyle,
  isDropdownOnAndroid = true,
  itemStyle,
  items,
  numberOfLines,
  onValueChange,
  selectedValue,
  selectionColor,
  style,
  accessibilityLabel,
  testID,
}: NativePickerProps<T>) => {
  const theme = useTheme();
  const textColor = theme.colors.text.primary;
  const isAndroid = Platform.OS === 'android';

  // Inside a modal the wheel would otherwise jump back after a pick.
  const [shownValue, echoPick] = useNativeEchoValue(selectedValue);

  const resolvedItemStyle = useMemo(() => {
    if (isAndroid) {
      return itemStyle;
    }

    const iosBaseItemStyle: TextStyle = {
      color: textColor,
      textAlign: 'center',
    };

    return [iosBaseItemStyle, itemStyle];
  }, [isAndroid, itemStyle, textColor]);

  return (
    <View style={containerStyle}>
      <Picker
        selectedValue={shownValue}
        onValueChange={(nextValue, index) => {
          // Picker types the value loosely; the items are T.
          const value = nextValue as T;
          echoPick(value);
          onValueChange(value, index);
        }}
        style={style}
        itemStyle={resolvedItemStyle}
        numberOfLines={numberOfLines}
        selectionColor={selectionColor}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        {...(isAndroid && isDropdownOnAndroid
          ? { mode: 'dropdown' as const }
          : {})}
        {...(isAndroid ? { dropdownIconColor: textColor } : {})}
      >
        {items.map(item => (
          <Picker.Item
            key={`${item.label}-${String(item.value)}`}
            label={item.label}
            value={item.value}
            color={item.color ?? textColor}
          />
        ))}
      </Picker>
    </View>
  );
};
