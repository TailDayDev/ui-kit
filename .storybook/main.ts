import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  stories: ['../docs/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
};

export default config;
