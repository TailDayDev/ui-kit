import { StyleSheet, Text as RNText } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodayTransferDetails } from './TodayTransferDetails';

const flat = (testID: string) =>
  StyleSheet.flatten(
    screen.getByTestId(testID, { includeHiddenElements: true }).props.style,
  );

describe('TodayTransferDetails', () => {
  it('renders from and to placements in a bordered row', async () => {
    await render(
      <TodayTransferDetails
        testID="transfer"
        fromTitle="Room 12"
        toTitle="Playground"
        fromImage={<RNText>from-img</RNText>}
        toImage={<RNText>to-img</RNText>}
      />,
    );
    expect(screen.getByText('from-img')).toBeTruthy();
    expect(screen.getByText('to-img')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByText('Room 12').props.style),
    ).toMatchObject(lightTheme.typography.body.bold);
    expect(
      StyleSheet.flatten(screen.getByText('Playground').props.style),
    ).toMatchObject({ ...lightTheme.typography.body.bold, textAlign: 'right' });
    expect(flat('transfer')).toMatchObject({ padding: 16 });
    expect(flat('transfer.row')).toMatchObject({
      borderWidth: 1,
      borderRadius: 8,
      borderColor: lightTheme.colors.border.default,
    });
    expect(flat('transfer.from')).toMatchObject({
      paddingLeft: 8,
      paddingRight: 20,
    });
    expect(flat('transfer.to')).toMatchObject({
      paddingLeft: 20,
      paddingRight: 8,
      justifyContent: 'flex-end',
    });
  });

  it('centers a 32pt round arrow over the divider', async () => {
    await render(
      <TodayTransferDetails testID="transfer" fromTitle="A" toTitle="B" />,
    );
    expect(flat('transfer.arrow')).toMatchObject({
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: 32,
      height: 32,
      marginLeft: -16,
      marginTop: -16,
      backgroundColor: lightTheme.colors.bg.surface,
    });
  });
});
