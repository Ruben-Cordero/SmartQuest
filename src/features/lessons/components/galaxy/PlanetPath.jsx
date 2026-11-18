// Dueño: Rubén. Camino de una galaxia: planetas en zigzag unidos por una curva.
// Tramo recorrido = línea dorada sólida; tramo pendiente = línea punteada tenue.
import { memo, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors, fonts, spacing, typography } from '../../../../config/theme';
import { Planet } from '../../../../shared/components/space';
import { computePathLayout, curveThrough, PATH_LAYOUT, PLANET_STATE } from '../../services/galaxy';
import BlackHole from './BlackHole';
import SpaceShip from './SpaceShip';

const STATE_TEXT = {
  [PLANET_STATE.COMPLETED]: 'Completed',
  [PLANET_STATE.CURRENT]: 'Current planet',
  [PLANET_STATE.LOCKED]: 'Locked',
};
const LABEL_MARGIN = spacing.xs;
const SHIP_GAP = 30;

function PlanetNode({ planet, point, width, onOpen }) {
  const actual = planet.state === PLANET_STATE.CURRENT;
  const bloqueado = planet.state === PLANET_STATE.LOCKED;
  const size = actual ? PATH_LAYOUT.currentSize : PATH_LAYOUT.planetSize;
  const labelLeft = Math.min(
    Math.max(point.x - PATH_LAYOUT.labelWidth / 2, LABEL_MARGIN),
    width - PATH_LAYOUT.labelWidth - LABEL_MARGIN,
  );

  return (
    <>
      <Pressable
        onPress={() => onOpen(planet.id)}
        disabled={bloqueado}
        accessibilityRole="button"
        accessibilityLabel={`Planet ${planet.number}: ${planet.title}. ${STATE_TEXT[planet.state]}.`}
        accessibilityHint={
          bloqueado ? 'Complete the previous planets to unlock it.' : 'Opens the planet.'
        }
        accessibilityState={{ disabled: bloqueado }}
        testID={`planet-${planet.id}`}
        style={({ pressed }) => [
          styles.planet,
          { left: point.x - size / 2, top: point.y - size / 2, width: size, height: size },
          pressed && styles.pressed,
        ]}
      >
        <Planet seed={planet.id} size={size} state={planet.state} />
      </Pressable>

      <View
        pointerEvents="none"
        style={[
          styles.label,
          { left: labelLeft, top: point.y + size / 2 + spacing.xs, width: PATH_LAYOUT.labelWidth },
        ]}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <Text style={styles.title} numberOfLines={2}>
          {planet.title}
        </Text>
        <Text style={[styles.state, actual && styles.stateCurrent]}>
          {STATE_TEXT[planet.state]}
        </Text>
      </View>
    </>
  );
}

function PlanetPathComponent({ galaxy, width, onOpenPlanet }) {
  const { points, blackHole, height } = useMemo(
    () => computePathLayout(galaxy.planets.length, width),
    [galaxy.planets.length, width],
  );

  // Hasta dónde llega el tramo recorrido.
  const todoCompletado = galaxy.total > 0 && galaxy.completed === galaxy.total;
  const finRecorrido =
    galaxy.currentIndex >= 0 ? galaxy.currentIndex : todoCompletado ? points.length - 1 : 0;
  const recorrido = curveThrough(points.slice(0, finRecorrido + 1));
  const pendiente = curveThrough([...points.slice(finRecorrido), blackHole]);

  const actual = galaxy.currentIndex >= 0 ? points[galaxy.currentIndex] : null;
  // La nave va del lado contrario al zigzag para no salirse de la pantalla.
  const naveX = actual
    ? actual.x + (actual.side > 0 ? -1 : 1) * (PATH_LAYOUT.currentSize / 2 + SHIP_GAP)
    : 0;

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFill} pointerEvents="none">
        {pendiente ? (
          <Path
            d={pendiente}
            fill="none"
            stroke={colors.textFaint}
            strokeWidth={3}
            strokeDasharray="1 11"
            strokeLinecap="round"
          />
        ) : null}
        {recorrido ? (
          <Path
            d={recorrido}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
            strokeLinecap="round"
          />
        ) : null}
      </Svg>

      {galaxy.planets.map((planet, i) => (
        <PlanetNode
          key={planet.id}
          planet={planet}
          point={points[i]}
          width={width}
          onOpen={onOpenPlanet}
        />
      ))}

      {actual && <SpaceShip x={naveX} y={actual.y - spacing.ms} />}

      <BlackHole x={blackHole.x} y={blackHole.y} width={PATH_LAYOUT.labelWidth} />
    </View>
  );
}

/** Solo se vuelve a dibujar si cambia su galaxia o el ancho disponible. */
const PlanetPath = memo(PlanetPathComponent);
export default PlanetPath;

const styles = StyleSheet.create({
  planet: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    transform: [{ scale: 0.95 }],
  },
  label: {
    position: 'absolute',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: typography.body,
    lineHeight: typography.body * 1.3,
    color: colors.text,
    textAlign: 'center',
  },
  state: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
  stateCurrent: {
    fontFamily: fonts.bodyBold,
    color: colors.primary,
  },
});
