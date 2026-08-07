import { StyleSheet, Platform } from 'react-native';

export const COLORS = {
  bg: '#1B1F27',
  panel: '#262B35',
  panelInset: '#14171D',
  border: '#3A4150',
  brass: '#C9A24B', // posición correcta ( * )
  brassDim: '#7A6530',
  steel: '#6FA2C0', // dígito correcto, posición incorrecta ( - )
  steelDim: '#3D5666',
  text: '#EDE7D8',
  muted: '#8B93A0',
};

export const FONT_SERIF = Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, serif' });
export const FONT_MONO = Platform.select({ ios: 'Courier New', android: 'monospace', default: "'Courier New', monospace" });

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 16,
    padding: 16,
  },
  panel: {
    width: '100%',
    maxWidth: 384,
    borderRadius: 16,
    padding: 24,
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  instructionsPanel: {
    width: '100%',
    maxWidth: 240,
    borderRadius: 16,
    padding: 20,
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  instructionsTitle: {
    fontSize: 12,
    letterSpacing: 2,
    color: COLORS.muted,
    marginBottom: 12,
    fontFamily: FONT_MONO,
  },
  instructionRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  instructionBullet: {
    width: 16,
    fontSize: 13,
    color: COLORS.muted,
    fontFamily: FONT_MONO,
  },
  instructionText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.text,
  },
  instructionsDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 6,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    letterSpacing: 3,
    fontFamily: FONT_SERIF,
    color: COLORS.text,
  },
  subtitleRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.muted,
    fontFamily: FONT_MONO,
  },
  lengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  lengthLabel: {
    fontSize: 11,
    color: COLORS.muted,
    fontFamily: FONT_MONO,
  },
  lengthOptions: {
    flexDirection: 'row',
    gap: 6,
  },
  lengthOption: {
    width: 26,
    height: 26,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.panelInset,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  lengthOptionActive: {
    backgroundColor: COLORS.brassDim,
    borderColor: COLORS.brass,
  },
  lengthOptionText: {
    fontSize: 12,
    color: COLORS.muted,
    fontFamily: FONT_MONO,
  },
  lengthOptionTextActive: {
    color: COLORS.brass,
  },
  slotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    rowGap: 8,
    marginBottom: 20,
  },
  slot: {
    width: 48,
    height: 56,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.panelInset,
    borderWidth: 1,
  },
  slotText: {
    fontSize: 24,
    color: COLORS.text,
    fontFamily: FONT_MONO,
  },
  slotCursor: {
    fontSize: 24,
    color: COLORS.brass,
    fontFamily: FONT_MONO,
  },
  slotDot: {
    fontSize: 24,
    color: COLORS.border,
  },
  winBox: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: COLORS.panelInset,
    borderWidth: 1,
    borderColor: COLORS.brass,
  },
  winTitle: {
    fontSize: 18,
    color: COLORS.brass,
    fontFamily: FONT_SERIF,
  },
  winSubtitle: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 4,
  },
  keypad: {
    gap: 8,
    marginBottom: 20,
  },
  keypadRow: {
    flexDirection: 'row',
    gap: 8,
  },
  key: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.panelInset,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  keyDisabled: {
    opacity: 0.5,
  },
  keyText: {
    fontSize: 18,
    color: COLORS.text,
    fontFamily: FONT_MONO,
  },
  keyTextDisabled: {
    color: COLORS.border,
  },
  keyIcon: {
    fontSize: 18,
    color: COLORS.muted,
  },
  resetButton: {
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: COLORS.brassDim,
    borderWidth: 1,
    borderColor: COLORS.brass,
  },
  resetButtonText: {
    color: COLORS.brass,
    fontFamily: FONT_MONO,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  historyLabel: {
    fontSize: 12,
    color: COLORS.muted,
    letterSpacing: 1,
  },
  historyBox: {
    maxHeight: 192,
    borderRadius: 10,
    backgroundColor: COLORS.panelInset,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  historyBoxContent: {
    padding: 8,
    gap: 4,
  },
  historyEmpty: {
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 12,
    color: COLORS.muted,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  historyRowLatest: {
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  historyIndex: {
    fontSize: 12,
    color: COLORS.muted,
  },
  historyGuess: {
    fontSize: 16,
    letterSpacing: 3,
    color: COLORS.text,
    fontFamily: FONT_MONO,
  },
  historyFeedback: {
    fontSize: 14,
    minWidth: 56,
    textAlign: 'right',
  },
});
