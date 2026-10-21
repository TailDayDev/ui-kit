import { StyleSheet, View } from 'react-native';

import { IconEllipsisVertical } from '../../icons/figma';
import { Icon } from '../../primitives/Icon';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import { IconSquareButton } from '../IconButton';
import { TodayCompletionSlider } from '../TodayCompletionSlider';
import { TodayDoorButton } from '../TodayDoorButton';
import { TodaySkippedAction } from '../TodaySkippedAction';
import type { TodayTaskFooterProps } from './TodayTaskFooter.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    door: {
      flex: 1,
    },
    doorFooter: {
      gap: theme.space[4],
      justifyContent: 'flex-start',
    },
    footer: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: theme.space[4],
      paddingHorizontal: theme.space[4],
      paddingTop: theme.space[2],
    },
  });

/**
 * Footer of a Today task card (Figma `TodayTaskFooter`): the «⋮» more-actions
 * button on the left and the main action on the right — the «Готово!»
 * slider, a door button that fills the rest of the row, or the «Пропущено»
 * capsule.
 */
export const TodayTaskFooter = (props: TodayTaskFooterProps) => {
  const {
    onMenuPress,
    menuAccessibilityLabel,
    isMenuDisabled = false,
    isMenuLoading = false,
    menuTestID,
    style,
    testID,
  } = props;
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const isDoor = props.action === 'door';

  const renderAction = () => {
    switch (props.action) {
      case 'door':
        return (
          <TodayDoorButton
            {...props.doorProps}
            style={[styles.door, props.doorProps.style]}
          />
        );
      case 'skipped':
        return <TodaySkippedAction {...props.skippedProps} />;
      default:
        return <TodayCompletionSlider {...props.sliderProps} />;
    }
  };

  return (
    <View
      testID={testID}
      style={[styles.footer, isDoor && styles.doorFooter, style]}
    >
      <IconSquareButton
        size={theme.space[12]}
        icon={<Icon icon={IconEllipsisVertical} />}
        onPress={onMenuPress}
        disabled={isMenuDisabled}
        loading={isMenuLoading}
        accessibilityLabel={menuAccessibilityLabel}
        testID={menuTestID}
      />
      {renderAction()}
    </View>
  );
};
