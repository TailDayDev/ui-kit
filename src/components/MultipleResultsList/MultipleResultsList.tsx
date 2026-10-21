import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives';
import { useThemedStyles, type Theme } from '../../theme';
import { Button } from '../Button';
import { Card } from '../Card';
import type { MultipleResultsListProps } from './MultipleResultsList.types';

/** App accommodation image / placeholder side. */
const IMAGE_SIZE = 40;
/** App edit button height (off-scale: matches the `extraSmall` button). */
const EDIT_BUTTON_HEIGHT = 28;
/** App colored side bar width. */
const SIDE_BAR_WIDTH = 4;
/** App side bar end radius (off-scale: below `radius.sm`). */
const SIDE_BAR_RADIUS = 2;

const noop = () => undefined;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    multipleCard: {
      gap: 0,
      minHeight: 'auto',
    },
    header: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.space[3],
    },
    title: {
      marginBottom: theme.space[5],
    },
    editButton: {
      height: EDIT_BUTTON_HEIGHT,
    },
    editButtonText: {
      ...theme.typography.caption.medium,
    },
    multipleCardColumn: {
      flex: 1,
    },
    multipleCardRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      gap: theme.space[3],
      minHeight: IMAGE_SIZE,
    },
    petBookRow: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      minHeight: IMAGE_SIZE,
      width: '100%',
      paddingVertical: theme.space[3],
    },
    firstRow: {
      paddingTop: 0,
    },
    lastRow: {
      paddingBottom: 0,
    },
    iconWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
      flexShrink: 1,
      gap: theme.space[4],
    },
    iconPlaceholder: {
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
    },
    textWrapper: {
      flex: 1,
      flexShrink: 1,
      gap: theme.space[1],
    },
    sideBar: {
      height: '100%',
      width: SIDE_BAR_WIDTH,
      backgroundColor: theme.colors.bg.accent,
    },
    sideBarFirst: {
      borderTopRightRadius: SIDE_BAR_RADIUS,
      borderTopLeftRadius: SIDE_BAR_RADIUS,
    },
    sideBarOdd: {
      backgroundColor: theme.palette.secondary,
    },
    sideBarLast: {
      borderBottomRightRadius: SIDE_BAR_RADIUS,
      borderBottomLeftRadius: SIDE_BAR_RADIUS,
    },
    petBookRight: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: theme.space[1],
    },
    petBookRightCentered: {
      alignItems: 'center',
    },
    petBookPeriodColumn: {
      gap: theme.space[1],
      alignItems: 'flex-end',
    },
    petBookPeriodLabel: {
      marginRight: theme.space[0.25],
      paddingBottom: theme.space[0.25],
      textTransform: 'lowercase',
    },
    divider: {
      height: theme.stroke[1],
      backgroundColor: theme.colors.border.default,
      width: '100%',
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.space[4],
      marginTop: theme.space[3],
      borderTopWidth: theme.stroke[1],
      borderTopColor: theme.colors.border.default,
      flex: 1,
      width: '100%',
    },
  });

/** Card listing several accommodation bookings with dates, prices and an optional total. */
export const MultipleResultsList = ({
  title,
  items,
  labels,
  onEdit,
  isSingleDateCentered = false,
  totalValue,
  totalLabel,
}: MultipleResultsListProps) => {
  const styles = useThemedStyles(createStyles);
  const lastIndex = items.length - 1;

  return (
    <Card style={styles.multipleCard}>
      <View style={styles.header}>
        {title ? (
          <Text variant="headline/bold" style={styles.title}>
            {title}
          </Text>
        ) : null}
        <Button
          title={labels.edit}
          style="softGray"
          size="small"
          restStyle={styles.editButton}
          textStyle={styles.editButtonText}
          onPress={onEdit ?? noop}
        />
      </View>
      {items.map((item, index) => (
        <View style={styles.multipleCardRow} key={item.key ?? `row-${index}`}>
          <View style={styles.multipleCardColumn}>
            <View
              style={[
                styles.petBookRow,
                index === 0 && styles.firstRow,
                index === lastIndex && styles.lastRow,
              ]}
            >
              <View style={styles.iconWrapper}>
                {item.image ?? <View style={styles.iconPlaceholder} />}
                <View style={styles.textWrapper}>
                  <Text variant="body/bold">{item.title}</Text>
                  <Text variant="smallCaption/regular" color="secondary">
                    {item.priceText}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.petBookRight,
                  isSingleDateCentered && item.dates.length <= 1
                    ? styles.petBookRightCentered
                    : null,
                ]}
              >
                {item.isRange ? (
                  <View style={styles.petBookPeriodColumn}>
                    <Text
                      variant="caption/regular"
                      style={styles.petBookPeriodLabel}
                    >
                      {labels.from}
                    </Text>
                    <Text
                      variant="caption/regular"
                      style={styles.petBookPeriodLabel}
                    >
                      {labels.to}
                    </Text>
                  </View>
                ) : null}
                <View style={styles.petBookPeriodColumn}>
                  {item.dates.map((date, dateIndex) => (
                    <Text key={`${date}:${dateIndex}`} variant="body/bold">
                      {date}
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            {index < lastIndex ? <View style={styles.divider} /> : null}
          </View>

          <View
            style={[
              styles.sideBar,
              index === 0 && styles.sideBarFirst,
              index % 2 === 1 && styles.sideBarOdd,
              index === lastIndex && styles.sideBarLast,
            ]}
          />
        </View>
      ))}

      {totalValue !== undefined ? (
        <View style={styles.totalRow}>
          <Text variant="body/medium">{totalLabel}</Text>
          <Text variant="body/regular">{totalValue}</Text>
        </View>
      ) : null}
    </Card>
  );
};
