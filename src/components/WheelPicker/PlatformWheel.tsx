import { Platform } from 'react-native';

import { AndroidWheelCore } from './AndroidWheelCore';
import { IosWheelCore } from './IosWheelCore';
import type { PlatformWheelProps } from './WheelPicker.types';

/**
 * The JS wheel on Android (and on iOS with a selection band); the native
 * wheel on iOS otherwise.
 */
export const PlatformWheel = (props: PlatformWheelProps) => {
  if (Platform.OS === 'android' || props.selectionIndicatorStyle) {
    return <AndroidWheelCore {...props} />;
  }

  return <IosWheelCore {...props} />;
};
