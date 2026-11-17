import { Pressable, StyleSheet, View } from 'react-native';

import { colors, layout, radius, spacing } from '../../../config/theme';
import HardShadow from './HardShadow';

const PRESS_OFFSET = layout.shadowOffset / 2;

/**
 * Tarjeta crema con contorno de tinta grueso, radio 14 y sombra dura.
 * Con onPress se vuelve tocable: al presionar se "hunde" hacia su sombra.
 */
export default function InkCard({
  children,
  onPress,
  style,
  contentStyle,
  accessibilityLabel,
  accessibilityHint,
  testID,
}) {
  if (!onPress) {
    return (
      <HardShadow style={style}>
        <View style={[styles.card, contentStyle]} testID={testID}>
          {children}
        </View>
      </HardShadow>
    );
  }

  return (
    <HardShadow style={style}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        testID={testID}
        style={({ pressed }) => [
          styles.card,
          styles.touchable,
          contentStyle,
          pressed && styles.pressed,
        ]}
      >
        {children}
      </Pressable>
    </HardShadow>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.crema,
    borderWidth: layout.inkBorder,
    borderColor: colors.tinta,
    borderRadius: radius.ink,
    padding: spacing.md,
  },
  touchable: {
    minHeight: layout.minTouchSize,
  },
  pressed: {
    backgroundColor: colors.ambar,
    transform: [{ translateX: PRESS_OFFSET }, { translateY: PRESS_OFFSET }],
  },
});
