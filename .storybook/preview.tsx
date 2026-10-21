import type { Preview } from '@storybook/react-native-web-vite';
import { View } from 'react-native';

import { ThemeProvider, useTheme } from '../src';

const Canvas = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.bg.screen,
        padding: theme.space[4],
      }}
    >
      {children}
    </View>
  );
};

const preview: Preview = {
  decorators: [
    Story => (
      <ThemeProvider>
        <Canvas>
          <Story />
        </Canvas>
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
