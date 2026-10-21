import { View } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import {
  getModalLayers,
  ModalLayerTestRoot,
  resetModalLayersForTests,
} from '../ModalLayer';
import {
  useDeclarativeAlert,
  useDeclarativeApiErrorHandler,
} from './DeclarativeAlertContext';
import {
  DeclarativeAlertProvider,
  dismissDeclarativeAlertsForTeardown,
} from './DeclarativeAlertProvider';

let showAlert: ReturnType<typeof useDeclarativeAlert>['showAlert'];
let handleApiError: ReturnType<typeof useDeclarativeApiErrorHandler>;

const Harness = () => {
  ({ showAlert } = useDeclarativeAlert());
  handleApiError = useDeclarativeApiErrorHandler();
  return <View testID="provider-child" />;
};

const renderProvider = () =>
  render(
    <DeclarativeAlertProvider
      closeAccessibilityLabel="close"
      defaultErrorTitle="Error"
    >
      <Harness />
    </DeclarativeAlertProvider>,
    { wrapper: ModalLayerTestRoot },
  );

const pressAction = (index: number) =>
  fireEvent.press(
    screen.getByTestId(`button.declarativeAlert.action.${index}`),
  );

describe('DeclarativeAlertProvider', () => {
  afterEach(async () => {
    await act(() => {
      resetModalLayersForTests();
    });
  });

  it('keeps alerts FIFO and shows the next one after the first dismissed', async () => {
    await renderProvider();

    await act(() => {
      showAlert({ title: 'First', message: 'First message' });
      showAlert({ title: 'Second', message: 'Second message' });
    });

    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('First message')).toBeTruthy();
    expect(screen.queryByText('Second')).toBeNull();
    // Without actions: one cancel action labelled with the close text.
    expect(screen.getByTestId('button.declarativeAlert.action.0')).toBeTruthy();
    expect(screen.queryByTestId('button.declarativeAlert.action.1')).toBeNull();
    expect(screen.getByTestId('button.declarativeAlert.close')).toBeTruthy();

    await fireEvent.press(screen.getByTestId('button.declarativeAlert.close'));

    expect(screen.queryByText('First')).toBeNull();
    expect(screen.getByText('Second message')).toBeTruthy();
  });

  it('routes requested API errors through the declarative host', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    await renderProvider();

    await act(() => {
      handleApiError('Request failed', new Error('network'), { alert: true });
    });

    expect(screen.getByText('Error')).toBeTruthy();
    expect(screen.getByText('Request failed')).toBeTruthy();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Request failed',
      expect.any(Error),
    );
    consoleErrorSpy.mockRestore();
  });

  it('runs an action only after its alert is gone, once', async () => {
    const destructiveAction = jest.fn();
    await renderProvider();

    await act(() => {
      showAlert({
        title: 'Remove pet?',
        actions: [
          { title: 'Cancel', style: 'cancel' },
          { title: 'Remove', onPress: destructiveAction, style: 'destructive' },
        ],
      });
    });

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Remove' })).toBeTruthy();

    await pressAction(1);

    expect(destructiveAction).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Remove pet?')).toBeNull();
    expect(getModalLayers()).toHaveLength(0);
  });

  it('does not lose an alert requested while the previous one is open', async () => {
    await renderProvider();

    await act(() => {
      showAlert({ title: 'First' });
      showAlert({ title: 'Second' });
    });
    await pressAction(0);
    await act(() => {
      showAlert({ title: 'Third' });
    });

    expect(screen.getByText('Second')).toBeTruthy();
    await pressAction(0);
    expect(screen.getByText('Third')).toBeTruthy();
    await pressAction(0);
    expect(getModalLayers()).toHaveLength(0);
    expect(screen.getByTestId('provider-child')).toBeTruthy();
  });

  it('drops the queue and skips actions on session teardown', async () => {
    const currentAction = jest.fn();
    await renderProvider();

    await act(() => {
      showAlert({
        title: 'First',
        actions: [{ title: 'Go', onPress: currentAction }],
      });
      showAlert({ title: 'Queued' });
    });

    await act(() => {
      dismissDeclarativeAlertsForTeardown();
    });

    expect(currentAction).not.toHaveBeenCalled();
    expect(screen.queryByText('First')).toBeNull();
    expect(screen.queryByText('Queued')).toBeNull();

    await act(() => {
      showAlert({ title: 'Next session' });
    });
    expect(screen.getByText('Next session')).toBeTruthy();
  });

  it('throws outside the provider', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const Orphan = () => {
      useDeclarativeAlert();
      return null;
    };

    await expect(render(<Orphan />)).rejects.toThrow(
      'useDeclarativeAlert must be used within DeclarativeAlertProvider',
    );
    consoleErrorSpy.mockRestore();
  });
});
