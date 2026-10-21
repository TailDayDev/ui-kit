import { memo, useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { useTheme } from '../../theme';
import { PET_AVATAR_SIZES, type PetAvatarProps } from './PetAvatar.types';

const styles = StyleSheet.create({
  frame: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    width: '100%',
  },
});

const PetAvatarComponent = ({
  accessibilityLabel,
  cache,
  photoUrl,
  photoCacheKey,
  shape = 'circle',
  size = 'l',
  placeholder,
  renderImage,
  testID,
}: PetAvatarProps) => {
  const theme = useTheme();
  const [failedUri, setFailedUri] = useState<string | null>(null);
  const dimension = PET_AVATAR_SIZES[size];
  const borderRadius = shape === 'circle' ? dimension / 2 : theme.radius.sm;
  const uri = photoUrl?.trim() ?? '';
  const frameStyle = useMemo(
    () => ({ borderRadius, height: dimension, width: dimension }),
    [borderRadius, dimension],
  );

  useEffect(() => {
    setFailedUri(null);
  }, [uri]);

  const placeholderNode = (
    <View
      style={styles.fill}
      testID={testID ? `${testID}.placeholder` : undefined}
    >
      {placeholder}
    </View>
  );

  const renderContent = () => {
    if (renderImage) {
      return renderImage({
        uri,
        size: dimension,
        borderRadius,
        cache,
        photoCacheKey: uri ? photoCacheKey : undefined,
        placeholder: placeholderNode,
      });
    }
    if (!uri || failedUri === uri) {
      return placeholderNode;
    }
    return (
      <Image
        source={{ uri, cache }}
        style={[StyleSheet.absoluteFill, { borderRadius }]}
        resizeMode="cover"
        onError={() => setFailedUri(uri)}
        testID={testID ? `${testID}.photo` : undefined}
      />
    );
  };

  const isLabelled = Boolean(accessibilityLabel);

  return (
    <View
      accessible={isLabelled}
      accessibilityRole={isLabelled ? 'image' : undefined}
      accessibilityLabel={accessibilityLabel}
      style={[styles.frame, frameStyle]}
      testID={testID}
    >
      {renderContent()}
    </View>
  );
};

/** Pet photo in a circle or rounded square; shows `placeholder` without a photo. */
export const PetAvatar = memo(PetAvatarComponent);
