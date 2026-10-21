import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import { Card } from '../Card';
import { LabeledDetailRow } from '../LabeledDetailRow';
import type {
  ContactDetailsCardMessageProps,
  ContactDetailsCardProps,
} from './ContactDetailsCard.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    footer: {
      marginTop: theme.space[4],
    },
    header: {
      marginBottom: theme.space[4],
    },
    headerDivider: {
      backgroundColor: theme.colors.border.default,
      height: theme.stroke[1],
      width: '100%',
    },
    headerWithDivider: {
      gap: theme.space[3],
      marginBottom: theme.space[3],
    },
  });

const isMessageProps = (
  props: ContactDetailsCardProps,
): props is ContactDetailsCardMessageProps => 'message' in props;

/** Card with label / value contact rows (or a message / empty text). */
export const ContactDetailsCard = (props: ContactDetailsCardProps) => {
  const {
    disabled,
    title,
    testID,
    withShadow = false,
    header,
    hasHeaderDivider = false,
    footer,
    onPress,
  } = props;
  const styles = useThemedStyles(createStyles);

  if (isMessageProps(props)) {
    return (
      <Card
        title={title}
        disabled={disabled}
        testID={testID}
        withShadow={withShadow}
        onPress={onPress}
      >
        <Text color="secondary">{props.message}</Text>
      </Card>
    );
  }

  const { emptyText, rows } = props;
  const isHeaderDividerVisible = hasHeaderDivider && rows.length > 0;

  return (
    <Card
      title={title}
      disabled={disabled}
      testID={testID}
      withShadow={withShadow}
      onPress={onPress}
    >
      {header ? (
        <View
          style={[
            styles.header,
            isHeaderDividerVisible ? styles.headerWithDivider : null,
          ]}
        >
          {header}
          {isHeaderDividerVisible ? (
            <View style={styles.headerDivider} />
          ) : null}
        </View>
      ) : null}
      {rows.length ? (
        <View>
          {rows.map((row, index) => (
            <LabeledDetailRow
              key={row.id}
              label={row.label}
              value={row.value}
              description={row.description}
              isLast={index === rows.length - 1}
              isValueNarrow={row.isValueNarrow}
              onPress={row.onPress}
              onValuePress={row.onValuePress}
              testID={row.testID}
              valueTestID={row.valueTestID}
            />
          ))}
        </View>
      ) : (
        <Text color="secondary">{emptyText}</Text>
      )}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </Card>
  );
};
