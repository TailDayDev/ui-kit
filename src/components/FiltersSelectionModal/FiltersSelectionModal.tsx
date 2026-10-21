import { useCallback, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useThemedStyles, type Theme } from '../../theme';
import { Button } from '../Button';
import { CustomModal } from '../CustomModal';
import type {
  FilterOptionId,
  FilterOptionView,
  FiltersSelectionModalProps,
} from './FiltersSelectionModal.types';

/** App image slot of a filter option. */
export const FILTER_OPTION_IMAGE_SIZE = 32;

interface IFilterSelectionCardProps {
  option: FilterOptionView;
  isSelected: boolean;
  onPress: (id: FilterOptionId) => void;
  renderOptionImage?: (option: FilterOptionView, size: number) => ReactNode;
}

const FilterSelectionCard = ({
  isSelected,
  onPress,
  option,
  renderOptionImage,
}: IFilterSelectionCardProps) => {
  const styles = useThemedStyles(createStyles);
  const isRightBlockVisible =
    option.rightLabel !== undefined || option.rightValue !== undefined;

  return (
    <Pressable
      onPress={() => onPress(option.id)}
      style={[styles.optionContainer, isSelected && styles.selectedContainer]}
      accessibilityRole="checkbox"
      accessibilityLabel={option.title}
      accessibilityState={{ checked: isSelected }}
    >
      <View style={styles.left}>
        {option.imageUrl?.trim() && renderOptionImage
          ? renderOptionImage(option, FILTER_OPTION_IMAGE_SIZE)
          : null}
        <Text
          style={[styles.title, isSelected && styles.selectedText]}
          numberOfLines={2}
        >
          {option.title}
        </Text>
      </View>

      {isRightBlockVisible ? (
        <View style={styles.right}>
          {option.rightLabel !== undefined ? (
            <Text style={[styles.label, isSelected && styles.selectedText]}>
              {option.rightLabel}
            </Text>
          ) : null}
          {option.rightValue !== undefined ? (
            <Text style={[styles.count, isSelected && styles.selectedText]}>
              {option.rightValue}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
};

/** Multi-select filters sheet: grouped option cards, Reset + Apply footer. */
export const FiltersSelectionModal = ({
  applyTitle,
  groups,
  modalKey = 'FiltersSelectionModal',
  onApply,
  onChange,
  onClose,
  onReset,
  resetTitle,
  title,
  value,
  visible,
  renderOptionImage,
}: FiltersSelectionModalProps) => {
  const styles = useThemedStyles(createStyles);

  const handleToggleOption = useCallback(
    (groupKey: string, optionId: FilterOptionId) => {
      const currentGroupValue = value[groupKey] ?? [];
      const isSelected = currentGroupValue.includes(optionId);
      const nextGroupValue = isSelected
        ? currentGroupValue.filter(id => id !== optionId)
        : [...currentGroupValue, optionId];

      onChange({
        ...value,
        [groupKey]: nextGroupValue,
      });
    },
    [onChange, value],
  );

  const handleReset = useCallback(() => {
    onReset?.();
    onClose();
  }, [onClose, onReset]);

  const handleApply = useCallback(() => {
    onApply?.();
    onClose();
  }, [onApply, onClose]);

  return (
    <CustomModal
      closeButtonTestID={`${modalKey}.close`}
      visible={visible}
      modalKey={modalKey}
      onClose={onClose}
      scrollEnabled={false}
      divider={false}
      title={title}
      footer={
        <View style={styles.footer}>
          <Button
            title={resetTitle}
            style="danger"
            restStyle={styles.footerButton}
            onPress={handleReset}
          />
          <Button
            title={applyTitle}
            onPress={handleApply}
            restStyle={styles.footerButton}
          />
        </View>
      }
    >
      <ScrollView style={styles.scrollView}>
        {groups.map((group, index) => {
          const previousGroup = groups[index - 1];
          const isDividerVisible =
            previousGroup !== undefined &&
            previousGroup.options.length > 0 &&
            group.options.length > 0;

          return (
            <View key={group.key}>
              {isDividerVisible ? <View style={styles.divider} /> : null}
              {group.options.length > 0 ? (
                <>
                  <Text style={styles.sectionTitle}>{group.sectionTitle}</Text>
                  {group.options.map(option => (
                    <FilterSelectionCard
                      key={option.id}
                      option={option}
                      isSelected={(value[group.key] ?? []).includes(option.id)}
                      onPress={id => handleToggleOption(group.key, id)}
                      renderOptionImage={renderOptionImage}
                    />
                  ))}
                </>
              ) : group.emptyMessage ? (
                <Text style={styles.emptyText}>{group.emptyMessage}</Text>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </CustomModal>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.radius.md,
      borderWidth: theme.stroke[1],
      borderColor: theme.colors.border.default,
      padding: theme.space[3],
      marginBottom: theme.space[3],
      justifyContent: 'space-between',
      gap: theme.space[3],
    },
    selectedContainer: {
      borderColor: theme.palette.primary,
      backgroundColor: theme.colors.bg.accentSoft,
    },
    left: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space[3],
    },
    title: {
      ...theme.typography.body.medium,
      color: theme.colors.text.primary,
      flex: 1,
    },
    selectedText: {
      color: theme.colors.text.accent,
    },
    right: {
      alignItems: 'flex-end',
      gap: theme.space[1],
      flexShrink: 0,
    },
    label: {
      ...theme.typography.caption.regular,
      color: theme.colors.text.primary,
    },
    count: {
      ...theme.typography.body.medium,
      color: theme.colors.text.primary,
    },
    sectionTitle: {
      ...theme.typography.body.medium,
      color: theme.palette.black,
      marginBottom: theme.space[2],
    },
    emptyText: {
      ...theme.typography.body.regular,
      textAlign: 'center',
      marginVertical: theme.space[4],
      color: theme.colors.text.primary,
    },
    scrollView: {
      paddingHorizontal: theme.space[6],
    },
    divider: {
      height: theme.stroke[1],
      borderTopColor: theme.colors.border.default,
      borderTopWidth: theme.stroke[1],
      marginVertical: theme.space[6],
    },
    footerButton: { flex: 1 },
    footer: {
      gap: theme.space[4],
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  });
