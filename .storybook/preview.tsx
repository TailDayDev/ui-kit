import type { Preview } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from '../src';

// Insets of an iPhone with a notch/Dynamic Island, so headers and sheets lay out
// as on a device. The app provides real insets through its own SafeAreaProvider.
const PHONE_SAFE_AREA = {
  frame: { x: 0, y: 0, width: 430, height: 932 },
  insets: { top: 59, right: 0, bottom: 34, left: 0 },
};

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
      <SafeAreaProvider initialMetrics={PHONE_SAFE_AREA}>
        <ThemeProvider>
          <Canvas>
            <Story />
          </Canvas>
        </ThemeProvider>
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
