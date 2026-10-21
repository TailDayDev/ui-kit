import { useState } from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  type LayoutChangeEvent,
} from 'react-native';

import { Text } from '../../primitives/Text';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import type { InfoStepProps } from './InfoStep.types';

/**
 * Window height taken by the screen around the step (header, pager and buttons
 * of the app intro screen). App value; the image gets what is left.
 */
const SCREEN_CHROME_HEIGHT = 310;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    bottomContainer: {
      gap: theme.space[2],
      marginBottom: theme.space[8],
      marginTop: theme.space[6],
    },
    centerWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.space[6],
    },
    descriptionWrapper: {
      flex: 1,
    },
  });

/** Intro step: a square image sized to the free space, then stage, title and description. */
export const InfoStep = ({
  stage,
  title,
  description,
  renderImage,
}: InfoStepProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const window = useWindowDimensions();
  const [bottomHeight, setBottomHeight] = useState(0);

  // Same formula as the app: free height = window − screen chrome − texts − top margin.
  const availableHeight =
    window.height - SCREEN_CHROME_HEIGHT - bottomHeight - theme.space[6];
  const maxSize = Math.min(availableHeight, window.width - 2 * theme.space[6]);

  const handleBottomLayout = (event: LayoutChangeEvent) => {
    setBottomHeight(event.nativeEvent.layout.height);
  };

  return (
    <View style={styles.contentContainer}>
      <View style={[styles.centerWrapper, { height: availableHeight }]}>
        {renderImage(maxSize)}
      </View>

      <View style={styles.bottomContainer} onLayout={handleBottomLayout}>
        <Text variant="body/bold">{stage}</Text>
        <Text variant="largeTitle/semibold">{title}</Text>
        <View style={styles.descriptionWrapper}>
          <Text variant="caption/regular" color="secondary">
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};
