import { memo, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

import { colors } from '../../../config/theme';
import { between, createRandom } from './seededRandom';

// Nebulosas: posición y radio como fracción de la pantalla.
const NEBULAS = [
  { id: 'azul', color: colors.nebula.azul, x: 0.12, y: 0.1, r: 0.6, opacity: 0.32 },
  { id: 'morado', color: colors.nebula.morado, x: 0.95, y: 0.36, r: 0.55, opacity: 0.28 },
  { id: 'rosa', color: colors.nebula.rosa, x: 0.05, y: 0.7, r: 0.5, opacity: 0.18 },
  { id: 'cian', color: colors.nebula.cian, x: 0.9, y: 0.95, r: 0.55, opacity: 0.2 },
];

const STAR_TINTS = [colors.texto, colors.texto, colors.texto, colors.acento, colors.nebula.cian];
const MAX_STARS = 160;
const AREA_PER_STAR = 2600;

function generarEstrellas(seed, width, height) {
  const random = createRandom(seed);
  const total = Math.min(MAX_STARS, Math.round((width * height) / AREA_PER_STAR));
  return Array.from({ length: total }, (_, i) => ({
    key: i,
    cx: random() * width,
    cy: random() * height,
    r: random() < 0.85 ? between(random, 0.5, 1.2) : between(random, 1.3, 2),
    opacity: between(random, 0.35, 1),
    fill: STAR_TINTS[Math.floor(random() * STAR_TINTS.length)],
  }));
}

// Capa decorativa: solo se recalcula si cambia el tamaño o la semilla.
const Sky = memo(function Sky({ width, height, seed }) {
  const estrellas = useMemo(() => generarEstrellas(seed, width, height), [seed, width, height]);
  const mayor = Math.max(width, height);

  return (
    <Svg width={width} height={height}>
      <Defs>
        {NEBULAS.map((n) => (
          <RadialGradient key={n.id} id={`nebula-${n.id}`} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={n.color} stopOpacity={n.opacity} />
            <Stop offset="1" stopColor={n.color} stopOpacity={0} />
          </RadialGradient>
        ))}
      </Defs>
      {NEBULAS.map((n) => (
        <Circle
          key={n.id}
          cx={n.x * width}
          cy={n.y * height}
          r={n.r * mayor}
          fill={`url(#nebula-${n.id})`}
        />
      ))}
      {estrellas.map((s) => (
        <Circle key={s.key} cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} fillOpacity={s.opacity} />
      ))}
    </Svg>
  );
});

/**
 * Fondo espacial: estrellas generadas por código (estables gracias a la semilla)
 * y 4 nebulosas suaves. Envuelve el contenido de la pantalla y respeta la zona segura.
 * - edges: bordes de la zona segura (por defecto laterales; arriba hay cabecera y
 *   abajo la barra de pestañas).
 * - seed: cambia el cielo (por ejemplo, uno distinto por pantalla).
 */
export default function SpaceBackground({
  children,
  edges = ['left', 'right'],
  seed = 'smartquest',
  style,
}) {
  const [size, setSize] = useState(null);

  function handleLayout(event) {
    const { width, height } = event.nativeEvent.layout;
    if (!size || size.width !== width || size.height !== height) {
      setSize({ width, height });
    }
  }

  return (
    <SafeAreaView edges={edges} style={[styles.root, style]}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none" onLayout={handleLayout}>
        {size && <Sky width={size.width} height={size.height} seed={seed} />}
      </View>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
