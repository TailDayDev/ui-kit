import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { useThemedStyles, type Theme } from '../../theme';
import { Box } from '../../primitives';
import { Button } from '../Button';
import { CustomModalProvider } from '../CustomModal';
import { ModalLayerRoot } from '../ModalLayer';
import type { PercentageValueFieldSliderProps } from '../PercentageValueField';
import { EditPercentageModal } from './EditPercentageModal';
import type { EditPercentageModalProps } from './EditPercentageModal.types';

/** Figma frame of the modal (iPhone Pro Max width). */
const FRAME = { width: 430, height: 760 };
/** App SliderControl vertical margins / track height. */
const SLIDER_MARGIN = 32;
const TRACK_HEIGHT = 4;
const SLIDER_STEPS = [25, 50, 75, 100];

const Frame = ({ children }: { children: ReactNode }) => (
  <View style={FRAME}>
    <ModalLayerRoot>
      <CustomModalProvider closeAccessibilityLabel="Закрыть">
        {children}
      </CustomModalProvider>
    </ModalLayerRoot>
  </View>
);

/** Stand-in for the app `SliderControl`: tap a quarter to jump to it. */
const StorySlider = ({
  value,
  onValueChange,
}: PercentageValueFieldSliderProps) => {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.sliderFrame}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${value}%` }]} />
      </View>
      <View style={styles.hitRow}>
        {SLIDER_STEPS.map(step => (
          <Pressable
            key={step}
            style={styles.hit}
            onPress={() => onValueChange(step)}
          />
        ))}
      </View>
    </View>
  );
};

const Opener = (props: EditPercentageModalProps) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Box padding={4}>
      <Button onPress={() => setIsVisible(true)} title="Открыть" />
      <EditPercentageModal
        {...props}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </Box>
  );
};

const meta = {
  title: 'Components/EditPercentageModal',
  component: EditPercentageModal,
  decorators: [
    Story => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
  args: {
    title: 'Скидка',
    defaultValue: 25,
    cancelTitle: 'Отмена',
    saveTitle: 'Сохранить',
    renderSlider: props => <StorySlider {...props} />,
    isVisible: true,
    onClose: () => {},
    onConfirm: () => {},
  },
} satisfies Meta<typeof EditPercentageModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Save is enabled once the value changes. */
export const Default: Story = {
  render: args => <Opener {...args} />,
};

/** Text under the field. */
export const WithDescription: Story = {
  render: args => (
    <Opener {...args} description="Применяется к сумме бронирования" />
  ),
};

/** Save in flight: spinner, the modal is locked. */
export const Saving: Story = {
  render: args => <Opener {...args} isSaving />,
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    sliderFrame: { marginVertical: SLIDER_MARGIN, width: '100%' },
    track: {
      height: TRACK_HEIGHT,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.border.default,
    },
    fill: {
      height: TRACK_HEIGHT,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.bg.accent,
    },
    hitRow: { ...StyleSheet.absoluteFillObject, flexDirection: 'row' },
    hit: { flex: 1 },
  });
