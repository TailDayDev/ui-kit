import { StyleSheet, Text as RNText } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodayPlacementList } from './TodayPlacementList';

describe('TodayPlacementList', () => {
  it('renders one placement: caption/regular secondary, one line', async () => {
    await render(
      <TodayPlacementList
        testID="list"
        title="Room 12"
        secondTitle="Hidden"
        image={<RNText>img</RNText>}
      />,
    );
    const title = screen.getByText('Room 12');
    expect(title.props.numberOfLines).toBe(1);
    expect(StyleSheet.flatten(title.props.style)).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.secondary,
    });
    expect(screen.getByText('img')).toBeTruthy();
    expect(screen.queryByText('Hidden')).toBeNull();
    expect(
      StyleSheet.flatten(screen.getByTestId('list').props.style),
    ).toMatchObject({ flexDirection: 'row', gap: 4, alignItems: 'center' });
    expect(
      StyleSheet.flatten(screen.getByTestId('list.item1').props.style),
    ).toMatchObject({ gap: 4 });
  });

  it('renders two placements when itemsCount is 2', async () => {
    await render(
      <TodayPlacementList
        testID="list"
        itemsCount={2}
        title="Room 12"
        secondTitle="Playground"
      />,
    );
    expect(screen.getByText('Room 12')).toBeTruthy();
    expect(screen.getByText('Playground')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByTestId('list.item2').props.style),
    ).toMatchObject({ flexGrow: 1 });
  });
});
