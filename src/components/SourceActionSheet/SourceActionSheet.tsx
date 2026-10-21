import { StyleSheet, View } from 'react-native';

import { useThemedStyles, type Theme } from '../../theme';
import { ActionListRow } from '../ActionListRow';
import type {
  SourceActionSheetAction,
  SourceActionSheetProps,
} from './SourceActionSheet.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bg.surface,
      paddingHorizontal: theme.space[6],
      paddingVertical: theme.space[1],
    },
    cardRowSpacing: {
      marginBottom: theme.space[2],
    },
  });

/**
 * Body of an action sheet (camera / gallery / delete…): a column of
 * `ActionListRow`s. Put it inside the app's modal; it does not open one.
 */
export const SourceActionSheet = ({
  actions,
  onClose,
  closeOnAction = true,
  variant = 'trailing-icon',
  containerStyle,
  testID,
}: SourceActionSheetProps) => {
  const styles = useThemedStyles(createStyles);
  const isCardVariant = variant.startsWith('card-');

  const handlePressAction = (action: SourceActionSheetAction) => {
    if (closeOnAction) {
      onClose();
    }
    action.onPress();
  };

  return (
    <View testID={testID} style={[styles.container, containerStyle]}>
      {actions.map((action, index) => {
        const isLast = index === actions.length - 1;
        return (
          <ActionListRow
            key={action.id}
            title={action.title}
            description={action.description}
            variant={variant}
            leading={action.icon}
            trailing={action.trailing}
            isDanger={action.isDanger}
            isDisabled={action.isDisabled}
            showDivider={!isCardVariant && !isLast}
            style={isCardVariant && !isLast ? styles.cardRowSpacing : undefined}
            testID={action.testID}
            onPress={() => handlePressAction(action)}
          />
        );
      })}
    </View>
  );
};
