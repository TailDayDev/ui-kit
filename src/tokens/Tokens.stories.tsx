import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';

import { Box, Text } from '../primitives';
import { lightTheme } from '../theme';

const meta = {
  title: 'Foundations/Tokens',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Swatch = ({ name, value }: { name: string; value: string }) => (
  <Box row gap={3} align="center">
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: lightTheme.radius.sm,
        backgroundColor: value,
        borderWidth: lightTheme.stroke[1],
        borderColor: lightTheme.colors.border.default,
      }}
    />
    <Box>
      <Text variant="body/medium">{name}</Text>
      <Text variant="caption/regular" color="secondary">
        {value}
      </Text>
    </Box>
  </Box>
);

export const SemanticColors: Story = {
  render: () => (
    <Box gap={4}>
      {Object.entries(lightTheme.colors).map(([group, roles]) => (
        <Box key={group} gap={2}>
          <Text variant="headline/bold">{group}</Text>
          {Object.entries(roles).map(([role, value]) => (
            <Swatch key={role} name={`${group}.${role}`} value={value} />
          ))}
        </Box>
      ))}
    </Box>
  ),
};

export const Palette: Story = {
  render: () => (
    <Box gap={2}>
      {Object.entries(lightTheme.palette).map(([name, value]) => (
        <Swatch key={name} name={name} value={value} />
      ))}
    </Box>
  ),
};

export const Spacing: Story = {
  render: () => (
    <Box gap={2}>
      {Object.entries(lightTheme.space)
        .filter(([, value]) => value > 0)
        .map(([key, value]) => (
          <Box key={key} row gap={3} align="center">
            <Text variant="caption/regular" style={{ width: 64 }}>
              {`space[${key}] ${value}`}
            </Text>
            <View
              style={{
                width: value,
                height: 12,
                backgroundColor: lightTheme.colors.bg.accent,
              }}
            />
          </Box>
        ))}
    </Box>
  ),
};

export const RadiusAndShadows: Story = {
  render: () => (
    <Box gap={4}>
      <Box row gap={3}>
        {Object.entries(lightTheme.radius).map(([key, value]) => (
          <Box key={key} align="center" gap={1}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: Math.min(value, 28),
                backgroundColor: lightTheme.colors.bg.accentSoft,
              }}
            />
            <Text variant="caption/regular">{key}</Text>
          </Box>
        ))}
      </Box>
      <Box row gap={4}>
        {Object.keys(lightTheme.shadows).map(key => (
          <Box key={key} align="center" gap={2}>
            <Box
              background="surface"
              radius="md"
              shadow={key as keyof typeof lightTheme.shadows}
              style={{ width: 72, height: 56 }}
            />
            <Text variant="caption/regular">{key}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  ),
};
