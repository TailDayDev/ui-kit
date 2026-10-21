import { StyleSheet, View } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ModalLayerTestRoot, resetModalLayersForTests } from '../ModalLayer';
import { FiltersSelectionModal } from './FiltersSelectionModal';
import type {
  FilterGroupView,
  FiltersSelectionModalProps,
} from './FiltersSelectionModal.types';

const GROUPS: FilterGroupView[] = [
  {
    key: 'status',
    sectionTitle: 'Status',
    options: [
      { id: 'Current', title: 'Current' },
      { id: 'Past', title: 'Past', imageUrl: '' },
      { id: 'Other', title: 'Other', imageUrl: '   ' },
      {
        id: 'photo',
        title: 'With photo',
        imageUrl: 'https://example.test/real.jpg',
      },
    ],
  },
  {
    key: 'size',
    sectionTitle: 'Size',
    options: [{ id: 1, title: 'Small', rightLabel: 'pets', rightValue: 3 }],
  },
  { key: 'empty', sectionTitle: 'Empty', options: [], emptyMessage: 'None' },
];

const renderModal = (props: Partial<FiltersSelectionModalProps> = {}) => {
  const handlers = {
    onClose: jest.fn(),
    onChange: jest.fn(),
    onApply: jest.fn(),
    onReset: jest.fn(),
  };
  const result = render(
    <FiltersSelectionModal
      visible
      title="Filter"
      groups={GROUPS}
      value={{}}
      resetTitle="Reset"
      applyTitle="Apply"
      {...handlers}
      {...props}
    />,
    { wrapper: ModalLayerTestRoot },
  );
  return { handlers, result };
};

describe('FiltersSelectionModal', () => {
  afterEach(async () => {
    await act(() => {
      resetModalLayersForTests();
    });
  });

  it('renders sections, options, right values and empty messages', async () => {
    const { result } = renderModal();
    await result;

    expect(screen.getByText('Filter')).toBeTruthy();
    expect(screen.getByText('Status')).toBeTruthy();
    expect(screen.getByText('With photo')).toBeTruthy();
    expect(screen.getByText('pets')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
    expect(screen.getByText('None')).toBeTruthy();
    expect(screen.queryByText('Empty')).toBeNull();
  });

  it('renders text-only status rows while retaining a real image for image-backed filters', async () => {
    const renderOptionImage = jest.fn(() => <View testID="option-image" />);
    const { result } = renderModal({ renderOptionImage });
    await result;

    expect(screen.getAllByTestId('option-image')).toHaveLength(1);
    expect(renderOptionImage).toHaveBeenCalledWith(
      expect.objectContaining({ imageUrl: 'https://example.test/real.jpg' }),
      32,
    );
  });

  it('adds and removes an option in its group', async () => {
    const { handlers, result } = renderModal({
      value: { status: ['Current'] },
    });
    await result;

    await fireEvent.press(screen.getByRole('checkbox', { name: 'Past' }));
    expect(handlers.onChange).toHaveBeenLastCalledWith({
      status: ['Current', 'Past'],
    });

    await fireEvent.press(screen.getByRole('checkbox', { name: 'Current' }));
    expect(handlers.onChange).toHaveBeenLastCalledWith({ status: [] });
  });

  it('highlights the selected option', async () => {
    const { result } = renderModal({ value: { size: [1] } });
    await result;

    const selected = screen.getByRole('checkbox', { name: 'Small' });
    expect(selected.props.accessibilityState).toEqual({ checked: true });
    expect(StyleSheet.flatten(selected.props.style)).toMatchObject({
      borderColor: lightTheme.palette.primary,
      backgroundColor: lightTheme.colors.bg.accentSoft,
    });
  });

  it('resets and applies, closing after each', async () => {
    const { handlers, result } = renderModal();
    await result;

    await fireEvent.press(screen.getByRole('button', { name: 'Reset' }));
    expect(handlers.onReset).toHaveBeenCalledTimes(1);
    expect(handlers.onClose).toHaveBeenCalledTimes(1);

    await fireEvent.press(screen.getByRole('button', { name: 'Apply' }));
    expect(handlers.onApply).toHaveBeenCalledTimes(1);
    expect(handlers.onClose).toHaveBeenCalledTimes(2);
  });

  it('uses the modal key for the close button test id', async () => {
    const { handlers, result } = renderModal({ modalKey: 'BookingFilters' });
    await result;

    await fireEvent.press(screen.getByTestId('BookingFilters.close'));
    expect(handlers.onClose).toHaveBeenCalledTimes(1);
  });
});
