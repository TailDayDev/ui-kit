import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders an unselected tag', async () => {
    await render(
      <Tag
        item={{ id: 1, title: 'Heated floor' }}
        selectedItems={[2]}
        handlePress={jest.fn()}
      />,
    );
    const button = screen.getByRole('button', { name: 'Heated floor' });
    expect(button).not.toBeSelected();
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      borderColor: lightTheme.colors.border.default,
      borderRadius: lightTheme.radius.sm,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Heated floor').props.style).color,
    ).toBe(lightTheme.colors.text.primary);
  });

  it('is selected when its id matches after normalisation', async () => {
    await render(
      <Tag
        item={{ id: 7, title: 'Garden' }}
        selectedItems={[' 7 ']}
        handlePress={jest.fn()}
      />,
    );
    const button = screen.getByRole('button', { name: 'Garden' });
    expect(button).toBeSelected();
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accentSoft,
      borderColor: lightTheme.palette.primary,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Garden').props.style).color,
    ).toBe(lightTheme.colors.text.accent);
  });

  it('calls handlePress with the item id', async () => {
    const handlePress = jest.fn();
    await render(
      <Tag
        item={{ id: 'a1', title: 'Camera' }}
        selectedItems={[]}
        handlePress={handlePress}
        testID="tag"
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Camera' }));
    expect(handlePress).toHaveBeenCalledWith('a1');
  });

  it("passes '' when the item has no id", async () => {
    const handlePress = jest.fn();
    await render(
      <Tag
        item={{ id: null, title: 'Unknown' }}
        selectedItems={['']}
        handlePress={handlePress}
      />,
    );
    const button = screen.getByRole('button', { name: 'Unknown' });
    expect(button).not.toBeSelected();
    await fireEvent.press(button);
    expect(handlePress).toHaveBeenCalledWith('');
  });
});
