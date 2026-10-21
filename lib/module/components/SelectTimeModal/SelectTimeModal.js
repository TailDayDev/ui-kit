"use strict";

import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { Button } from "../Button/index.js";
import { CustomModal } from "../CustomModal/index.js";
import { WheelPicker } from "../WheelPicker/index.js";
import { isValidTime, parseDefaultTime } from "./helpers.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const SELECT_TIME_MODAL_TEST_IDS = {
  save: 'select-time-modal.save',
  reset: 'select-time-modal.reset',
  close: 'select-time-modal.close',
  wheel: 'select-time-modal.wheel'
};

/** App height of the wheel area (off-scale: not in Figma Spacing). */
const PICKER_CONTENT_HEIGHT = 240;

/** Time wheel in a bottom sheet with Reset / Save. */
export const SelectTimeModal = ({
  isVisible,
  onClose,
  onDismissed,
  title,
  defaultTime,
  fallbackTime,
  onSave,
  defaultFormat,
  hourFormat = '24h',
  resetLabel,
  saveLabel,
  isSaving,
  isUnsavedCloseConfirmEnabled,
  onUnsavedCloseRequest,
  nestedOverlays,
  onClear
}) => {
  const styles = useThemedStyles(createStyles);
  const timeMode = hourFormat === '12h' ? '12h' : '24h';
  const hasDefaultTime = isValidTime(defaultTime);

  // defaultFormat belongs to defaultTime; the 24h fallback infers its own.
  const initialSelected = useMemo(() => hasDefaultTime ? parseDefaultTime(defaultTime, defaultFormat, timeMode) : parseDefaultTime(fallbackTime, null, timeMode), [hasDefaultTime, defaultTime, defaultFormat, fallbackTime, timeMode]);
  const [selectedTime, setSelectedTime] = useState(initialSelected);
  const [isClearing, setIsClearing] = useState(false);

  // `title` re-runs the reset when the same sheet opens for another field.
  useEffect(() => {
    if (isVisible) {
      setSelectedTime(initialSelected);
    }
  }, [isVisible, initialSelected, title]);
  const hasChanges = useMemo(() => selectedTime.hour !== initialSelected.hour || selectedTime.minutes !== initialSelected.minutes || selectedTime.format !== initialSelected.format, [selectedTime, initialSelected]);
  const isDisabledSave = hasDefaultTime && !hasChanges;
  const isSavingControlled = isSaving !== undefined;
  const isModalLocked = isSaving === true || isClearing;

  // Close request: refused while locked; with changes the discard
  // confirmation closes it once confirmed.
  const handleCloseRequest = () => {
    if (isModalLocked) {
      return;
    }
    if (isUnsavedCloseConfirmEnabled === false || !hasChanges || !onUnsavedCloseRequest) {
      onClose();
      return;
    }
    onUnsavedCloseRequest(onClose);
  };
  const clearTime = async () => {
    if (!onClear) {
      return true;
    }
    setIsClearing(true);
    try {
      return (await onClear()) !== false;
    } catch {
      return false;
    } finally {
      setIsClearing(false);
    }
  };

  // Reset is two-step: an edited saved time rolls back first; the next press
  // clears it. Without a saved time there is nothing to clear — just close.
  const handleReset = async () => {
    if (isModalLocked) {
      return;
    }
    if (hasDefaultTime && hasChanges) {
      setSelectedTime(initialSelected);
      return;
    }
    if (hasDefaultTime && !(await clearTime())) {
      return;
    }
    onClose();
  };
  const handleSave = () => {
    onSave({
      time: `${selectedTime.hour}:${selectedTime.minutes}`,
      format: timeMode === '12h' ? selectedTime.format : null
    });
    if (!isSavingControlled) {
      onClose();
    }
  };
  return /*#__PURE__*/_jsx(CustomModal, {
    visible: isVisible,
    modalKey: "SelectTimeModal",
    pageHost: "view",
    scrollEnabled: false,
    divider: false,
    onClose: handleCloseRequest,
    onDismissed: onDismissed,
    isLocked: isModalLocked,
    nestedOverlays: nestedOverlays,
    closeButtonTestID: SELECT_TIME_MODAL_TEST_IDS.close,
    autoHeight: true,
    withoutContainerFooter: true,
    title: title,
    footer: /*#__PURE__*/_jsxs(View, {
      style: styles.controlWrapper,
      children: [/*#__PURE__*/_jsx(Button, {
        style: "light",
        onPress: () => {
          void handleReset();
        },
        title: resetLabel,
        disabled: isModalLocked,
        loading: isClearing,
        testID: SELECT_TIME_MODAL_TEST_IDS.reset
      }), /*#__PURE__*/_jsx(Button, {
        onPress: handleSave,
        disabled: isDisabledSave || isModalLocked,
        loading: isSaving === true && !isClearing,
        title: saveLabel,
        testID: SELECT_TIME_MODAL_TEST_IDS.save
      })]
    }),
    children: /*#__PURE__*/_jsx(View, {
      style: styles.modalContent,
      children: /*#__PURE__*/_jsx(WheelPicker, {
        mode: "time",
        hourFormat: timeMode,
        value: selectedTime,
        onChange: setSelectedTime,
        itemTextStyle: styles.pickerItemStyle,
        testID: SELECT_TIME_MODAL_TEST_IDS.wheel
      })
    })
  });
};
const createStyles = theme => StyleSheet.create({
  controlWrapper: {
    borderColor: theme.colors.border.default,
    borderTopWidth: theme.stroke[1],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.space[6],
    paddingTop: theme.space[4],
    width: '100%'
  },
  modalContent: {
    alignItems: 'center',
    height: PICKER_CONTENT_HEIGHT,
    flexShrink: 0,
    justifyContent: 'center',
    marginBottom: 0
  },
  pickerItemStyle: {
    // App: 20pt rows (Figma `title/regular` size).
    fontSize: theme.typography.title.regular.fontSize,
    textAlign: 'center',
    color: theme.colors.text.primary
  }
});
//# sourceMappingURL=SelectTimeModal.js.map