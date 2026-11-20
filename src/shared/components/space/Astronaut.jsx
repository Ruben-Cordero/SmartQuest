// Astronauta que flota en el espacio y saluda con la mano (pantalla de login).
// Dibujado con SVG (sin imágenes) y animado con Reanimated en el hilo de UI:
// flota con un vaivén suave y mueve el brazo derecho. Con "reducir movimiento"
// activado queda quieto, saludando con el brazo en alto.
import { useEffect, useId } from 'react';
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
  Defs,
  Ellipse,
  Line,
  LinearGradient,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import { colors } from '../../../config/theme';

// Lienzo del dibujo (con margen para la antena y el brazo en movimiento).
const VIEW_BOX = '-10 -10 220 240';
const ASPECT = 240 / 220;
// Hombro derecho (punto de giro del saludo) en % del lienzo.
const SHOULDER_ORIGIN = `${((128 + 10) / 220) * 100}% ${((112 + 10) / 240) * 100}%`;

const SUIT_LIGHT = '#FFFFFF';
const SUIT_SHADE = '#C9D1F0';
const SUIT_LINE = colors.textMuted;
const GEAR = '#AEB8E2';
const BOOTS = '#7E89BD';
const GLOVE = '#E8ECFF';
const LIMB_WIDTH = 22;

const FLOAT_MS = 2600;
const WAVE_MS = 420;
const WAVE_DEGREES = 16;

function SuitGradient({ id }) {
  return (
    <LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <Stop offset="0" stopColor={SUIT_LIGHT} />
      <Stop offset="1" stopColor={SUIT_SHADE} />
    </LinearGradient>
  );
}

// Brazo derecho levantado con el guante abierto (va detrás del cuerpo).
function WavingArm({ id }) {
  return (
    <Svg style={StyleSheet.absoluteFill} viewBox={VIEW_BOX}>
      <Defs>
        <SuitGradient id={`${id}-arm`} />
      </Defs>
      <Line
        x1={128}
        y1={112}
        x2={160}
        y2={70}
        stroke={`url(#${id}-arm)`}
        strokeWidth={LIMB_WIDTH}
        strokeLinecap="round"
      />
      <Circle cx={163} cy={62} r={12} fill={GLOVE} stroke={SUIT_LINE} strokeWidth={1.5} />
      <Circle cx={154} cy={58} r={5} fill={GLOVE} stroke={SUIT_LINE} strokeWidth={1.5} />
    </Svg>
  );
}

