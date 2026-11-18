import Ionicons from '@expo/vector-icons/Ionicons';
import { memo, useEffect, useId, useMemo } from 'react';
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
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from 'react-native-svg';

import { colors, spacing } from '../../../config/theme';
import { planetLook } from './planetPalettes';

export const PLANET_STATES = {
  COMPLETED: 'completed',
  CURRENT: 'current',
  LOCKED: 'locked',
};

// Dibujo en un lienzo de 200 x 200 con el planeta en el centro.
const VIEW = 200;
const C = 100;
const R = 52;
const RING_RX = R * 1.75;
const RING_RY = R * 0.42;
const MOON_R = 11;

const GLOW_OPACITY = { completed: 0.45, current: 0.8, locked: 0.14 };
const LOCKED_STOPS = ['#2A3170', '#141A45', '#070A1F'];

function repartirStops(stops) {
  return stops.map((color, i) => ({
    color,
    offset: stops.length > 1 ? i / (stops.length - 1) : 0,
  }));
}

function Feature({ look, id, apagado }) {
  const { palette, feature } = look;
  const opacidad = apagado ? 0.18 : 1;

  if (feature === 'bands') {
    return (
      <G clipPath={`url(#${id}-clip)`} opacity={opacidad}>
        <G rotation={look.bandTilt} origin={`${C}, ${C}`}>
          {look.bands.map((b, i) => (
            <Ellipse
              key={i}
              cx={C}
              cy={b.y}
              rx={R * 1.3}
              ry={b.ry}
              fill={b.light ? palette.accent : palette.detail}
              fillOpacity={b.opacity}
            />
          ))}
        </G>
      </G>
    );
  }

  if (feature === 'craters') {
    return (
      <G clipPath={`url(#${id}-clip)`} opacity={opacidad}>
        {look.craters.map((c, i) => (
          <G key={i}>
            <Circle cx={c.cx} cy={c.cy} r={c.r} fill={palette.detail} fillOpacity={0.35} />
            <Circle
              cx={c.cx - c.r * 0.15}
              cy={c.cy - c.r * 0.15}
              r={c.r}
              fill="none"
              stroke={palette.accent}
              strokeOpacity={0.35}
              strokeWidth={1.5}
            />
          </G>
        ))}
      </G>
    );
  }

  if (feature === 'continents') {
    const tierra = look.paletteName === 'ocean' ? palette.accent : palette.detail;
    return (
      <G clipPath={`url(#${id}-clip)`} opacity={opacidad}>
        {look.continents.map((c, i) => (
          <Ellipse
            key={`c${i}`}
            cx={c.cx}
            cy={c.cy}
            rx={c.rx}
            ry={c.ry}
            rotation={c.rotate}
            origin={`${c.cx}, ${c.cy}`}
            fill={tierra}
            fillOpacity={0.85}
          />
        ))}
        {look.clouds.map((n, i) => (
          <Ellipse
            key={`n${i}`}
            cx={n.cx}
            cy={n.cy}
            rx={n.rx}
            ry={n.ry}
            fill="#FFFFFF"
            fillOpacity={0.55}
          />
        ))}
      </G>
    );
  }

  return null;
}

// Mitad de atrás (arriba) o de adelante (abajo) del anillo inclinado.
function RingHalf({ look, front, apagado }) {
  const sweep = front ? 0 : 1;
  const d = `M ${C - RING_RX} ${C} A ${RING_RX} ${RING_RY} 0 0 ${sweep} ${C + RING_RX} ${C}`;
  const base = front ? 0.95 : 0.35;
  return (
    <G rotation={look.ringTilt} origin={`${C}, ${C}`}>
      <Path
        d={d}
        fill="none"
        stroke={look.palette.ring}
        strokeOpacity={apagado ? base * 0.3 : base}
        strokeWidth={7}
        strokeLinecap="round"
      />
    </G>
  );
}

