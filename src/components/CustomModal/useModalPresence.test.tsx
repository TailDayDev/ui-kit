import { act, renderHook } from '@testing-library/react-native';

import { useModalPresence } from './useModalPresence';

const renderPresence = <T,>(initialValue: T | null | false) =>
  renderHook(
    ({ value }: { value: T | null | false }) => useModalPresence(value),
    {
      initialProps: { value: initialValue },
    },
  );

describe('useModalPresence', () => {
  it('stays unmounted while closed', async () => {
    const { result, unmount } = await renderPresence<boolean>(false);

    expect(result.current).toMatchObject({
      isMounted: false,
      value: null,
      visible: false,
    });
    await unmount();
  });

  it('keeps the modal mounted with the last value until onDismissed', async () => {
    const { result, rerender, unmount } = await renderPresence<string>(null);

    await rerender({ value: 'item-1' });
    expect(result.current).toMatchObject({
      isMounted: true,
      value: 'item-1',
      visible: true,
    });

    await rerender({ value: null });
    expect(result.current).toMatchObject({
      isMounted: true,
      value: 'item-1',
      visible: false,
    });

    await act(() => result.current.onDismissed());
    expect(result.current).toMatchObject({
      isMounted: false,
      value: null,
      visible: false,
    });
    await unmount();
  });

  it('ignores a stale onDismissed after a reopen during the close animation', async () => {
    const { result, rerender, unmount } =
      await renderPresence<string>('item-1');

    await rerender({ value: null });
    await rerender({ value: 'item-2' });
    await act(() => result.current.onDismissed());

    expect(result.current).toMatchObject({
      isMounted: true,
      value: 'item-2',
      visible: true,
    });
    await unmount();
  });

  it('treats true as an open flag', async () => {
    const { result, rerender, unmount } = await renderPresence<boolean>(true);

    expect(result.current.visible).toBe(true);
    await rerender({ value: false });
    expect(result.current).toMatchObject({ isMounted: true, visible: false });
    await act(() => result.current.onDismissed());
    expect(result.current.isMounted).toBe(false);
    await unmount();
  });
});
