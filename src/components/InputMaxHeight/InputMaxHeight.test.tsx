import {
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  View,
  type KeyboardEvent,
  type KeyboardEventName,
} from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { InputMaxHeight } from './InputMaxHeight';
import type { InputMaxHeightProps } from './InputMaxHeight.types';

/** The app's «Готово» bar height, passed in as `keyboardAccessoryHeight`. */
const ACCESSORY_HEIGHT = 43;

type HostElement = ReturnType<typeof screen.getByTestId>;

const flatStyle = (node: HostElement | null | undefined) =>
  StyleSheet.flatten(node?.props.style) ?? {};

describe('InputMaxHeight', () => {
  it('renders the value, placeholder and counter', async () => {
    await render(
      <InputMaxHeight
        value="Rex"
        setValue={jest.fn()}
        placeholder="Pet name"
        maxLength={50}
        testID="field"
      />,
    );
    const input = screen.getByTestId('field');
    expect(input).toHaveDisplayValue('Rex');
    expect(input.props.placeholder).toBe('Pet name');
    expect(screen.getByText('3/50')).toBeTruthy();
  });

  it('filters typed text by keyboard type', async () => {
    const setValue = jest.fn();
    await render(
      <InputMaxHeight
        value=""
        setValue={setValue}
        keyboardType="numeric"
        testID="field"
      />,
    );
    await fireEvent.changeText(screen.getByTestId('field'), '1a2,5');
    expect(setValue).toHaveBeenCalledWith('12,5');
  });

  it('disables the iOS QuickType bar when autocorrection is disabled', async () => {
    await render(
      <InputMaxHeight
        autoCorrect={false}
        keyboardType="numeric"
        setValue={jest.fn()}
        value="10"
        testID="field"
      />,
    );
    const input = screen.getByTestId('field');
    expect(input.props.autoCorrect).toBe(false);
    expect(input.props.spellCheck).toBe(false);
    expect(input.props.multiline).toBe(false);
  });

  it('is read-only when disabled', async () => {
    await render(
      <InputMaxHeight
        value="Rex"
        setValue={jest.fn()}
        disabled
        testID="field"
      />,
    );
    const input = screen.getByTestId('field');
    expect(input.props.editable).toBe(false);
    expect(input).toBeDisabled();
  });

  it('announces the error while hasError is set', async () => {
    await render(
      <InputMaxHeight
        value=""
        setValue={jest.fn()}
        hasError
        errorText="Name is required"
        testID="field"
      />,
    );
    expect(screen.getByTestId('field').props.accessibilityHint).toBe(
      'Name is required',
    );
  });

  it('shows the unit after the value', async () => {
    await render(
      <InputMaxHeight
        value="45"
        setValue={jest.fn()}
        unitText="$"
        inputSize="medium"
        testID="field"
      />,
    );
    expect(screen.getByText('$')).toBeTruthy();
    expect(flatStyle(screen.getByTestId('field')).lineHeight).toBe(53);
  });
});

