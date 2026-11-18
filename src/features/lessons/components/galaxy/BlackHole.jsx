// Dueño: Rubén. "Agujero negro" de repaso final de la galaxia.
// DESACTIVADO: la API no tiene un cuestionario por unidad. Solo es visual hasta
// que la docente agregue ese endpoint.
import { StyleSheet, Text, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Stop,
} from 'react-native-svg';

import { colors, fonts, spacing, typography } from '../../../../config/theme';

const SIZE = 110;

export default function BlackHole({ x, y, width = 168 }) {
  return (
    <View
      style={[styles.root, { left: x - width / 2, top: y - SIZE / 2, width }]}
      accessible
      accessibilityRole="image"
      accessibilityLabel="Final review black hole. Not available yet."
      accessibilityState={{ disabled: true }}
    >
      <Svg width={SIZE} height={SIZE} viewBox="0 0 120 120" style={styles.svg}>
        <Defs>
          <RadialGradient id="bh-glow" cx="50%" cy="50%" r="50%">
            <Stop offset="0.4" stopColor={colors.nebula.morado} stopOpacity={0.55} />
            <Stop offset="1" stopColor={colors.nebula.morado} stopOpacity={0} />
          </RadialGradient>
          <LinearGradient id="bh-disk" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={colors.nebula.rosa} />
            <Stop offset="0.5" stopColor={colors.primary} />
            <Stop offset="1" stopColor={colors.nebula.cian} />
          </LinearGradient>
        </Defs>
        <Circle cx={60} cy={60} r={58} fill="url(#bh-glow)" />
        <G rotation={-18} origin="60, 60">
          <Ellipse
            cx={60}
            cy={60}
            rx={50}
            ry={15}
            fill="none"
            stroke="url(#bh-disk)"
            strokeWidth={6}
          />
        </G>
        <Circle
          cx={60}
          cy={60}
          r={22}
          fill="#02030A"
          stroke={colors.primary}
          strokeOpacity={0.6}
          strokeWidth={1.5}
        />
      </Svg>
      <Text style={styles.title}>Final review</Text>
      <Text style={styles.note}>Not available yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    alignItems: 'center',
  },
  // Solo el dibujo va atenuado (desactivado); el texto mantiene su contraste.
  svg: {
    marginBottom: spacing.xs,
    opacity: 0.6,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: typography.label,
    color: colors.text,
    textAlign: 'center',
  },
  note: {
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
