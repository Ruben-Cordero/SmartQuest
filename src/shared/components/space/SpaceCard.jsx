import { Pressable, StyleSheet, View } from 'react-native';

import { colors, layout, radius, spacing } from '../../../config/theme';

/**
 * Tarjeta oscura del tema espacial (superficie con borde suave).
 * Con onPress se vuelve tocable: al presionar se oscurece y se achica un poco.
 */
export default function SpaceCard({
  children,
  onPress,
  style,
  accessibilityLabel,
  accessibilityHint,
  testID,
}) {
  if (!onPress) {
    return (
      <View style={[styles.card, style]} testID={testID}>
        {children}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      testID={testID}
      style={({ pressed }) => [styles.card, styles.touchable, style, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  touchable: {
    minHeight: layout.minTouchSize,
  },
  pressed: {
    backgroundColor: colors.surfaceAlt,
    transform: [{ scale: 0.98 }],
  },
});
