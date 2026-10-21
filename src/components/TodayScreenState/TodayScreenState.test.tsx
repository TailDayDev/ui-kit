import { StyleSheet, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodayScreenState } from './TodayScreenState';
import type { TodayScreenStateKind } from './TodayScreenState.types';

const renderState = (kind: TodayScreenStateKind, onAction = jest.fn()) =>
  render(
    <TodayScreenState
      testID="state"
      kind={kind}
      title="Sign in"
      description="Tasks appear here."
      illustration={<View testID="picture" />}
      actionLabel="Log in"
      onAction={onAction}
      label="Offline data"
    />,
  );

describe('TodayScreenState', () => {
  it('renders the Figma message layout: padding 40, gap 48, texts', async () => {
    await renderState('no-auth');
    expect(
      StyleSheet.flatten(screen.getByTestId('state').props.style),
    ).toMatchObject({
      paddingHorizontal: 40,
      gap: 48,
      alignItems: 'center',
      justifyContent: 'center',
    });
    expect(
      StyleSheet.flatten(
        screen.getByRole('header', { name: 'Sign in' }).props.style,
      ),
    ).toMatchObject({
      ...lightTheme.typography.title.medium,
      color: lightTheme.colors.text.primary,
      textAlign: 'center',
    });
    expect(
      StyleSheet.flatten(screen.getByText('Tasks appear here.').props.style),
    ).toMatchObject({
      ...lightTheme.typography.body.regular,
      color: lightTheme.colors.text.secondary,
      textAlign: 'center',
    });
    expect(
      StyleSheet.flatten(screen.getByTestId('picture').parent?.props.style),
    ).toMatchObject({ width: 120, height: 120 });
    expect(screen.queryByText('Offline data')).toBeNull();
  });

  it.each<TodayScreenStateKind>(['no-auth', 'no-hotel', 'no-results'])(
    '%s shows the action button and calls onAction',
    async kind => {
      const onAction = jest.fn();
      await renderState(kind, onAction);
      await fireEvent.press(screen.getByRole('button', { name: 'Log in' }));
      expect(onAction).toHaveBeenCalledTimes(1);
    },
  );

  it('empty has no action button', async () => {
    await renderState('empty');
    expect(screen.getByText('Sign in')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('hides the button without onAction', async () => {
    await render(
      <TodayScreenState kind="no-auth" title="Sign in" actionLabel="Log in" />,
    );
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('offline renders the 40pt band with the label only', async () => {
    await renderState('offline');
    expect(
      StyleSheet.flatten(screen.getByTestId('state').props.style),
    ).toMatchObject({
      height: 40,
      paddingHorizontal: 16,
      gap: 8,
      flexDirection: 'row',
      backgroundColor: lightTheme.colors.bg.subtle,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Offline data').props.style),
    ).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.secondary,
    });
    expect(screen.queryByText('Sign in')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
    expect(
      screen.queryByTestId('picture', { includeHiddenElements: true }),
    ).toBeNull();
  });
});
