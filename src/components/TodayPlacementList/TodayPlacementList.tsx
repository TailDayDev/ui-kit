import type { ReactNode } from 'react';
import {
  StyleSheet,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { TodayPlacementListProps } from './TodayPlacementList.types';

// Figma TodayPlacementList › Картинка места: 16×16 image.
const IMAGE_SIZE = 16;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    firstOfTwo: {
      flexShrink: 1,
    },
    image: {
      alignItems: 'center',
      height: IMAGE_SIZE,
      justifyContent: 'center',
      width: IMAGE_SIZE,
    },
    item: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space[1],
      minWidth: 0,
    },
    row: {
      alignItems: 'center',
      alignSelf: 'stretch',
      flexDirection: 'row',
      gap: theme.space[1],
    },
    secondOfTwo: {
      flexGrow: 1,
      flexShrink: 1,
    },
    single: {
      flex: 1,
    },
    title: {
      flexShrink: 1,
    },
  });

interface PlacementItemProps {
  title: string;
  image?: ReactNode;
  style: StyleProp<ViewStyle>;
  imageStyle: StyleProp<ViewStyle>;
  titleStyle: StyleProp<TextStyle>;
  testID?: string;
}

/** One placement: image + name (Figma `TodayPlacementList` itemsCount=1 content). */
const PlacementItem = ({
  title,
  image,
  style,
  imageStyle,
  titleStyle,
  testID,
}: PlacementItemProps) => (
  <View testID={testID} style={style}>
    {image ? <View style={imageStyle}>{image}</View> : null}
    <Text
      variant="caption/regular"
      color="secondary"
      numberOfLines={1}
      ellipsizeMode="tail"
      style={titleStyle}
    >
      {title}
    </Text>
  </View>
);

/** One or two placements of a pet in a row (Figma `TodayPlacementList`). */
export const TodayPlacementList = ({
  itemsCount = 1,
  title,
  image,
  secondTitle = '',
  secondImage,
  style,
  testID,
}: TodayPlacementListProps) => {
  const styles = useThemedStyles(createStyles);
  const isPair = itemsCount === 2;

  return (
    <View testID={testID} style={[styles.row, style]}>
      <PlacementItem
        title={title}
        image={image}
        style={[styles.item, isPair ? styles.firstOfTwo : styles.single]}
        imageStyle={styles.image}
        titleStyle={styles.title}
        testID={testID ? `${testID}.item1` : undefined}
      />
      {isPair ? (
        <PlacementItem
          title={secondTitle}
          image={secondImage}
          style={[styles.item, styles.secondOfTwo]}
          imageStyle={styles.image}
          titleStyle={styles.title}
          testID={testID ? `${testID}.item2` : undefined}
        />
      ) : null}
    </View>
  );
};
