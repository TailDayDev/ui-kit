import { renderHook } from '@testing-library/react-native';

import { useModalRenderConfig } from './useModalRenderConfig';

interface IConfig {
  title: string | null;
}

interface IHarnessProps extends IConfig {
  isVisible: boolean;
}

describe('useModalRenderConfig', () => {
  it('shows live props while visible and the last visible ones while hidden', async () => {
    const { result, rerender, unmount } = await renderHook(
      ({ isVisible, title }: IHarnessProps) =>
        useModalRenderConfig(isVisible, { title }),
      { initialProps: { isVisible: true, title: 'Name' } },
    );
    expect(result.current.title).toBe('Name');

    await rerender({ isVisible: true, title: 'Breed' });
    expect(result.current.title).toBe('Breed');

    // The owner clears the title when it closes: the leaving sheet keeps it.
    await rerender({ isVisible: false, title: null });
    expect(result.current.title).toBe('Breed');

    await rerender({ isVisible: true, title: 'Weight' });
    expect(result.current.title).toBe('Weight');
    await unmount();
  });
});
