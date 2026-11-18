import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { ReduceMotion, ZoomIn } from 'react-native-reanimated';

import { colors, fonts, layout, radius, spacing, typography } from '../../../config/theme';

const TAIL_SIZE = spacing.md;

// Entrada con rebote corta. ReduceMotion.System la desactiva si el usuario
// activó "reducir movimiento" en su teléfono.
const ENTRADA = ZoomIn.springify().damping(14).reduceMotion(ReduceMotion.System);

/**
 * Globo de mensaje para avisos cortos (sin personaje).
 * - tone="error": borde e ícono en color peligro (solo para errores).
 * - Rebota al aparecer y cada vez que cambia el texto.
 */
export default function MessageBubble({ children, tone = 'info', style }) {
  const esError = tone === 'error';
  const borde = esError ? colors.danger : colors.border;
  const clave = typeof children === 'string' ? children : 'bubble';

  return (
    <Animated.View
      key={clave}
      entering={ENTRADA}
      style={[styles.wrapper, style]}
      accessibilityRole={esError ? 'alert' : 'text'}
      accessibilityLiveRegion="polite"
    >
      <View style={[styles.bubble, { borderColor: borde }]}>
        <Ionicons
          name={esError ? 'alert-circle' : 'sparkles'}
          size={typography.title}
          color={esError ? colors.danger : colors.primary}
          style={styles.icon}
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
        <Text style={styles.text}>{children}</Text>
      </View>
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
    backgroundColor: colors.surface,
    borderWidth: layout.borderWidth + 1,
    borderRadius: radius.lg,
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: typography.body,
    lineHeight: typography.body * 1.4,
    color: colors.text,
  },
  // Pico del globo: un cuadrado girado con dos bordes.
  tail: {
    position: 'absolute',
    bottom: 0,
    left: spacing.lg,
    width: TAIL_SIZE,
    height: TAIL_SIZE,
    backgroundColor: colors.surface,
    borderRightWidth: layout.borderWidth + 1,
    borderBottomWidth: layout.borderWidth + 1,
    transform: [{ rotate: '45deg' }],
  },
});
