import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import type { NoImagePlaceholderProps } from './NoImagePlaceholder.types';

const styles = StyleSheet.create({
  // DinamicImage frame: square, clips its content.
  frame: {
    overflow: 'hidden',
    position: 'relative',
  },
});

const NoImagePlaceholderComponent = ({
  color,
  size = '100%',
  renderImage,
  accessibilityLabel,
  testID,
}: NoImagePlaceholderProps) => {
  const isDecorative = !accessibilityLabel;
  return (
    <View
      style={[styles.frame, { width: size, height: size }]}
      testID={testID}
      accessible={!isDecorative}
      accessibilityRole={isDecorative ? undefined : 'image'}
      accessibilityLabel={accessibilityLabel}
      accessibilityElementsHidden={isDecorative}
      importantForAccessibility={isDecorative ? 'no-hide-descendants' : 'auto'}
    >
      {renderImage?.({ size, color })}
    </View>
  );
};

/** Square "no image" frame; the artwork comes from `renderImage`. */
export const NoImagePlaceholder = memo(NoImagePlaceholderComponent);