describe('InputMaxHeight keyboard layout', () => {
  const originalPlatform = Platform.OS;
  const listeners = new Map<
    KeyboardEventName,
    Set<(event: KeyboardEvent) => void>
  >();
  let measuredTop = 120;
  let measuredHeight = 600;

  const emit = (name: KeyboardEventName, screenY: number) => {
    const event: KeyboardEvent = {
      duration: 250,
      easing: 'keyboard',
      endCoordinates: {
        screenY,
        screenX: 0,
        height: 800 - screenY,
        width: 400,
      },
    };
    [...(listeners.get(name) ?? [])].forEach(listener => listener(event));
  };
  const setPlatform = (os: typeof Platform.OS) =>
    Object.defineProperty(Platform, 'OS', { configurable: true, value: os });

  const mount = async (props: Partial<InputMaxHeightProps> = {}) => {
    const view = await render(
      <InputMaxHeight
        value="test"
        setValue={jest.fn()}
        maxLength={50}
        keyboardAccessoryHeight={ACCESSORY_HEIGHT}
        testID="field"
        {...props}
      />,
    );
    return view;
  };
  const input = () => screen.getByTestId('field');
  /** The view whose bottom margin makes room for the keyboard. */
  const viewport = () => {
    let node: HostElement | null = input();
    while (node && flatStyle(node).overflow !== 'hidden') {
      node = node.parent;
    }
    return node;
  };
  const container = () => viewport()?.parent ?? null;
  const marginBottom = () => flatStyle(viewport()).marginBottom;
  const focus = () => act(() => input().props.onFocus());
  const blur = () => act(() => input().props.onBlur());

  beforeEach(() => {
    measuredTop = 120;
    measuredHeight = 600;
    listeners.clear();
    setPlatform('ios');
    jest.spyOn(Keyboard, 'metrics').mockReturnValue(undefined);
    jest.spyOn(Keyboard, 'addListener').mockImplementation((name, listener) => {
      const subscribers = listeners.get(name) ?? new Set();
      subscribers.add(listener);
      listeners.set(name, subscribers);
      return {
        remove: () => {
          subscribers.delete(listener);
        },
      } as ReturnType<typeof Keyboard.addListener>;
    });
    jest
      .spyOn(View.prototype, 'measureInWindow')
      .mockImplementation(callback => {
        callback(0, measuredTop, 400, measuredHeight);
      });
  });

  afterEach(async () => {
    await screen.unmount();
    expect(
      [...listeners.values()].every(subscribers => subscribers.size === 0),
    ).toBe(true);
    jest.restoreAllMocks();
    setPlatform(originalPlatform);
  });

  it.each(['ios', 'android'] as const)(
    'shrinks only the inner area on %s and restores it after dismissal',
    async platform => {
      setPlatform(platform);
      const onBlur = jest.fn();
      await mount({ onBlur });
      const originalStyle = flatStyle(container());
      await focus();
      await act(() =>
        emit(platform === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', 450),
      );
      // Keyboard top minus the accessory bar riding on it.
      expect(measuredTop + measuredHeight - marginBottom()).toBe(
        450 - ACCESSORY_HEIGHT,
      );
      expect(flatStyle(container())).toEqual(originalStyle);
      const counter = screen.getByText('4/50');
      expect(flatStyle(counter).position).toBeUndefined();
      expect(counter.parent).toBe(viewport());
      await act(() =>
        emit(platform === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', 800),
      );
      await blur();
      await act(() => emit('keyboardDidHide', 800));
      expect(marginBottom()).toBe(0);
      expect(flatStyle(container())).toEqual(originalStyle);
      expect(onBlur).toHaveBeenCalledTimes(1);
    },
  );

  it('updates the visible area when the iOS keyboard frame or container layout changes', async () => {
    await mount();
    await focus();
    await act(() => emit('keyboardWillShow', 450));
    await act(() => emit('keyboardWillChangeFrame', 400));
    expect(marginBottom()).toBe(320 + ACCESSORY_HEIGHT);
    measuredTop = 100;
    await fireEvent(container() as HostElement, 'layout');
    expect(marginBottom()).toBe(300 + ACCESSORY_HEIGHT);
  });

  it('only adjusts the focused field and handles refocus while the keyboard stays open', async () => {
    await mount();
    await act(() => emit('keyboardWillShow', 450));
    expect(marginBottom()).toBe(0);
    await focus();
    expect(marginBottom()).toBe(270 + ACCESSORY_HEIGHT);
    await blur();
    expect(marginBottom()).toBe(0);
    await focus();
    expect(marginBottom()).toBe(270 + ACCESSORY_HEIGHT);
  });

  it('does not reuse stale keyboard metrics when focus changes during dismissal', async () => {
    await mount();
    await focus();
    await act(() => emit('keyboardWillShow', 450));
    jest
      .mocked(Keyboard.metrics)
      .mockReturnValue({ screenY: 450, screenX: 0, height: 350, width: 400 });
    await act(() => emit('keyboardWillHide', 800));
    await blur();
    await focus();
    expect(marginBottom()).toBe(0);
  });

  it('ignores stale keyboard metrics when the keyboard is not visible on mount', async () => {
    jest.spyOn(Keyboard, 'isVisible').mockReturnValue(false);
    jest
      .mocked(Keyboard.metrics)
      .mockReturnValue({ screenY: 450, screenX: 0, height: 350, width: 400 });
    await mount();
    await focus();
    expect(marginBottom()).toBe(0);
  });

  it('measures a field mounted with the keyboard already visible', async () => {
    jest.spyOn(Keyboard, 'isVisible').mockReturnValue(true);
    jest
      .mocked(Keyboard.metrics)
      .mockReturnValue({ screenY: 450, screenX: 0, height: 350, width: 400 });
    await mount();
    await focus();
    expect(marginBottom()).toBe(270 + ACCESSORY_HEIGHT);
  });

  it('ignores a pending native measurement after the keyboard hides', async () => {
    await mount();
    await focus();
    let pendingMeasurement: Parameters<View['measureInWindow']>[0] | undefined;
    jest.mocked(View.prototype.measureInWindow).mockImplementation(callback => {
      pendingMeasurement = callback;
    });
    await act(() => emit('keyboardWillShow', 450));
    await act(() => emit('keyboardWillHide', 800));
    await act(() => pendingMeasurement?.(0, 120, 400, 600));
    expect(marginBottom()).toBe(0);
  });

  it('keeps the full inner area when the field is already above the keyboard', async () => {
    measuredHeight = 200;
    await mount();
    await focus();
    await act(() => emit('keyboardWillShow', 450));
    expect(marginBottom()).toBe(0);
  });

  it('does not add an accessory offset by default', async () => {
    await mount({ keyboardAccessoryHeight: undefined });
    await focus();
    await act(() => emit('keyboardWillShow', 450));
    expect(marginBottom()).toBe(270);
  });

  it('reopens the keyboard after Android Back with native and local focus in sync', async () => {
    setPlatform('android');
    const onFocus = jest.fn();
    await mount({ onFocus });
    let isNativeFocused = false;
    jest.spyOn(TextInput.prototype, 'blur').mockImplementation(() => {
      isNativeFocused = false;
    });
    jest.spyOn(TextInput.prototype, 'focus').mockImplementation(() => {
      if (!isNativeFocused) {
        isNativeFocused = true;
        input().props.onFocus();
      }
    });
    await fireEvent(container() as HostElement, 'pressIn');
    await act(() => emit('keyboardDidShow', 450));
    expect(marginBottom()).toBe(270 + ACCESSORY_HEIGHT);
    await act(() => emit('keyboardDidHide', 800));
    expect(isNativeFocused).toBe(false);
    expect(marginBottom()).toBe(0);
    await fireEvent(container() as HostElement, 'pressIn');
    await act(() => emit('keyboardDidShow', 450));
    expect(marginBottom()).toBe(270 + ACCESSORY_HEIGHT);
    expect(onFocus).toHaveBeenCalledTimes(2);
  });

  it('notifies focus only when the native input gains focus', async () => {
    const onFocus = jest.fn();
    await mount({ onFocus });
    const nativeFocus = jest
      .spyOn(TextInput.prototype, 'focus')
      .mockImplementation(() => undefined);
    await fireEvent(container() as HostElement, 'pressIn');
    expect(nativeFocus).toHaveBeenCalled();
    expect(onFocus).not.toHaveBeenCalled();
    await focus();
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});
