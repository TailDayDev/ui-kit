import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box, Text } from '../../primitives';
import { BaseSkeleton } from '../BaseSkeleton';
import { LoadingWrapper } from './LoadingWrapper';
import type { StaticLoadingWrapperProps } from './LoadingWrapper.types';

/** Delay before the demo switches from skeleton to content. */
const DEMO_LOADING_MS = 1500;
/** Demo skeleton row height. */
const ROW_HEIGHT = 48;
/** Fixed preview height so the `flex: 1` wrapper has room. */
const PREVIEW_HEIGHT = 240;

const Skeleton = () => (
  <Box gap={2}>
    <BaseSkeleton height={ROW_HEIGHT} />
    <BaseSkeleton height={ROW_HEIGHT} />
    <BaseSkeleton height={ROW_HEIGHT} />
  </Box>
);

const Content = () => (
  <Box gap={2}>
    <Text>First row</Text>
    <Text>Second row</Text>
    <Text>Third row</Text>
  </Box>
);

/**
 * Static mode for the Storybook controls; the props union confuses arg
 * inference. Pull-to-refresh mode is shown in its own story.
 */
const StaticLoadingWrapper = (props: StaticLoadingWrapperProps) => (
  <LoadingWrapper {...props} />
);

const meta = {
  title: 'Components/LoadingWrapper',
  component: StaticLoadingWrapper,
  args: {
    loading: true,
    skeleton: <Skeleton />,
    children: <Content />,
    fitContent: false,
  },
  decorators: [
    Story => (
      <Box style={{ height: PREVIEW_HEIGHT }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof StaticLoadingWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};

export const Loaded: Story = { args: { loading: false } };

export const FitContent: Story = { args: { loading: false, fitContent: true } };

const CrossFadeDemo = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), DEMO_LOADING_MS);
    return () => clearTimeout(timer);
  }, []);
  return (
    <LoadingWrapper loading={isLoading} skeleton={<Skeleton />}>
      <Content />
    </LoadingWrapper>
  );
};

/** Skeleton fades into the content after 1.5 s (iOS/web; Android switches instantly). */
export const CrossFade: Story = { render: () => <CrossFadeDemo /> };

const PullToRefreshDemo = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRetry = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), DEMO_LOADING_MS);
  };
  return (
    <LoadingWrapper
      loading={false}
      skeleton={<Skeleton />}
      enablePullToRefresh
      refreshing={isRefreshing}
      onRetry={handleRetry}
    >
      <Content />
    </LoadingWrapper>
  );
};

export const PullToRefresh: Story = { render: () => <PullToRefreshDemo /> };
