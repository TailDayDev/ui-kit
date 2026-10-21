import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box, Text } from '../../primitives';
import { useTheme } from '../../theme';
import { Button } from '../Button';
import { ModalLayerPortal } from './ModalLayerPortal';
import { ModalLayerRoot } from './ModalLayerRoot';

/** Figma frame (iPhone Pro Max width). */
const FRAME = { width: 430, height: 600 };

/** A bare layer: what CustomModal draws through the portal. */
const Layer = ({ onClose }: { onClose: () => void }) => {
  const theme = useTheme();

  return (
    <ModalLayerPortal getPhase={() => 'open'} id="story-layer" phase="open">
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            alignItems: 'center',
            backgroundColor: theme.colors.overlay.scrim,
            justifyContent: 'center',
          },
        ]}
      >
        <Box background="surface" gap={4} padding={6} radius="lg">
          <Text>Слой над содержимым приложения</Text>
          <Button onPress={onClose} title="Закрыть" />
        </Box>
      </View>
    </ModalLayerPortal>
  );
};

const RootDemo = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <View style={FRAME}>
      <ModalLayerRoot>
        <Box gap={4} padding={4}>
          <Text>Содержимое приложения под слоями</Text>
          <Button onPress={() => setIsOpen(true)} title="Открыть слой" />
        </Box>
        {isOpen ? <Layer onClose={() => setIsOpen(false)} /> : null}
      </ModalLayerRoot>
    </View>
  );
};

const meta = {
  title: 'Components/ModalLayer',
  component: ModalLayerRoot,
  args: { children: null },
} satisfies Meta<typeof ModalLayerRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ModalLayerRoot hosts every modal layer above the app content. A portal
 * keeps the contexts of where it is declared. See CustomModal for real use.
 */
export const Root: Story = {
  render: () => <RootDemo />,
};
