import { act, renderHook } from '@testing-library/react-native';

import { useModalSequence } from './useModalSequence';

type Step = 'form' | 'confirm';

const renderSequence = async (initialTarget: Step | null) => {
  const onSequenceEnd = jest.fn();
  const hook = await renderHook(
    ({ target }: { target: Step | null }) =>
      useModalSequence(target, onSequenceEnd),
    { initialProps: { target: initialTarget } },
  );

  return {
    getSequence: () => hook.result.current,
    onSequenceEnd,
    setTarget: (target: Step | null) => hook.rerender({ target }),
    unmount: hook.unmount,
  };
};

describe('useModalSequence', () => {
  it('presents the first modal immediately', async () => {
    const { getSequence, setTarget, unmount } = await renderSequence(null);

    expect(getSequence()).toMatchObject({ activeKey: null, visible: false });
    await setTarget('form');
    expect(getSequence()).toMatchObject({ activeKey: 'form', visible: true });
    await unmount();
  });

  it('presents the next modal only after the current one dismissed', async () => {
    const { getSequence, onSequenceEnd, setTarget, unmount } =
      await renderSequence('form');

    await setTarget('confirm');
    expect(getSequence()).toMatchObject({ activeKey: 'form', visible: false });

    await act(() => getSequence().onDismissed());
    expect(getSequence()).toMatchObject({
      activeKey: 'confirm',
      visible: true,
    });
    expect(onSequenceEnd).not.toHaveBeenCalled();
    await unmount();
  });

  it('ends the sequence after the last modal dismissed', async () => {
    const { getSequence, onSequenceEnd, setTarget, unmount } =
      await renderSequence('confirm');

    await setTarget(null);
    expect(getSequence()).toMatchObject({
      activeKey: 'confirm',
      visible: false,
    });

    await act(() => getSequence().onDismissed());
    expect(getSequence()).toMatchObject({ activeKey: null, visible: false });
    expect(onSequenceEnd).toHaveBeenCalledTimes(1);
    await unmount();
  });

  it('keeps the modal when it is reopened during its close animation', async () => {
    const { getSequence, onSequenceEnd, setTarget, unmount } =
      await renderSequence('form');

    await setTarget(null);
    await setTarget('form');
    await act(() => getSequence().onDismissed());

    expect(getSequence()).toMatchObject({ activeKey: 'form', visible: true });
    expect(onSequenceEnd).not.toHaveBeenCalled();
    await unmount();
  });
});
