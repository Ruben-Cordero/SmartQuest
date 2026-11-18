// Dueño: Rubén. Nave junto al planeta actual, con un vaivén suave (Reanimated).
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '../../../../config/theme';

const SHIP_SIZE = 34;

export default function SpaceShip({ x, y, style }) {
  const reduceMotion = useReducedMotion();
  const vaiven = useSharedValue(0);

  useEffect(() => {
    if (reduceMotion) {
      cancelAnimation(vaiven);
      vaiven.set(0);
      return undefined;
    }
    vaiven.set(
      withRepeat(withTiming(-6, { duration: 1100, easing: Easing.inOut(Easing.sin) }), -1, true),
    );
    return () => cancelAnimation(vaiven);
  }, [reduceMotion, vaiven]);

  const estilo = useAnimatedStyle(() => ({ transform: [{ translateY: vaiven.get() }] }));

  return (
    <Animated.View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        { position: 'absolute', left: x - SHIP_SIZE / 2, top: y - SHIP_SIZE / 2 },
        estilo,
        style,
      ]}
    >
      <Ionicons name="rocket" size={SHIP_SIZE} color={colors.primary} />
    </Animated.View>
  );
}
