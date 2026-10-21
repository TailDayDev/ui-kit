import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { FAQ } from './FAQ';

const FAQ_DATA = {
  title: 'Questions',
  items: [
    { id: 'a', title: 'How to book?', description: 'Tap the plus button.' },
    { id: 'b', title: 'How to cancel?', description: 'Open the booking.' },
  ],
};

describe('FAQ', () => {
  it('renders the title and collapsed questions', async () => {
    await render(<FAQ faqData={FAQ_DATA} testID="faq" />);
    expect(screen.getByTestId('faq.loaded')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByText('Questions').props.style),
    ).toMatchObject(lightTheme.typography.largeTitle.semibold);
    expect(screen.getByText('How to book?')).toBeTruthy();
    expect(screen.queryByText('Tap the plus button.')).toBeNull();
  });

  it('toggles an answer on press', async () => {
    await render(<FAQ faqData={FAQ_DATA} testID="faq" />);
    const question = screen.getByTestId('faq.item.0');
    expect(question).toBeCollapsed();

    await fireEvent.press(question);
    expect(screen.getByText('Tap the plus button.')).toBeTruthy();
    expect(question).toBeExpanded();
    expect(screen.queryByText('Open the booking.')).toBeNull();

    await fireEvent.press(question);
    expect(screen.queryByText('Tap the plus button.')).toBeNull();
  });

  it('shows the skeleton while loading', async () => {
    await render(<FAQ faqData={FAQ_DATA} loading testID="faq" />);
    expect(screen.getByTestId('faq.skeleton')).toBeTruthy();
    expect(screen.queryByText('Questions')).toBeNull();
  });

  it('renders nothing without items', async () => {
    await render(
      <FAQ faqData={{ title: 'Questions', items: [] }} testID="faq" />,
    );
    expect(screen.queryByTestId('faq.loaded')).toBeNull();
    expect(screen.queryByText('Questions')).toBeNull();
  });
});
