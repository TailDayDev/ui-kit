import { KEYBOARD_FOOTER_GAP } from '../CustomModal.constants';

interface IResolveModalFooterBottomPaddingParams {
  grab: number;
  isKeyboardLifted: boolean;
  keyboardOverlap: number;
  safeAreaBottom: number;
}

export const resolveModalFooterBottomPadding = ({
  grab,
  isKeyboardLifted,
  keyboardOverlap,
  safeAreaBottom,
}: IResolveModalFooterBottomPaddingParams): number => {
  if (isKeyboardLifted && keyboardOverlap > 0) {
    return keyboardOverlap + KEYBOARD_FOOTER_GAP;
  }

  return grab + safeAreaBottom;
};
