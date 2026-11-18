import { StyleSheet, View } from 'react-native';

import { colors, radius } from '../../../config/theme';

const HEIGHT = 10;

/**
 * Barra de progreso. value y max son números (por ejemplo, planetas completados y
 * total). Anuncia el valor a los lectores de pantalla.
 */
export default function ProgressBar({
  value = 0,
  max = 1,
  color = colors.energy,
  accessibilityLabel,
  style,
}) {
  const total = max > 0 ? max : 1;
  const actual = Math.min(Math.max(value, 0), total);
  const porcentaje = (actual / total) * 100;

  return (
    <View
      style={[styles.track, style]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: total, now: actual }}
    >
      <View style={[styles.fill, { width: `${porcentaje}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: HEIGHT,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
  },
});
