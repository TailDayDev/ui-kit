import { act, renderHook } from '@testing-library/react-native';

import type { ModalLayerPhase } from '../../ModalLayer';
import { useModalPages } from './useModalPages';

const renderPages = (phase: ModalLayerPhase) =>
  renderHook(
    ({ currentPhase }: { currentPhase: ModalLayerPhase }) =>
      useModalPages({
        phase: currentPhase,
        defaultScreenIndex: 1,
        pageWidth: 400,
      }),
    { initialProps: { currentPhase: phase } },
  );

describe('useModalPages', () => {
  it('starts every new opening on the default page', async () => {
    const { result, rerender, unmount } = await renderPages('closed');

    await rerender({ currentPhase: 'entering' });
    await rerender({ currentPhase: 'open' });
    await act(() => result.current.slideTo(3));
    expect(result.current.screenIndex).toBe(3);

    await rerender({ currentPhase: 'exiting' });
    await rerender({ currentPhase: 'closed' });
    await rerender({ currentPhase: 'entering' });
    expect(result.current.screenIndex).toBe(1);
    await unmount();
  });

  it('starts on the default page when an opening skips entering (reduced motion)', async () => {
    const { result, rerender, unmount } = await renderPages('closed');

    await rerender({ currentPhase: 'open' });
    await act(() => result.current.slideTo(3));
    await rerender({ currentPhase: 'closed' });
    await rerender({ currentPhase: 'open' });

    expect(result.current.screenIndex).toBe(1);
    await unmount();
  });

  it('keeps the page when reopened while leaving', async () => {
    const { result, rerender, unmount } = await renderPages('closed');

    await rerender({ currentPhase: 'entering' });
    await rerender({ currentPhase: 'open' });
    await act(() => result.current.slideTo(2));
    await rerender({ currentPhase: 'exiting' });
    await rerender({ currentPhase: 'entering' });

    expect(result.current.screenIndex).toBe(2);
    await unmount();
  });

  it('ignores slideTo while closed', async () => {
    const { result, unmount } = await renderPages('closed');

    await act(() => result.current.slideTo(2));

    expect(result.current.screenIndex).toBe(1);
    await unmount();
  });
});
