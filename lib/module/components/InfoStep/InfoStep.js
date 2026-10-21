"use strict";

import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Window height taken by the screen around the step (header, pager and buttons
 * of the app intro screen). App value; the image gets what is left.
 */
const SCREEN_CHROME_HEIGHT = 310;
const createStyles = theme => StyleSheet.create({
  bottomContainer: {
    gap: theme.space[2],
    marginBottom: theme.space[8],
    marginTop: theme.space[6]
  },
  centerWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.space[6]
  },
  descriptionWrapper: {
    flex: 1
  }
});

/** Intro step: a square image sized to the free space, then stage, title and description. */
export const InfoStep = ({
  stage,
  title,
  description,
  renderImage
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const window = useWindowDimensions();
  const [bottomHeight, setBottomHeight] = useState(0);

  // Same formula as the app: free height = window − screen chrome − texts − top margin.
  const availableHeight = window.height - SCREEN_CHROME_HEIGHT - bottomHeight - theme.space[6];
  const maxSize = Math.min(availableHeight, window.width - 2 * theme.space[6]);
  const handleBottomLayout = event => {
    setBottomHeight(event.nativeEvent.layout.height);
  };
  return /*#__PURE__*/_jsxs(View, {
    style: styles.contentContainer,
    children: [/*#__PURE__*/_jsx(View, {
      style: [styles.centerWrapper, {
        height: availableHeight
      }],
      children: renderImage(maxSize)
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.bottomContainer,
      onLayout: handleBottomLayout,
      children: [/*#__PURE__*/_jsx(Text, {
        variant: "body/bold",
        children: stage
      }), /*#__PURE__*/_jsx(Text, {
        variant: "largeTitle/semibold",
        children: title
      }), /*#__PURE__*/_jsx(View, {
        style: styles.descriptionWrapper,
        children: /*#__PURE__*/_jsx(Text, {
          variant: "caption/regular",
          color: "secondary",
          children: description
        })
      })]
    })]
  });
};
//# sourceMappingURL=InfoStep.js.map