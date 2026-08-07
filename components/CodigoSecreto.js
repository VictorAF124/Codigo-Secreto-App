import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Platform, ScrollView } from 'react-native';
import styles, { COLORS } from './CodigoSecreto.styles';

const MIN_LENGTH = 3;
const MAX_LENGTH = 6;
const LENGTH_OPTIONS = Array.from({ length: MAX_LENGTH - MIN_LENGTH + 1 }, (_, i) => MIN_LENGTH + i);

function generateSecret(length) {
  const pool = '0123456789'.split('');
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, length);
}

function computeFeedback(secret, guessArr) {
  let bulls = 0;
  let commonDigits = 0;
  guessArr.forEach((d) => {
    if (secret.includes(d)) commonDigits++;
  });
  guessArr.forEach((d, i) => {
    if (secret[i] === d) bulls++;
  });
  return { bulls, cows: commonDigits - bulls };
}

const KEYPAD_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['back', '0', 'ok'],
];

const INSTRUCTIONS = [
  'Adivina el código secreto.',
  'No hay dígitos repetidos.',
  'Elige el tamaño del código secreto.',
  'Tienes intentos ilimitados.',
];

export default function CodigoSecreto() {
  const [codeLength, setCodeLength] = useState(MIN_LENGTH);
  const [secret, setSecret] = useState(() => generateSecret(MIN_LENGTH));
  const [guess, setGuess] = useState('');
  const [history, setHistory] = useState([]);
  const [won, setWon] = useState(false);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(blinkAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [blinkAnim]);

  const triggerShake = useCallback(() => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 1, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -1, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 1, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  }, [shakeAnim]);

  const resetGame = useCallback((length = codeLength) => {
    setSecret(generateSecret(length));
    setGuess('');
    setHistory([]);
    setWon(false);
  }, [codeLength]);

  const selectLength = useCallback(
    (length) => {
      setCodeLength(length);
      resetGame(length);
    },
    [resetGame]
  );

  const pressDigit = useCallback(
    (d) => {
      if (won) return;
      setGuess((g) => {
        if (g.length >= codeLength) return g;
        if (g.includes(d)) return g; // sin repetidos
        return g + d;
      });
    },
    [won, codeLength]
  );

  const pressBackspace = useCallback(() => {
    if (won) return;
    setGuess((g) => g.slice(0, -1));
  }, [won]);

  const pressSubmit = useCallback(() => {
    setGuess((g) => {
      if (won || g.length !== codeLength) {
        triggerShake();
        return g;
      }
      const guessArr = g.split('');
      const { bulls, cows } = computeFeedback(secret, guessArr);
      setHistory((h) => [{ guess: guessArr, bulls, cows }, ...h]);
      if (bulls === codeLength) setWon(true);
      return '';
    });
  }, [won, secret, codeLength, triggerShake]);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return undefined;
    const onKey = (e) => {
      if (e.key >= '0' && e.key <= '9') pressDigit(e.key);
      else if (e.key === 'Backspace') pressBackspace();
      else if (e.key === 'Enter') pressSubmit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pressDigit, pressBackspace, pressSubmit]);

  const shakeTranslate = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-6, 6],
  });

  const slotSize = codeLength <= 4 ? 48 : codeLength <= 6 ? 40 : 32;
  const slotFontSize = codeLength <= 4 ? 24 : codeLength <= 6 ? 20 : 16;
  const slotGap = codeLength <= 6 ? 12 : 8;

  return (
    <View style={styles.screen}>
      <View style={styles.panel}>
        <View style={styles.header}>
          <Text style={styles.title}>CÓDIGO SECRETO</Text>
          <View style={styles.subtitleRow}>
            <Text style={styles.subtitle}>Descifra el código de {codeLength} dígitos</Text>
            <Animated.Text style={[styles.subtitle, { color: COLORS.brass, opacity: blinkAnim }]}> _</Animated.Text>
          </View>
        </View>

        <View style={styles.lengthRow}>
          <Text style={styles.lengthLabel}>Numero dígitos</Text>
          <View style={styles.lengthOptions}>
            {LENGTH_OPTIONS.map((n) => {
              const active = n === codeLength;
              return (
                <TouchableOpacity
                  key={n}
                  style={[styles.lengthOption, active && styles.lengthOptionActive]}
                  onPress={() => selectLength(n)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.lengthOptionText, active && styles.lengthOptionTextActive]}>{n}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Animated.View
          style={[styles.slotsRow, { gap: slotGap, transform: [{ translateX: shakeTranslate }] }]}
        >
          {Array.from({ length: codeLength }, (_, i) => i).map((i) => {
            const filled = guess[i];
            const isCursor = i === guess.length && !won;
            return (
              <View
                key={i}
                style={[
                  styles.slot,
                  { width: slotSize, height: slotSize * 1.17, borderColor: isCursor ? COLORS.brass : COLORS.border },
                ]}
              >
                {filled ? (
                  <Text style={[styles.slotText, { fontSize: slotFontSize }]}>{filled}</Text>
                ) : isCursor ? (
                  <Animated.Text style={[styles.slotCursor, { fontSize: slotFontSize, opacity: blinkAnim }]}>|</Animated.Text>
                ) : (
                  <Text style={[styles.slotDot, { fontSize: slotFontSize }]}>·</Text>
                )}
              </View>
            );
          })}
        </Animated.View>

        {won && (
          <View style={styles.winBox}>
            <Text style={styles.winTitle}>código descifrado</Text>
            <Text style={styles.winSubtitle}>
              {history.length} intento{history.length !== 1 ? 's' : ''} · {secret.join('')}
            </Text>
          </View>
        )}

        {!won ? (
          <View style={styles.keypad}>
            {KEYPAD_ROWS.map((row, ri) => (
              <View key={ri} style={styles.keypadRow}>
                {row.map((key) => {
                  if (key === 'back') {
                    return (
                      <TouchableOpacity key={key} style={styles.key} onPress={pressBackspace} activeOpacity={0.7}>
                        <Text style={styles.keyIcon}>⌫</Text>
                      </TouchableOpacity>
                    );
                  }
                  if (key === 'ok') {
                    const ready = guess.length === codeLength;
                    return (
                      <TouchableOpacity
                        key={key}
                        style={[
                          styles.key,
                          { backgroundColor: ready ? COLORS.brassDim : COLORS.panelInset, borderColor: ready ? COLORS.brass : COLORS.border },
                        ]}
                        onPress={pressSubmit}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.keyIcon, { color: ready ? COLORS.brass : COLORS.muted }]}>✓</Text>
                      </TouchableOpacity>
                    );
                  }
                  const disabled = guess.includes(key) || guess.length >= codeLength;
                  return (
                    <TouchableOpacity
                      key={key}
                      style={[styles.key, disabled && styles.keyDisabled]}
                      onPress={() => pressDigit(key)}
                      disabled={disabled}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.keyText, disabled && styles.keyTextDisabled]}>{key}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        ) : (
          <TouchableOpacity style={styles.resetButton} onPress={() => resetGame()} activeOpacity={0.7}>
            <Text style={styles.resetButtonText}>↺ jugar de nuevo</Text>
          </TouchableOpacity>
        )}

        <View>
          <View style={styles.historyHeader}>
            <Text style={styles.historyLabel}>registro</Text>
            <Text style={styles.historyLabel}>intentos: {history.length}</Text>
          </View>
          <ScrollView style={styles.historyBox} contentContainerStyle={styles.historyBoxContent}>
            {history.length === 0 && <Text style={styles.historyEmpty}>sin intentos todavía</Text>}
            {history.map((h, idx) => (
              <View key={idx} style={[styles.historyRow, idx === 0 && styles.historyRowLatest]}>
                <Text style={styles.historyIndex}>#{history.length - idx}</Text>
                <Text style={styles.historyGuess}>{h.guess.join(' ')}</Text>
                <Text style={styles.historyFeedback}>
                  <Text style={{ color: COLORS.brass }}>{'*'.repeat(h.bulls)}</Text>
                  <Text style={{ color: COLORS.steel }}>{'-'.repeat(h.cows)}</Text>
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.instructionsPanel}>
        <Text style={styles.instructionsTitle}>Instrucciones</Text>
        {INSTRUCTIONS.map((line, idx) => (
          <View key={idx} style={styles.instructionRow}>
            <Text style={styles.instructionBullet}>·</Text>
            <Text style={styles.instructionText}>{line}</Text>
          </View>
        ))}
        <View style={styles.instructionsDivider} />
        <View style={styles.instructionRow}>
          <Text style={[styles.instructionBullet, { color: COLORS.brass }]}>*</Text>
          <Text style={styles.instructionText}>Dígito en la posición correcta</Text>
        </View>
        <View style={styles.instructionRow}>
          <Text style={[styles.instructionBullet, { color: COLORS.steel }]}>-</Text>
          <Text style={styles.instructionText}>Dígito correcto, posición incorrecta</Text>
        </View>
      </View>
    </View>
  );
}
