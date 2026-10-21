import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';
import { HEADER_BUTTON_SIZE, HEADER_HEIGHT } from './CustomModal.constants';

const HEADER_BUTTON_RADIUS = HEADER_BUTTON_SIZE / 2;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    backButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      borderRadius: HEADER_BUTTON_RADIUS,
      height: HEADER_BUTTON_SIZE,
      justifyContent: 'center',
      left: theme.space[3],
      position: 'absolute',
      width: HEADER_BUTTON_SIZE,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.overlay.scrim,
    },
    closeButton: { position: 'absolute', right: theme.space[3] },
    container: {
      backgroundColor: theme.colors.bg.surface,
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: theme.radius.xl,
      overflow: 'hidden',
    },
    footer: {
      backgroundColor: theme.colors.bg.surface,
      borderTopColor: theme.colors.border.default,
      borderTopWidth: theme.stroke[1],
      paddingBottom: theme.space[6],
      paddingHorizontal: theme.space[6],
      paddingTop: theme.space[4],
    },
    footerWithoutDivider: { borderTopWidth: 0 },
    footerSurface: {
      backgroundColor: theme.colors.bg.surface,
    },
    header: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.surface,
      flexDirection: 'row',
      gap: theme.space[2],
      height: HEADER_HEIGHT,
      justifyContent: 'center',
      paddingHorizontal: theme.space[3],
      paddingVertical: theme.space[3],
    },
    scrollContainer: { flexGrow: 1 },
    title: {
      ...theme.typography.headline.bold,
      color: theme.colors.text.primary,
      flex: 1,
      marginHorizontal: theme.space[12],
      textAlign: 'center',
    },
  });

export type CustomModalStyles = ReturnType<typeof createStyles>;

/** Layout styles that do not depend on the theme. */
export const layoutStyles = StyleSheet.create({
  fill: { flex: 1 },
  noGrow: { flexGrow: 0 },
  pagesClip: { overflow: 'hidden' },
  pagesRow: { flexDirection: 'row' },
  sheetWrapper: { flex: 1, justifyContent: 'flex-end' },
});
