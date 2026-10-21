import { View } from 'react-native';
import { act, render, screen } from '@testing-library/react-native';

import { NetworkFallback } from './NetworkFallback';

const mockRefreshNetwork = jest.fn<Promise<boolean>, []>();

const renderFallback = async ({
  isContentAvailable = false,
  isOffline = false,
  resetCallback = jest.fn(),
}: {
  isContentAvailable?: boolean;
  isOffline?: boolean;
  resetCallback?: () => Promise<void> | void;
} = {}) => {
  await render(
    <NetworkFallback
      isContentAvailable={isContentAvailable}
      isOffline={isOffline}
      refreshNetwork={mockRefreshNetwork}
      resetCallback={resetCallback}
      view={<View testID="network-fallback" />}
    >
      <View testID="network-content" />
    </NetworkFallback>,
  );
};

const getOnRefresh = (): (() => Promise<void>) => {
  const [scrollView] = screen.container.queryAll(
    node => node.props.refreshControl !== undefined,
  );
  if (!scrollView) throw new Error('Fallback ScrollView not rendered');
  return scrollView.props.refreshControl.props.onRefresh;
};

describe('NetworkFallback', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children while the network is online', async () => {
    await renderFallback();
    expect(screen.getByTestId('network-content')).toBeTruthy();
    expect(screen.queryByTestId('network-fallback')).toBeNull();
  });

  it('renders cached children while offline', async () => {
    await renderFallback({ isOffline: true, isContentAvailable: true });
    expect(screen.getByTestId('network-content')).toBeTruthy();
    expect(screen.queryByTestId('network-fallback')).toBeNull();
  });

  it('blocks children and renders the supplied view while offline', async () => {
    await renderFallback({ isOffline: true });
    expect(screen.getByTestId('network-fallback')).toBeTruthy();
    expect(screen.queryByTestId('network-content')).toBeNull();
  });

  it('does not reset the owner while connectivity is unavailable', async () => {
    mockRefreshNetwork.mockResolvedValue(false);
    const resetCallback = jest.fn();
    await renderFallback({ isOffline: true, resetCallback });

    await act(async () => {
      await getOnRefresh()();
    });

    expect(mockRefreshNetwork).toHaveBeenCalledTimes(1);
    expect(resetCallback).not.toHaveBeenCalled();
  });

  it('resets the owner after connectivity is restored', async () => {
    mockRefreshNetwork.mockResolvedValue(true);
    const resetCallback = jest.fn().mockResolvedValue(undefined);
    await renderFallback({ isOffline: true, resetCallback });

    await act(async () => {
      await getOnRefresh()();
    });

    expect(mockRefreshNetwork).toHaveBeenCalledTimes(1);
    expect(resetCallback).toHaveBeenCalledTimes(1);
  });

  it('ignores a second pull while refresh is already in progress', async () => {
    let resolveNetworkRefresh: (isNetworkRestored: boolean) => void = () => {};
    mockRefreshNetwork.mockReturnValue(
      new Promise(resolve => {
        resolveNetworkRefresh = resolve;
      }),
    );
    const resetCallback = jest.fn().mockResolvedValue(undefined);
    await renderFallback({ isOffline: true, resetCallback });
    const onRefresh = getOnRefresh();

    await act(async () => {
      const firstRefresh = onRefresh();
      const secondRefresh = onRefresh();
      resolveNetworkRefresh(true);
      await Promise.all([firstRefresh, secondRefresh]);
    });

    expect(mockRefreshNetwork).toHaveBeenCalledTimes(1);
    expect(resetCallback).toHaveBeenCalledTimes(1);
  });
});
