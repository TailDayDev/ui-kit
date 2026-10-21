import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Text } from '../../primitives/Text';
import { lightTheme } from '../../theme';
import { MultiActionDetailsContent } from './MultiActionDetailsContent';
import type { MultiActionDetailsContentItem } from './MultiActionDetailsContent.types';

const makeItem = (
  id: string,
  onMenuPress = jest.fn(),
): MultiActionDetailsContentItem => ({
  id,
  testID: `card.${id}`,
  pet: <Text>{`pet ${id}`}</Text>,
  footer: {
    onMenuPress,
    menuAccessibilityLabel: `menu ${id}`,
    sliderProps: { completedLabel: 'Готово!', onComplete: jest.fn() },
  },
});

describe('MultiActionDetailsContent', () => {
  it('renders one shared header and a headerless card per pet', async () => {
    await render(
      <MultiActionDetailsContent
        testID="body"
        listTestID="list"
        header={{
          badge: { label: 'Кормление' },
          time: { title: 'День', subtitle: '11:00 – 16:00' },
        }}
        items={[makeItem('a'), makeItem('b'), makeItem('c')]}
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('body').props.style),
    ).toMatchObject({ backgroundColor: lightTheme.colors.bg.screen });
    expect(
      StyleSheet.flatten(
        screen.getByTestId('list').props.contentContainerStyle,
      ),
    ).toMatchObject({
      gap: 16,
      paddingTop: 16,
      paddingHorizontal: 16,
      paddingBottom: 24,
    });
    expect(screen.getAllByText('День')).toHaveLength(1);
    expect(screen.getAllByLabelText('Кормление')).toHaveLength(1);
    expect(screen.getByText('pet a')).toBeTruthy();
    expect(screen.getByText('pet c')).toBeTruthy();
    expect(screen.getByTestId('card.b')).toBeTruthy();
  });

  it('routes each card menu to its own callback', async () => {
    const onMenuB = jest.fn();
    await render(
      <MultiActionDetailsContent
        header={{ badge: { label: 'Кормление' } }}
        items={[makeItem('a'), makeItem('b', onMenuB)]}
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'menu b' }));
    expect(onMenuB).toHaveBeenCalledTimes(1);
  });

  it('renders the nested overlay inside the body', async () => {
    await render(
      <MultiActionDetailsContent
        header={{ badge: { label: 'Кормление' } }}
        items={[]}
        nestedOverlay={<Text>sheet</Text>}
      />,
    );
    expect(screen.getByText('sheet')).toBeTruthy();
  });
});