function Body({ id }) {
  const suit = `url(#${id}-suit)`;
  return (
    <Svg style={StyleSheet.absoluteFill} viewBox={VIEW_BOX}>
      <Defs>
        <SuitGradient id={`${id}-suit`} />
        <RadialGradient id={`${id}-helmet`} cx="38%" cy="32%" r="75%">
          <Stop offset="0" stopColor={SUIT_LIGHT} />
          <Stop offset="1" stopColor="#C3CCEF" />
        </RadialGradient>
        <LinearGradient id={`${id}-visor`} x1="0.2" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor={colors.nebula.cian} />
          <Stop offset="0.55" stopColor="#2A44D6" />
          <Stop offset="1" stopColor={colors.background} />
        </LinearGradient>
        <RadialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <Stop offset="0.5" stopColor={colors.nebula.cian} stopOpacity={0.3} />
          <Stop offset="1" stopColor={colors.nebula.cian} stopOpacity={0} />
        </RadialGradient>
      </Defs>

      {/* Halo de luz */}
      <Circle cx={100} cy={115} r={105} fill={`url(#${id}-glow)`} />

      {/* Mochila */}
      <Rect
        x={56}
        y={92}
        width={88}
        height={76}
        rx={18}
        fill={GEAR}
        stroke="#8C97C9"
        strokeWidth={1.5}
      />

      {/* Piernas y botas */}
      <Line
        x1={86}
        y1={160}
        x2={82}
        y2={192}
        stroke={suit}
        strokeWidth={LIMB_WIDTH}
        strokeLinecap="round"
      />
      <Line
        x1={114}
        y1={160}
        x2={120}
        y2={190}
        stroke={suit}
        strokeWidth={LIMB_WIDTH}
        strokeLinecap="round"
      />
      <Rect x={66} y={190} width={30} height={16} rx={8} fill={BOOTS} />
      <Rect x={106} y={188} width={30} height={16} rx={8} fill={BOOTS} />

      {/* Brazo izquierdo (abajo) */}
      <Line
        x1={70}
        y1={112}
        x2={50}
        y2={146}
        stroke={suit}
        strokeWidth={LIMB_WIDTH}
        strokeLinecap="round"
      />
      <Circle cx={47} cy={152} r={12} fill={GLOVE} stroke={SUIT_LINE} strokeWidth={1.5} />

      {/* Torso con cinturón y panel de control */}
      <Rect
        x={66}
        y={96}
        width={68}
        height={76}
        rx={26}
        fill={suit}
        stroke={SUIT_LINE}
        strokeWidth={1.5}
      />
      <Rect x={66} y={148} width={68} height={8} fill="#C3CCEF" />
      <Rect x={83} y={116} width={34} height={22} rx={6} fill="#2A3170" />
      <Circle cx={92} cy={127} r={3.5} fill={colors.primary} />
      <Circle cx={100} cy={127} r={3.5} fill={colors.energy} />
      <Circle cx={108} cy={127} r={3.5} fill={colors.nebula.cian} />

      {/* Antena */}
      <Line
        x1={128}
        y1={28}
        x2={138}
        y2={10}
        stroke="#C3CCEF"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Circle cx={139} cy={8} r={5} fill={colors.primary} />

      {/* Casco con visor y reflejos */}
      <Rect x={50} y={52} width={10} height={24} rx={5} fill={GEAR} />
      <Rect x={140} y={52} width={10} height={24} rx={5} fill={GEAR} />
      <Circle
        cx={100}
        cy={62}
        r={44}
        fill={`url(#${id}-helmet)`}
        stroke={SUIT_LINE}
        strokeWidth={1.5}
      />
      <Ellipse cx={100} cy={66} rx={32} ry={27} fill={`url(#${id}-visor)`} />
      <Ellipse
        cx={87}
        cy={54}
        rx={10}
        ry={5}
        rotation={-25}
        origin="87, 54"
        fill={SUIT_LIGHT}
        fillOpacity={0.65}
      />
      <Circle cx={112} cy={78} r={2.5} fill={SUIT_LIGHT} fillOpacity={0.5} />
      <Circle cx={118} cy={72} r={1.5} fill={colors.primary} fillOpacity={0.8} />
    </Svg>
  );
}

/**
 * Astronauta decorativo que saluda. size = ancho en px (el alto es proporcional).
 * Es decorativo: los lectores de pantalla lo ignoran (el saludo va en el texto).
 */
export default function Astronaut({ size = 140, style }) {
  const id = `astro${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const reduceMotion = useReducedMotion();
  const flotar = useSharedValue(0);
  const saludo = useSharedValue(0);

  useEffect(() => {
    if (reduceMotion) {
      cancelAnimation(flotar);
      cancelAnimation(saludo);
      flotar.set(0);
      saludo.set(0);
      return undefined;
    }
    flotar.set(
      withRepeat(withTiming(1, { duration: FLOAT_MS, easing: Easing.inOut(Easing.sin) }), -1, true),
    );
    saludo.set(-1);
    saludo.set(
      withRepeat(withTiming(1, { duration: WAVE_MS, easing: Easing.inOut(Easing.quad) }), -1, true),
    );
    return () => {
      cancelAnimation(flotar);
      cancelAnimation(saludo);
    };
  }, [reduceMotion, flotar, saludo]);

  // Flota hacia arriba y abajo con una leve inclinación, como en gravedad cero.
  const estiloFlotar = useAnimatedStyle(() => {
    const t = flotar.get();
    return {
      transform: [{ translateY: -8 + t * 16 }, { rotate: `${-4 + t * 8}deg` }],
    };
  });

  // El brazo gira desde el hombro de un lado a otro: el saludo.
  const estiloSaludo = useAnimatedStyle(() => ({
    transform: [{ rotate: `${saludo.get() * WAVE_DEGREES}deg` }],
  }));

  return (
    <View
      style={[{ width: size, height: size * ASPECT }, style]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
    >
      <Animated.View style={[StyleSheet.absoluteFill, estiloFlotar]}>
        <Animated.View
          style={[StyleSheet.absoluteFill, { transformOrigin: SHOULDER_ORIGIN }, estiloSaludo]}
        >
          <WavingArm id={id} />
        </Animated.View>
        <Body id={id} />
      </Animated.View>
    </View>
  );
}
