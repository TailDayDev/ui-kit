import { StyleSheet, Text } from 'react-native';
import { act, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { LoadingWrapper } from './LoadingWrapper';

const skeleton = <Text>Skeleton</Text>;
const content = <Text>Content</Text>;

describe('LoadingWrapper', () => {
  it('renders only the skeleton while loading', async () => {
    await render(
      <LoadingWrapper loading skeleton={skeleton}>
        {content}
      </LoadingWrapper>,
    );
    expect(screen.getByText('Skeleton')).toBeTruthy();
    expect(screen.queryByText('Content')).toBeNull();
  });

  it('renders the content when not loading', async () => {
    await render(
      <LoadingWrapper loading={false} skeleton={skeleton}>
        {content}
      </LoadingWrapper>,
    );
    expect(screen.getByText('Content')).toBeTruthy();
    expect(screen.queryByText('Skeleton')).toBeNull();
  });

  it('cross-fades from skeleton to content and then drops the skeleton', async () => {
    jest.useFakeTimers();
    await render(
      <LoadingWrapper loading skeleton={skeleton}>
        {content}
      </LoadingWrapper>,
    );
    await screen.rerender(
      <LoadingWrapper loading={false} skeleton={skeleton}>
        {content}
      </LoadingWrapper>,
    );
    expect(screen.getByText('Content')).toBeTruthy();
    expect(screen.getByText('Skeleton')).toBeTruthy();

    await act(async () => {
      jest.runAllTimers();
    });
    expect(screen.queryByText('Skeleton')).toBeNull();
    jest.useRealTimers();
  });

  it('drops the skeleton at once with skipExitAnimation', async () => {
    await render(
      <LoadingWrapper loading skeleton={skeleton} skipExitAnimation>
        {content}
      </LoadingWrapper>,
    );
    await screen.rerender(
      <LoadingWrapper loading={false} skeleton={skeleton} skipExitAnimation>
        {content}
      </LoadingWrapper>,
    );
    expect(screen.getByText('Content')).toBeTruthy();
    expect(screen.queryByText('Skeleton')).toBeNull();
  });

  it('wires pull-to-refresh to onRetry with the accent spinner', async () => {
    const onRetry = jest.fn();
    await render(
      <LoadingWrapper
        loading={false}
        skeleton={skeleton}
        enablePullToRefresh
        refreshing={false}
        onRetry={onRetry}
      >
        {content}
      </LoadingWrapper>,
    );
    const [scrollView] = screen.container.queryAll(
      node => node.props.refreshControl !== undefined,
    );
    if (!scrollView) throw new Error('ScrollView not rendered');
    const { refreshControl } = scrollView.props;
    expect(refreshControl.props.tintColor).toBe(lightTheme.colors.icon.accent);
    await act(async () => refreshControl.props.onRefresh());
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('sizes to content with fitContent', async () => {
    await render(
      <LoadingWrapper loading={false} skeleton={skeleton} fitContent>
        {content}
      </LoadingWrapper>,
    );
    const [container] = screen.container.queryAll(
      node => StyleSheet.flatten(node.props.style)?.position === 'relative',
    );
    if (!container) throw new Error('Container not rendered');
    expect(StyleSheet.flatten(container.props.style)).toMatchObject({
      flex: 0,
    });
  });
});
