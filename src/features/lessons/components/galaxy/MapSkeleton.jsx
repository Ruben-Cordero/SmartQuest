// Dueño: Rubén. Esqueleto del mapa mientras carga: tarjeta y planetas en zigzag
// que "respiran" (sin animación con "reducir movimiento").
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { colors, radius, spacing } from '../../../../config/theme';
import { computePathLayout, PATH_LAYOUT } from '../../services/galaxy';

const PLACEHOLDER_PLANETS = 4;

export default function MapSkeleton({ width }) {
  const reduceMotion = useReducedMotion();
  const opacidad = useSharedValue(0.55);

  useEffect(() => {
    if (reduceMotion) {
      cancelAnimation(opacidad);
      opacidad.set(0.55);
      return undefined;
    }
    opacidad.set(
      withRepeat(withTiming(0.25, { duration: 900, easing: Easing.inOut(Easing.sin) }), -1, true),
    );
    return () => cancelAnimation(opacidad);
  }, [reduceMotion, opacidad]);

  const estilo = useAnimatedStyle(() => ({ opacity: opacidad.get() }));
  const { points } = computePathLayout(PLACEHOLDER_PLANETS, width);
  const alto = points[points.length - 1].y + PATH_LAYOUT.planetSize;

  return (
    <View accessible accessibilityRole="progressbar" accessibilityLabel="Loading your galaxy">
      <Animated.View style={estilo}>
        <View style={styles.card} />
        <View style={{ width, height: alto }}>
          {points.map((p) => (
            <View
              key={p.y}
              style={[
                styles.planet,
                {
                  left: p.x - PATH_LAYOUT.planetSize / 2,
                  top: p.y - PATH_LAYOUT.planetSize / 2,
                  width: PATH_LAYOUT.planetSize,
                  height: PATH_LAYOUT.planetSize,
                  borderRadius: PATH_LAYOUT.planetSize / 2,
                },
              ]}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 128,
    marginTop: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  planet: {
    position: 'absolute',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
