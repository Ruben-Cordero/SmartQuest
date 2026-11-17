import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import { colors, fonts, layout, spacing, typography } from '../../../config/theme';

const TAIL_WIDTH = spacing.lg;

// Punta de la cinta con muesca. El SVG se dibuja encima de la caja (absoluteFill),
// así nunca decide el alto de la cinta, y no recibe toques.
function Tail({ side }) {
  const puntos = side === 'left' ? '0,0 24,0 24,40 0,40 9,20' : '0,0 24,0 15,20 24,40 0,40';
  return (
    <View style={styles.tail} pointerEvents="none">
      <Svg style={StyleSheet.absoluteFill} viewBox="0 0 24 40" preserveAspectRatio="none">
        <Polygon
          points={puntos}
          fill={colors.sepia}
          stroke={colors.tinta}
          strokeWidth={layout.inkBorder}
          vectorEffect="non-scaling-stroke"
        />
      </Svg>
    </View>
  );
}

/**
 * Cinta tipo cartel para subtítulos, por ejemplo "MUNDO 1 · Unit 1: ...".
 * Con onPress se vuelve tocable (área de al menos 48 de alto).
 */
export default function Ribbon({ text, style, onPress, accessibilityLabel, accessibilityHint }) {
  const contenido = (
    <>
      <Tail side="left" />
      <View style={styles.band}>
        <Text style={styles.text} accessibilityRole={onPress ? undefined : 'header'}>
          {text}
        </Text>
      </View>
      <Tail side="right" />
    </>
  );

  if (!onPress) {
    return <View style={[styles.row, style]}>{contenido}</View>;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? text}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [styles.row, styles.touchable, style, pressed && styles.pressed]}
    >
      {contenido}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  touchable: {
    minHeight: layout.minTouchSize,
  },
  pressed: {
    opacity: 0.8,
  },
  tail: {
    width: TAIL_WIDTH,
    marginVertical: spacing.sm,
  },
  band: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.ms,
    paddingVertical: spacing.sm,
    backgroundColor: colors.ambar,
    borderWidth: layout.inkBorder,
    borderColor: colors.tinta,
  },
  text: {
    fontFamily: fonts.game,
    fontSize: typography.label,
    lineHeight: typography.label * 1.3,
    color: colors.tinta,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
