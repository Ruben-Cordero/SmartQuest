import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, layout, radius, spacing, typography } from '../../config/theme';

const VARIANTS = {
  primary: { background: colors.primary, text: colors.onPrimary, border: colors.primary },
  secondary: { background: colors.background, text: colors.primary, border: colors.primary },
  danger: { background: colors.danger, text: colors.onPrimary, border: colors.danger },
};

/**
 * Botón reutilizable con estados normal, deshabilitado y cargando.
 * @param {'primary' | 'secondary' | 'danger'} variant
 */
export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  accessibilityLabel,
  style,
}) {
  const inactivo = disabled || loading;
  const paleta = VARIANTS[variant] ?? VARIANTS.primary;
  const fondo = inactivo ? colors.disabledBackground : paleta.background;
  const texto = inactivo ? colors.disabledText : paleta.text;
  const borde = inactivo ? colors.disabledBackground : paleta.border;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactivo}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: inactivo, busy: loading }}
      style={({ pressed }) => [
        styles.base,
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
  base: {
    minHeight: layout.minTouchSize,
    borderRadius: radius.sm,
    borderWidth: layout.borderWidth,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
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
    fontSize: typography.body,
    fontWeight: typography.weightBold,
    textAlign: 'center',
  },
});
