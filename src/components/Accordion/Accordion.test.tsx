import { useState } from 'react';
import { LayoutAnimation, StyleSheet, Text as RNText } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { AccordionGroup, AccordionItem } from './Accordion';
import { CloseSection } from './CloseSection';

const Harness = ({
  initial = null,
  isError = false,
  pressToToggle = true,
}: {
  initial?: string | null;
  isError?: boolean;
  pressToToggle?: boolean;
}) => {
  const [openId, setOpenId] = useState<string | null>(initial);
  return (
    <AccordionGroup openId={openId} setOpenIdState={setOpenId}>
      {['pet', 'owner'].map(id => (
        <AccordionItem
          key={id}
          id={id}
          isError={isError}
          pressToToggle={pressToToggle}
          collapsed={() => <RNText>{`${id} closed`}</RNText>}
          expanded={({ close }) => (
            <RNText onPress={close}>{`${id} open`}</RNText>
          )}
        />
      ))}
    </AccordionGroup>
  );
};

describe('Accordion', () => {
  beforeEach(() => {
    jest.spyOn(LayoutAnimation, 'configureNext').mockImplementation(jest.fn());
  });
  afterEach(() => jest.restoreAllMocks());

  it('opens one item at a time with a layout animation', async () => {
    await render(<Harness />);
    expect(screen.getByText('pet closed')).toBeTruthy();
    await fireEvent.press(screen.getByTestId('accordion.pet'));
    expect(screen.getByText('pet open')).toBeTruthy();
    expect(LayoutAnimation.configureNext).toHaveBeenCalledTimes(1);

    await fireEvent.press(screen.getByTestId('accordion.owner'));
    expect(screen.getByText('owner open')).toBeTruthy();
    expect(screen.getByText('pet closed')).toBeTruthy();
  });

  it('closes through the render controls', async () => {
    await render(<Harness initial="pet" />);
    await fireEvent.press(screen.getByText('pet open'));
    expect(screen.getByText('pet closed')).toBeTruthy();
  });

  it('does not open on tap when pressToToggle is off', async () => {
    await render(<Harness pressToToggle={false} />);
    await fireEvent.press(screen.getByTestId('accordion.pet'));
    expect(screen.queryByText('pet open')).toBeNull();
  });

  it('draws a red border on error', async () => {
    await render(<Harness isError />);
    const card = screen.getByTestId('accordion.pet').parent;
    expect(StyleSheet.flatten(card?.props.style)).toMatchObject({
      borderColor: lightTheme.colors.text.error,
      borderRadius: lightTheme.radius.lg,
      borderWidth: 1,
    });
  });

  it('throws outside a group', async () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    await expect(
      render(
        <AccordionItem id="x" collapsed={() => null} expanded={() => null} />,
      ),
    ).rejects.toThrow(
      'AccordionItem must be rendered inside <AccordionGroup>.',
    );
  });
});

describe('CloseSection', () => {
  it('shows the value in primary bold text', async () => {
    await render(<CloseSection label="Pet" value="Rex" emptyLabel="Select" />);
    expect(
      StyleSheet.flatten(screen.getByText('Rex').props.style),
    ).toMatchObject({
      ...lightTheme.typography.headline.bold,
      color: lightTheme.colors.text.primary,
      textAlign: 'right',
    });
  });

  it('shows the empty label in secondary text', async () => {
    await render(<CloseSection label="Pet" value="" emptyLabel="Select" />);
    expect(
      StyleSheet.flatten(screen.getByText('Select').props.style).color,
    ).toBe(lightTheme.colors.text.secondary);
  });
});
