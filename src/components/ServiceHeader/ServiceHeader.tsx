import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { IconSearch } from '../../icons/figma';
import { Icon } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import { IconRoundButton } from '../IconButton';
import { ServiceHeaderTrigger } from '../ServiceHeaderTrigger';
import type { ServiceHeaderProps } from './ServiceHeader.types';

// Figma ServiceHeader › Гостиница и поиск: 40pt row (FIXED in forceTitleOnly=true).
const HEADER_ROW_HEIGHT = 40;
// Figma ServiceHeader › Поиск: IconRoundButton size=40.
const SEARCH_BUTTON_SIZE = 40;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    surface: {
      backgroundColor: theme.colors.bg.surface,
      boxShadow: [...theme.shadows.bar],
      gap: theme.space[2],
      paddingVertical: theme.space[2],
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      minHeight: HEADER_ROW_HEIGHT,
      paddingHorizontal: theme.space[4],
    },
    rowTitleOnly: {
      height: HEADER_ROW_HEIGHT,
    },
    title: {
      flexShrink: 1,
    },
  });

const ServiceHeaderComponent = (props: ServiceHeaderProps) => {
  const {
    hasSearch = true,
    search,
    hasBottomContent = true,
    bottomContent,
    style,
    testID,
  } = props;
  const styles = useThemedStyles(createStyles);
  const isSearchVisible = !props.forceTitleOnly && hasSearch && search;
  const isBottomContentVisible = hasBottomContent && Boolean(bottomContent);

  return (
    <View style={[styles.surface, style]} testID={testID}>
      <View style={[styles.row, props.forceTitleOnly && styles.rowTitleOnly]}>
        {props.forceTitleOnly ? (
          <Text
            variant="title/bold"
            accessibilityRole="header"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.title}
          >
            {props.title}
          </Text>
        ) : (
          <ServiceHeaderTrigger {...props.trigger} />
        )}
        {isSearchVisible ? (
          <IconRoundButton
            icon={<Icon icon={IconSearch} />}
            size={SEARCH_BUTTON_SIZE}
            onPress={search.onPress}
            accessibilityLabel={search.accessibilityLabel}
            testID={search.testID}
          />
        ) : null}
      </View>
      {isBottomContentVisible ? bottomContent : null}
    </View>
  );
};

/**
 * Header of the hotel sections: hotel selector (or a plain title), search and
 * an optional filters row. Figma `ServiceHeader`.
 */
export const ServiceHeader = memo(ServiceHeaderComponent);
