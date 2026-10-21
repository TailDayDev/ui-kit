import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { PercentageValueField } from './PercentageValueField';
import type { PercentageValueFieldSliderProps } from './PercentageValueField.types';

/**
 * Stand-in for the app `SliderControl` (@react-native-community/slider is not
 * a kit dependency): same 32 pt margins, tap a quarter to jump to it.
 */
const StorySlider = ({
  value,
  onValueChange,
}: PercentageValueFieldSliderProps) => (
  <View style={styles.sliderFrame}>
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${value}%` }]} />
    </View>
    <View style={styles.hitRow}>
      {[25, 50, 75, 100].map(step => (
        <Pressable
          key={step}
          style={styles.hit}
          onPress={() => onValueChange(step)}
        />
      ))}
    </View>
  </View>
);

const meta = {
  title: 'Components/PercentageValueField',
  component: PercentageValueField,
  args: {
    value: 25,
    onChange: () => undefined,
    renderSlider: props => <StorySlider {...props} />,
  },
  decorators: [
    Story => (
      <View style={{ width: 343 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof PercentageValueField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Zero: Story = { args: { value: 0 } };

export const Full: Story = { args: { value: 100 } };

const InteractiveField = () => {
  const [value, setValue] = useState(30);
  return (
    <PercentageValueField
      value={value}
      onChange={setValue}
      renderSlider={props => <StorySlider {...props} />}
    />
  );
};

export const Interactive: Story = { render: () => <InteractiveField /> };

const styles = StyleSheet.create({
  fill: { backgroundColor: '#7962FF', height: 4 },
  hit: { flex: 1 },
  hitRow: { ...StyleSheet.absoluteFillObject, flexDirection: 'row' },
  sliderFrame: { marginVertical: 32 },
  track: { backgroundColor: '#F4EFFF', height: 4, width: '100%' },
});
