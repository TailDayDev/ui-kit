import { StyleSheet, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { InfoCard } from './InfoCard';

describe('InfoCard', () => {
  it('renders icon, title and description', async () => {
    await render(
      <InfoCard
        icon={<View testID="icon" />}
        title="Set up calendar"
        description="Select dates"
      />,
    );
    expect(screen.getByTestId('icon')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByText('Set up calendar').props.style),
    ).toMatchObject({
      ...lightTheme.typography.body.bold,
      color: lightTheme.colors.text.primary,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Select dates').props.style),
    ).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.secondary,
    });
  });

  it('hides an empty description', async () => {
    await render(<InfoCard icon={null} title="Title" description="" />);
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getAllByText(/.*/)).toHaveLength(1);
  });
});