function PlanetComponent({
  seed,
  index = 0,
  size = 96,
  state = PLANET_STATES.COMPLETED,
  stars = null,
  theme,
  accessibilityLabel,
  style,
}) {
  const look = useMemo(() => planetLook(seed ?? index, theme), [seed, index, theme]);
  const id = `p${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const bloqueado = state === PLANET_STATES.LOCKED;
  const actual = state === PLANET_STATES.CURRENT;
  const { palette, feature } = look;
  const cuerpo = bloqueado ? LOCKED_STOPS : palette.stops;

  // Pulso suave del planeta actual (en el hilo de UI). Sin animación si el usuario
  // activó "reducir movimiento".
  const reduceMotion = useReducedMotion();
  const pulso = useSharedValue(1);
  useEffect(() => {
    if (!actual || reduceMotion) {
      cancelAnimation(pulso);
      pulso.set(1);
      return undefined;
    }
    pulso.set(
      withRepeat(withTiming(1.06, { duration: 1400, easing: Easing.inOut(Easing.sin) }), -1, true),
    );
    return () => cancelAnimation(pulso);
  }, [actual, reduceMotion, pulso]);
  const estiloPulso = useAnimatedStyle(() => ({ transform: [{ scale: pulso.get() }] }));

  const moonX = C + Math.cos(look.moonAngle) * (R + 20);
  const moonY = C + Math.sin(look.moonAngle) * (R + 20);

  return (
    <View
      style={[{ width: size, alignItems: 'center' }, style]}
      accessible={Boolean(accessibilityLabel)}
      accessibilityRole={accessibilityLabel ? 'image' : undefined}
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View style={[{ width: size, height: size }, estiloPulso]}>
        <Svg width={size} height={size} viewBox={`0 0 ${VIEW} ${VIEW}`}>
          <Defs>
            <RadialGradient id={`${id}-body`} cx="38%" cy="32%" r="75%">
              {repartirStops(cuerpo).map((s) => (
                <Stop key={s.offset} offset={s.offset} stopColor={s.color} />
              ))}
            </RadialGradient>
            <RadialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
              <Stop
                offset="0.55"
                stopColor={palette.glow}
                stopOpacity={GLOW_OPACITY[state] ?? 0.45}
              />
              <Stop offset="1" stopColor={palette.glow} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id={`${id}-spec`} cx="34%" cy="28%" r="34%">
              <Stop offset="0" stopColor="#FFFFFF" stopOpacity={bloqueado ? 0.12 : 0.75} />
              <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
            </RadialGradient>
            <LinearGradient id={`${id}-shade`} x1="0.25" y1="0.2" x2="0.95" y2="0.95">
              <Stop offset="0.45" stopColor="#000014" stopOpacity={0} />
              <Stop offset="1" stopColor="#000014" stopOpacity={0.6} />
            </LinearGradient>
            <RadialGradient id={`${id}-moon`} cx="35%" cy="30%" r="80%">
              <Stop offset="0" stopColor={bloqueado ? '#3A4170' : '#E8ECFF'} />
              <Stop offset="1" stopColor={bloqueado ? '#10142F' : '#6A7099'} />
            </RadialGradient>
            <ClipPath id={`${id}-clip`}>
              <Circle cx={C} cy={C} r={R} />
            </ClipPath>
          </Defs>

          {/* Halo de luz del color del planeta */}
          <Circle cx={C} cy={C} r={R * 1.7} fill={`url(#${id}-glow)`} />

          {/* Órbita punteada del planeta actual */}
          {actual && (
            <Circle
              cx={C}
              cy={C}
              r={R + 26}
              fill="none"
              stroke={colors.primary}
              strokeOpacity={0.85}
              strokeWidth={2.5}
              strokeDasharray="3 8"
              strokeLinecap="round"
            />
          )}

          {feature === 'ring' && <RingHalf look={look} front={false} apagado={bloqueado} />}

          {/* Cuerpo: degradado radial; bloqueado = silueta oscura con borde de su color */}
          <Circle
            cx={C}
            cy={C}
            r={R}
            fill={`url(#${id}-body)`}
            stroke={bloqueado ? palette.glow : 'none'}
            strokeOpacity={bloqueado ? 0.55 : 0}
            strokeWidth={2}
          />
          <Feature look={look} id={id} apagado={bloqueado} />
          {/* Sombra del terminador (abajo a la derecha) y brillo especular (arriba a la izquierda) */}
          <Circle cx={C} cy={C} r={R} fill={`url(#${id}-shade)`} />
          <Circle cx={C} cy={C} r={R} fill={`url(#${id}-spec)`} />

          {feature === 'ring' && <RingHalf look={look} front apagado={bloqueado} />}

          {feature === 'moon' && (
            <G>
              <Circle cx={moonX} cy={moonY} r={MOON_R} fill={`url(#${id}-moon)`} />
              <Circle
                cx={moonX}
                cy={moonY}
                r={MOON_R}
                fill="#000014"
                fillOpacity={bloqueado ? 0.3 : 0.15}
              />
            </G>
          )}
        </Svg>

        {bloqueado && (
          <View style={styles.center} pointerEvents="none">
            <Ionicons name="lock-closed" size={size * 0.24} color={colors.text} />
          </View>
        )}
        {state === PLANET_STATES.COMPLETED && !(stars > 0) && (
          <View style={styles.badge} pointerEvents="none">
            <Ionicons
              name="checkmark-circle"
              size={Math.max(18, size * 0.22)}
              color={colors.energy}
            />
          </View>
        )}
      </Animated.View>

      {/* Estrellas (1 a 3) solo si vienen de un resultado real */}
      {state === PLANET_STATES.COMPLETED && stars > 0 && (
        <View style={styles.stars} pointerEvents="none">
          {[1, 2, 3].map((n) => (
            <Ionicons
              key={n}
              name="star"
              size={Math.max(14, size * 0.16)}
              color={n <= stars ? colors.primary : colors.border}
            />
          ))}
        </View>
      )}
    </View>
  );
}

/**
 * Planeta dibujado con SVG, distinto según su semilla.
 * - seed o index: identifican al planeta (misma semilla = mismo aspecto).
 * - size: lado en px. state: "completed" | "current" | "locked".
 * - stars: 1 a 3, solo si vienen de un resultado real del cuestionario.
 * - theme: fuerza una paleta (ocean, lava, amethyst, cyan, emerald, rose).
 * - accessibilityLabel: obligatorio si el planeta se muestra solo (no dentro de un botón).
 */
const Planet = memo(PlanetComponent);
export default Planet;

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: '14%',
    bottom: '14%',
  },
  stars: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: -spacing.xs,
  },
});
