import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, layout, radius, spacing, typography } from '../../../config/theme';

// danger (rojo) es SOLO para cancelar o salir.
const VARIANTS = {
  primary: { background: colors.azul, text: colors.crema },
  secondary: { background: colors.ambar, text: colors.tinta },
  danger: { background: colors.rojo, text: colors.crema },
};

/**
 * Botón tipo cartel con efecto 3D: una base oscura de 5 de alto debajo de la cara.
 * Al presionar, la cara baja (translateY) y la base desaparece.
 * Estados: normal, presionado, deshabilitado y cargando.
 */
export default function Button3D({
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
  const fondo = inactivo ? colors.papel : paleta.background;
  const texto = inactivo ? colors.sepia : paleta.text;
  const borde = inactivo ? colors.sepia : colors.tinta;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactivo}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactivo, busy: loading }}
      testID={testID}
      style={[styles.container, style]}
    >
      {({ pressed }) => {
        const hundido = pressed || inactivo;
        return (
          <>
            {!hundido && <View style={styles.base} />}
            <View
              style={[
                styles.face,
                { backgroundColor: fondo, borderColor: borde },
                hundido && styles.faceSunk,
              ]}
            >
              {loading && <ActivityIndicator color={texto} style={styles.spinner} />}
              <Text style={[styles.text, { color: texto }]}>{title}</Text>
            </View>
          </>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Reserva el espacio de la base para que el botón no se superponga al hundirse.
  container: {
    paddingBottom: layout.buttonDepth,
  },
  base: {
    position: 'absolute',
    top: layout.buttonDepth,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: radius.ink,
    backgroundColor: colors.tinta,
  },
  face: {
    minHeight: layout.minTouchSize,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: layout.inkBorder,
    borderRadius: radius.ink,
  },
  faceSunk: {
    transform: [{ translateY: layout.buttonDepth }],
  },
  spinner: {
    marginRight: spacing.sm,
  },
  text: {
    flexShrink: 1,
    fontFamily: fonts.game,
    fontSize: typography.button,
    lineHeight: typography.button * 1.3,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
