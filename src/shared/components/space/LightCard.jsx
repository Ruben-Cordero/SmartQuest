import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../../config/theme';

/**
 * Tarjeta CLARA para el contenido de lectura de las lecciones (teoría, ejemplos,
 * ejercicios): fondo #F6F7FB con texto #14183A (16:1). Usa colors.onLessonCard
 * como color del texto que pongas dentro.
 */
export default function LightCard({ children, style, testID }) {
  return (
    <View style={[styles.card, style]} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lessonCard,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
});
