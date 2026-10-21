import { StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { OfflineDataBar } from './OfflineDataBar';

describe('OfflineDataBar', () => {
  it('renders the label on the subtle band with the app metrics', async () => {
    await render(<OfflineDataBar label="Offline data" testID="bar" />);
    expect(
      StyleSheet.flatten(screen.getByTestId('bar').props.style),
    ).toMatchObject({
      backgroundColor: lightTheme.colors.bg.subtle,
      height: 40,
      paddingHorizontal: 16,
      gap: 8,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Offline data').props.style),
    ).toMatchObject({
      fontSize: 12,
      lineHeight: 12,
      color: lightTheme.colors.text.secondary,
    });
  });

  it('tints the icon with the default icon color', async () => {
    await render(<OfflineDataBar label="Offline data" />);
    const [path] = screen.container.queryAll(
      node => typeof node.props.d === 'string',
    );
    if (!path) throw new Error('Icon path not rendered');
    expect(path.props.stroke).toBe(lightTheme.colors.icon.default);
  });
});
