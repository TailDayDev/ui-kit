import { isValidElement, memo, useMemo, type ReactNode } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { Text } from '../../primitives';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import { Card } from '../Card';
import type {
  MultiSelectCardProps,
  MultiSelectItem,
} from './MultiSelect.types';

/** App option card min height (off-scale: Figma option row). */
const OPTION_MIN_HEIGHT = 64;
/** App disabled card opacity (differs from `opacity.disabled`). */
const DISABLED_OPACITY = 0.6;
/** Default icon size. */
const DEFAULT_ICON_SIZE = 24;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    codeItem: {
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      minHeight: OPTION_MIN_HEIGHT,
      paddingHorizontal: theme.space[4],
      paddingVertical: theme.space[3],
      width: '100%',
    },
    disabledItem: {
      opacity: DISABLED_OPACITY,
    },
    icon: {
      overflow: 'hidden',
      borderRadius: theme.radius.sm,
    },
    iconWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
      flexShrink: 1,
      gap: theme.space[4],
    },
    selectedItem: {
      backgroundColor: theme.colors.bg.accentSoft,
      borderColor: theme.colors.bg.accent,
    },
    textPlaceHolder: {
      color: theme.palette.lightGray,
    },
    textWrapper: {
      flex: 1,
      flexShrink: 1,
      gap: theme.space[1],
    },
  });

const renderDefaultIcon = (
  imageUrl: MultiSelectItem['imageUrl'],
  size: number,
): ReactNode => {
  if (isValidElement(imageUrl)) {
    return imageUrl;
  }
  if (typeof imageUrl === 'number') {
    return <Image source={imageUrl} style={{ width: size, height: size }} />;
  }
  if (typeof imageUrl === 'string' && imageUrl.trim()) {
    return (
      <Image
        source={{ uri: imageUrl.trim() }}
        style={{ width: size, height: size }}
      />
    );
  }
  return null;
};

const MultiSelectCardComponent = ({
  item,
  handlePress,
  disabled = false,
  selected = false,
  restStyle,
  children,
  rowStyles,
  iconSize = DEFAULT_ICON_SIZE,
  isItemColor = false,
  showDescription = true,
  showIcon = true,
  testID,
  withShadow = false,
  renderIcon,
  resolveDescriptionCode,
}: MultiSelectCardProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);

  const hasDescription =
    showDescription &&
    Boolean(
      item &&
      (item.description ||
        (typeof item.descriptionCode === 'string' &&
          item.descriptionCode.length > 0)),
    );

  const description = useMemo<ReactNode>(() => {
    if (!item) {
      return null;
    }
    if (item.description) {
      return item.description;
    }
    if (item.descriptionCode) {
      const code = String(item.descriptionCode);
      return resolveDescriptionCode ? resolveDescriptionCode(code) : code;
    }
    return null;
  }, [item, resolveDescriptionCode]);

  let color: string | undefined;
  if (isItemColor) {
    color = selected ? theme.colors.text.accent : theme.colors.text.secondary;
  }

  return (
    <Card
      testID={testID}
      accessibilityLabel={item?.title ? String(item.title) : undefined}
      disabled={disabled}
      cardStyles={[
        styles.codeItem,
        selected && styles.selectedItem,
        disabled && styles.disabledItem,
        restStyle,
      ]}
      onPress={handlePress}
      withShadow={withShadow}
    >
      {item ? (
        <View style={[styles.iconWrapper, rowStyles]}>
          {showIcon ? (
            <View style={styles.icon}>
              {renderIcon
                ? renderIcon({ item, size: iconSize, color })
                : renderDefaultIcon(item.imageUrl, iconSize)}
            </View>
          ) : null}

          <View style={styles.textWrapper}>
            {item.title ? (
              <Text variant="body/bold" color={selected ? 'accent' : 'primary'}>
                {String(item.title)}
              </Text>
            ) : null}
            {hasDescription ? (
              <Text
                variant="smallCaption/regular"
                color={selected ? 'accent' : 'secondary'}
                style={
                  !item.description && item.descriptionCode && !selected
                    ? styles.textPlaceHolder
                    : undefined
                }
              >
                {description}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}
      {children}
    </Card>
  );
};

/** Selectable option card: icon, title and description; accent when selected. */
export const MultiSelectCard = memo(MultiSelectCardComponent);
