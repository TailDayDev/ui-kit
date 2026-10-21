import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { ModalLayerTestRoot, resetModalLayersForTests } from '../ModalLayer';
import { findHostViews } from './__fixtures__/modalTestUtils';
import { CustomModal } from './CustomModal';

const locationHotelMountIds: string[] = [];

const pageScrollViews = () => findHostViews('custom-modal-page-scroll');

const getText = (testID: string) =>
  screen.getByTestId(testID).props.children as string;

const expectAllPageScrollEnabled = (isEnabled: boolean) => {
  const scrolls = pageScrollViews();
  expect(scrolls.length).toBeGreaterThan(0);
  scrolls.forEach(scroll => {
    expect(scroll.props.scrollEnabled).toBe(isEnabled);
    if (!isEnabled) {
      expect(scroll.props.contentInset.bottom).toBe(0);
      expect(
        StyleSheet.flatten(scroll.props.contentContainerStyle).minHeight,
      ).toBeUndefined();
    }
  });
};

const LocationHotelPage = () => {
  const mountIdRef = useRef(
    `location-hotel-${locationHotelMountIds.length + 1}`,
  );
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    locationHotelMountIds.push(mountIdRef.current);
  }, []);

  return (
    <View testID="location-hotel-owner">
      <Text testID="location-hotel-mount-id">{mountIdRef.current}</Text>
      <Text testID="location-hotel-search-state">
        {isSearchVisible ? 'open' : 'closed'}
      </Text>
      <Pressable
        testID="button.create-hotel.address.open"
        onPress={() => setIsSearchVisible(true)}
      />
      {isSearchVisible ? (
        <View testID="modal.address.search">
          <Text>search</Text>
        </View>
      ) : null}
    </View>
  );
};

const expectSearchStillOpen = () => {
  expect(locationHotelMountIds).toEqual(['location-hotel-1']);
  expect(getText('location-hotel-search-state')).toBe('open');
  expect(screen.getByTestId('modal.address.search')).toBeTruthy();
};

describe('CustomModal page host identity', () => {
  beforeEach(() => {
    locationHotelMountIds.length = 0;
    jest.useFakeTimers();
  });

  afterEach(async () => {
    await act(() => {
      jest.runOnlyPendingTimers();
      resetModalLayersForTests();
    });
    jest.useRealTimers();
  });

  it('uses a View page host when requested', async () => {
    const { unmount } = await render(
      <CustomModal
        onClose={jest.fn()}
        pageHost="view"
        scrollEnabled={false}
        title="Task search"
        visible
      >
        <View testID="flat-list-page" />
      </CustomModal>,
      { wrapper: ModalLayerTestRoot },
    );

    expect(pageScrollViews()).toHaveLength(0);
    expect(screen.getByTestId('flat-list-page')).toBeTruthy();
    await unmount();
  });

  it('keeps LocationHotel mount identity and search state across true→false→true scrollEnabled', async () => {
    let recreatePages: () => void = () => undefined;
    let setParentScrollEnabled: (next: boolean) => void = () => undefined;

    const Harness = () => {
      const [isScrollEnabled, setIsScrollEnabled] = useState(true);
      const [pageEpoch, setPageEpoch] = useState(0);
      recreatePages = () => setPageEpoch(epoch => epoch + 1);
      setParentScrollEnabled = setIsScrollEnabled;

      return (
        <CustomModal
          onClose={jest.fn()}
          scrollEnabled={isScrollEnabled}
          title="CreateHotelWizard"
          visible
        >
          <View key="conditions_comfort">
            <View testID={`conditions-${pageEpoch}`} />
          </View>
          <View key="location_hotel">
            <LocationHotelPage />
          </View>
          <View key="hotel_photos">
            <View testID={`photos-${pageEpoch}`} />
          </View>
        </CustomModal>
      );
    };

    const { unmount } = await render(<Harness />, {
      wrapper: ModalLayerTestRoot,
    });

    await fireEvent.press(
      screen.getByTestId('button.create-hotel.address.open'),
    );

    expect(getText('location-hotel-mount-id')).toBe('location-hotel-1');
    expectSearchStillOpen();

    await act(() => recreatePages());

    expectSearchStillOpen();
    expect(pageScrollViews().length).toBeGreaterThan(0);

    await act(() => setParentScrollEnabled(false));

    expectSearchStillOpen();
    expect(getText('location-hotel-mount-id')).toBe('location-hotel-1');
    expectAllPageScrollEnabled(false);

    await act(() => setParentScrollEnabled(true));

    expectSearchStillOpen();
    expectAllPageScrollEnabled(true);
    await unmount();
  });

  it('gains real scroll capability when scrollEnabled goes from false to true without remounting', async () => {
    let setParentScrollEnabled: (next: boolean) => void = () => undefined;

    const Harness = () => {
      const [isScrollEnabled, setIsScrollEnabled] = useState(false);
      setParentScrollEnabled = setIsScrollEnabled;

      return (
        <CustomModal
          onClose={jest.fn()}
          scrollEnabled={isScrollEnabled}
          title="CreateHotelWizard"
          visible
        >
          <View key="location_hotel">
            <LocationHotelPage />
          </View>
        </CustomModal>
      );
    };

    const { unmount } = await render(<Harness />, {
      wrapper: ModalLayerTestRoot,
    });

    await fireEvent.press(
      screen.getByTestId('button.create-hotel.address.open'),
    );

    expectAllPageScrollEnabled(false);
    expect(getText('location-hotel-search-state')).toBe('open');

    await act(() => setParentScrollEnabled(true));

    expectSearchStillOpen();
    expectAllPageScrollEnabled(true);
    await unmount();
  });

  it('keeps autoHeight disabled-scroll geometry without keyboard insets or minHeight', async () => {
    const { unmount } = await render(
      <CustomModal
        autoHeight
        onClose={jest.fn()}
        scrollEnabled={false}
        title="Confirm"
        visible
      >
        <View testID="autoheight-page" />
      </CustomModal>,
      { wrapper: ModalLayerTestRoot },
    );

    const [scroll] = pageScrollViews();
    expect(scroll).toBeDefined();
    expect(scroll?.props.scrollEnabled).toBe(false);
    expect(scroll?.props.contentInset).toEqual({
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    });
    expect(scroll?.props.keyboardDismissMode).toBe('none');
    const contentStyle = StyleSheet.flatten(
      scroll?.props.contentContainerStyle,
    );
    expect(contentStyle.flexGrow).toBe(0);
    expect(contentStyle.minHeight).toBeUndefined();
    expect(contentStyle.paddingBottom).toBeUndefined();
    await unmount();
  });
});
