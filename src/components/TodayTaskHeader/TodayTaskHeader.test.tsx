import { StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { TodayTaskHeader } from './TodayTaskHeader';

describe('TodayTaskHeader', () => {
  it('lays out badge left and time right with the Figma padding', async () => {
    await render(
      <TodayTaskHeader
        testID="header"
        badge={{ label: 'Check-in' }}
        time={{ title: '10:00', subtitle: 'in 2 h' }}
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('header').props.style),
    ).toMatchObject({
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingTop: 8,
      paddingRight: 16,
      paddingBottom: 0,
      paddingLeft: 1,
    });
    expect(screen.getByLabelText('Check-in')).toBeTruthy();
    expect(screen.getByText('10:00')).toBeTruthy();
    expect(screen.getByText('in 2 h')).toBeTruthy();
  });

  it('renders without time', async () => {
    await render(<TodayTaskHeader badge={{ label: 'Check-in' }} />);
    expect(screen.queryByText('10:00')).toBeNull();
  });
});
