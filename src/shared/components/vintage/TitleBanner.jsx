import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { colors, fonts, layout, radius, spacing, typography } from '../../../config/theme';
import HardShadow from './HardShadow';

// React Native no tiene text-stroke: el contorno se simula con 8 copias del texto
// en tinta desplazadas alrededor, más una copia extra como sombra dura.
const OUTLINE = 2;
const OUTLINE_OFFSETS = [
  [-OUTLINE, -OUTLINE],
  [0, -OUTLINE],
  [OUTLINE, -OUTLINE],
  [-OUTLINE, 0],
  [OUTLINE, 0],
  [-OUTLINE, OUTLINE],
  [0, OUTLINE],
  [OUTLINE, OUTLINE],
];
const TEXT_SHADOW_OFFSET = 4;
// Evita que un título decorativo muy agrandado por accesibilidad se corte.
const MAX_FONT_SCALE = 1.3;

const RAY_COUNT = 18;
const RAY_LENGTH = 400;

// Rayos de sol alternados (ámbar y crema) que salen del centro.
function Sunburst() {
  const paso = (2 * Math.PI) / RAY_COUNT;
  const rayos = [];
  for (let i = 0; i < RAY_COUNT; i += 2) {
    const a1 = i * paso;
    const a2 = (i + 1) * paso;
    const x1 = (RAY_LENGTH * Math.cos(a1)).toFixed(1);
    const y1 = (RAY_LENGTH * Math.sin(a1)).toFixed(1);
    const x2 = (RAY_LENGTH * Math.cos(a2)).toFixed(1);
    const y2 = (RAY_LENGTH * Math.sin(a2)).toFixed(1);
    rayos.push(<Path key={i} d={`M0 0 L${x1} ${y1} L${x2} ${y2} Z`} fill={colors.crema} />);
  }

  // Decorativo: encima de la caja (no decide su tamaño) y sin recibir toques.
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg
        style={StyleSheet.absoluteFill}
        viewBox="-100 -60 200 120"
        preserveAspectRatio="xMidYMid slice"
      >
        <Rect x="-200" y="-200" width="400" height="400" fill={colors.ambar} />
        {rayos}
      </Svg>
    </View>
  );
}

function OutlinedTitle({ title, color, size }) {
  const textStyle = [styles.text, { fontSize: size, lineHeight: size * 1.3 }];
  const capaOculta = {
    accessibilityElementsHidden: true,
    importantForAccessibility: 'no-hide-descendants',
    maxFontSizeMultiplier: MAX_FONT_SCALE,
  };

  return (
    <View pointerEvents="none">
      <Text
        {...capaOculta}
        style={[
          textStyle,
          styles.layer,
          {
            color: colors.tinta,
            transform: [{ translateX: TEXT_SHADOW_OFFSET }, { translateY: TEXT_SHADOW_OFFSET }],
          },
        ]}
      >
        {title}
      </Text>
      {OUTLINE_OFFSETS.map(([x, y]) => (
        <Text
          key={`${x},${y}`}
          {...capaOculta}
          style={[
            textStyle,
            styles.layer,
            { color: colors.tinta, transform: [{ translateX: x }, { translateY: y }] },
          ]}
        >
          {title}
        </Text>
      ))}
      <Text
        accessibilityRole="header"
        maxFontSizeMultiplier={MAX_FONT_SCALE}
        style={[textStyle, { color }]}
      >
        {title}
      </Text>
    </View>
  );
}

/**
 * Título de póster en Ultra con contorno de tinta.
 * - sunburst: rayos de sol detrás, en un cartel con borde de tinta y sombra dura.
 * - color: relleno de las letras (crema por defecto).
 */
export default function TitleBanner({
  title,
  sunburst = false,
  color = colors.crema,
  size = typography.display,
  style,
}) {
  if (!sunburst) {
    return (
      <View style={[styles.plain, style]}>
        <OutlinedTitle title={title} color={color} size={size} />
      </View>
    );
  }

  return (
    <HardShadow style={style}>
      <View style={styles.banner}>
        <Sunburst />
        <OutlinedTitle title={title} color={color} size={size} />
      </View>
    </HardShadow>
  );
}

const styles = StyleSheet.create({
  plain: {
    paddingVertical: spacing.sm,
    paddingRight: TEXT_SHADOW_OFFSET,
  },
  banner: {
    overflow: 'hidden',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderWidth: layout.inkBorder,
    borderColor: colors.tinta,
    borderRadius: radius.ink,
    backgroundColor: colors.ambar,
  },
  text: {
    fontFamily: fonts.display,
    textAlign: 'center',
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
