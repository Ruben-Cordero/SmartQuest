import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, layout, radius, spacing, typography } from '../../../config/theme';

// danger es SOLO para salir o cancelar.
const VARIANTS = {
  primary: { background: colors.primary, text: colors.onPrimary, border: colors.primary },
  secondary: { background: colors.surfaceAlt, text: colors.text, border: colors.textMuted },
  danger: { background: colors.danger, text: colors.onPrimary, border: colors.danger },
};

/**
 * Botón del tema espacial. Variantes: primary (dorado, para la acción principal),
 * secondary y danger. Estados: normal, presionado, deshabilitado y cargando.
 * Alto mínimo de 52 (≥ 44 px pedido por el diseño).
 */
export default function SpaceButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  accessibilityLabel,
  accessibilityHint,
  style,
  testID,
}) {
  const inactivo = disabled || loading;
  const paleta = VARIANTS[variant] ?? VARIANTS.primary;
  const fondo = inactivo ? colors.surfaceAlt : paleta.background;
  const texto = inactivo ? colors.textMuted : paleta.text;
  const borde = inactivo ? colors.border : paleta.border;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactivo}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactivo, busy: loading }}
      testID={testID}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: fondo, borderColor: borde },
        pressed && !inactivo && styles.pressed,
        style,
      ]}
    >
      <View style={styles.content}>
        {loading && <ActivityIndicator color={texto} style={styles.spinner} />}
        <Text style={[styles.text, { color: texto }]}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: layout.minTouchSize + 4,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: layout.borderWidth,
    borderRadius: radius.pill,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginRight: spacing.sm,
  },
  text: {
    flexShrink: 1,
    fontFamily: fonts.heading,
    fontSize: typography.button,
    textAlign: 'center',
  },
});
