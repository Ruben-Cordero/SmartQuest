import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, layout, radius, spacing, typography } from '../../../config/theme';
import HardShadow from './HardShadow';
import useReduceMotion from './useReduceMotion';

const TAIL_SIZE = spacing.md;
const START_SCALE = 0.85;

/**
 * Globo de mensaje crema con borde de tinta para avisos cortos (sin personaje).
 * - tone="error": borde rojo e ícono de alerta (el rojo solo se usa para errores).
 * - Al aparecer o cambiar el texto rebota, salvo con "reducir movimiento" activado.
 */
export default function MessageBubble({ children, tone = 'info', style }) {
  const reduceMotion = useReduceMotion();
  const [scale] = useState(() => new Animated.Value(1));
  const esError = tone === 'error';
  const claveAnimacion = typeof children === 'string' ? children : null;

  useEffect(() => {
    if (reduceMotion !== false) return;
    scale.setValue(START_SCALE);
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      tension: 140,
      useNativeDriver: true,
    }).start();
  }, [reduceMotion, scale, claveAnimacion]);

  const borde = esError ? colors.rojo : colors.tinta;

  return (
    <Animated.View
      style={[styles.wrapper, { transform: [{ scale }] }, style]}
      accessibilityRole={esError ? 'alert' : 'text'}
      accessibilityLiveRegion="polite"
    >
      <HardShadow>
        <View style={[styles.bubble, { borderColor: borde }]}>
          {esError && (
            <Ionicons
              name="alert-circle"
              size={typography.title}
              color={colors.rojo}
              style={styles.icon}
              accessibilityElementsHidden
              importantForAccessibility="no"
            />
          )}
          <Text style={styles.text}>{children}</Text>
        </View>
      </HardShadow>
      <View style={[styles.tail, { borderColor: borde }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: TAIL_SIZE / 2,
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.crema,
    borderWidth: layout.inkBorder,
    borderRadius: radius.ink,
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: typography.body,
    lineHeight: typography.body * 1.4,
    color: colors.tinta,
  },
  // Pico del globo: un cuadrado girado con dos bordes de tinta.
  tail: {
    position: 'absolute',
    bottom: 0,
    left: spacing.lg,
    width: TAIL_SIZE,
    height: TAIL_SIZE,
    backgroundColor: colors.crema,
    borderRightWidth: layout.inkBorder,
    borderBottomWidth: layout.inkBorder,
    transform: [{ rotate: '45deg' }],
  },
});
