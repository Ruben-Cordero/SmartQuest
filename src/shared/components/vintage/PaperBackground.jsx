import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '../../../config/theme';

const VIGNETTE_SIZE = spacing.xl * 2;
const VERTICAL = { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } };
const HORIZONTAL = { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } };

/**
 * Fondo de papel envejecido con viñeta suave en los bordes.
 * - edges: bordes de la zona segura a respetar. Por defecto solo los laterales,
 *   porque arriba está la cabecera y abajo la barra de pestañas.
 * - inkTop: línea de tinta arriba (borde inferior de la cabecera azul).
 */
export default function PaperBackground({
  children,
  edges = ['left', 'right'],
  inkTop = true,
  style,
}) {
  const borde = colors.vignette;
  const limpio = colors.vignetteClear;

  return (
    <SafeAreaView edges={edges} style={[styles.root, inkTop && styles.inkTop, style]}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <LinearGradient colors={[borde, limpio]} {...VERTICAL} style={styles.top} />
        <LinearGradient colors={[limpio, borde]} {...VERTICAL} style={styles.bottom} />
        <LinearGradient colors={[borde, limpio]} {...HORIZONTAL} style={styles.left} />
        <LinearGradient colors={[limpio, borde]} {...HORIZONTAL} style={styles.right} />
      </View>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.papel,
  },
  inkTop: {
    borderTopWidth: layout.inkBorder,
    borderTopColor: colors.tinta,
  },
  top: { position: 'absolute', top: 0, left: 0, right: 0, height: VIGNETTE_SIZE },
  bottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: VIGNETTE_SIZE },
  left: { position: 'absolute', top: 0, bottom: 0, left: 0, width: VIGNETTE_SIZE / 2 },
  right: { position: 'absolute', top: 0, bottom: 0, right: 0, width: VIGNETTE_SIZE / 2 },
});
