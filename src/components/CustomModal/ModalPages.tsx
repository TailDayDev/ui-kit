import { Children, isValidElement, type ReactNode, type Ref } from 'react';
import { Animated, ScrollView, View } from 'react-native';

import { layoutStyles, type CustomModalStyles } from './CustomModal.styles';

interface IModalPagesProps {
  pages: ReactNode[];
  pageWidth: number;
  /** Horizontal offset of the page row (page index × width). */
  slideAnim: Animated.Value;
  activeIndex: number;
  styles: CustomModalStyles;
  pageHost: 'scroll-view' | 'view';
  isAutoHeight: boolean;
  contentMaxHeight: number;
  isScrollEnabled: boolean;
  /** Given to the active page's scroll view. */
  scrollRef?: Ref<ScrollView>;
  isKeyboardDismissInteractive: boolean;
  scrollContentPaddingBottom: number;
  scrollContentInsetBottom: number;
}

const resolvePageKey = (page: ReactNode, index: number) =>
  isValidElement(page) && page.key != null ? page.key : index;

/** The pages of a modal: every direct child of `children` is one. */
export const toModalPages = (children: ReactNode): ReactNode[] =>
  Children.toArray(children);

/** The modal's pages side by side; the active one is slid into view. */
export const ModalPages = ({
  pages,
  pageWidth,
  slideAnim,
  activeIndex,
  styles,
  pageHost,
  isAutoHeight,
  contentMaxHeight,
  isScrollEnabled,
  scrollRef,
  isKeyboardDismissInteractive,
  scrollContentPaddingBottom,
  scrollContentInsetBottom,
}: IModalPagesProps) => {
  const scrollInset = {
    bottom: isScrollEnabled ? scrollContentInsetBottom : 0,
    left: 0,
    right: 0,
    top: 0,
  };

  return (
    <Animated.View
      style={[
        layoutStyles.pagesRow,
        {
          width: pageWidth * pages.length,
          transform: [{ translateX: slideAnim }],
        },
        isAutoHeight ? { maxHeight: contentMaxHeight } : layoutStyles.fill,
      ]}
    >
      {pages.map((page, index) => (
        <View key={resolvePageKey(page, index)} style={{ width: pageWidth }}>
          {pageHost === 'view' ? (
            <View
              style={[
                styles.scrollContainer,
                isAutoHeight ? layoutStyles.noGrow : layoutStyles.fill,
              ]}
            >
              {page}
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={[
                styles.scrollContainer,
                isAutoHeight && layoutStyles.noGrow,
                !isScrollEnabled && !isAutoHeight && layoutStyles.fill,
                isScrollEnabled &&
                  scrollContentPaddingBottom > 0 && {
                    minHeight: contentMaxHeight + scrollContentPaddingBottom,
                    paddingBottom: scrollContentPaddingBottom,
                  },
              ]}
              contentInset={scrollInset}
              keyboardDismissMode={
                isScrollEnabled && isKeyboardDismissInteractive
                  ? 'interactive'
                  : 'none'
              }
              keyboardShouldPersistTaps="handled"
              ref={
                isScrollEnabled && index === activeIndex ? scrollRef : undefined
              }
              scrollEnabled={isScrollEnabled}
              scrollIndicatorInsets={scrollInset}
              testID="custom-modal-page-scroll"
            >
              {page}
            </ScrollView>
          )}
        </View>
      ))}
    </Animated.View>
  );
};
