import { StyleSheet, Switch } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { InfoRow } from './InfoRow';

describe('InfoRow', () => {
  it('renders title, description and the trailing control', async () => {
    await render(
      <InfoRow title="Online booking" description="Clients can book online">
        <Switch accessibilityLabel="Online booking" value />
      </InfoRow>,
    );
    expect(
      StyleSheet.flatten(screen.getByText('Online booking').props.style),
    ).toMatchObject({
      ...lightTheme.typography.headline.regular,
      color: lightTheme.colors.text.primary,
      flexShrink: 1,
    });
    expect(
      StyleSheet.flatten(
        screen.getByText('Clients can book online').props.style,
      ),
    ).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.secondary,
    });
    expect(screen.getByRole('switch', { name: 'Online booking' })).toBeTruthy();
  });

  it('hides an empty description', async () => {
    await render(
      <InfoRow title="Title" description="">
        <Switch value={false} />
      </InfoRow>,
    );
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getAllByText(/.*/)).toHaveLength(1);
  });
});
