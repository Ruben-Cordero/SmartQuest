// Dueño: Liam (T12).
// Muestra los ejemplos de una lección (una línea por ejemplo) en una LightCard con
// una etiqueta; si el ejemplo viene vacío o null, no muestra nada.
// Lo usa LessonDetailScreen (Estrella): <LessonExample ejemplo={leccion.ejemplo} />
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing, typography } from '../../../config/theme';
import { LightCard } from '../../../shared/components/space';

/** Convierte el ejemplo de la API en una lista de líneas sin espacios sobrantes. */
export function separarEjemplos(ejemplo) {
  if (typeof ejemplo !== 'string') {
    return [];
  }
  return ejemplo
    .split(/\r?\n/)
    .map((linea) => linea.trim())
    .filter((linea) => linea !== '');
}

export default function LessonExample({ ejemplo, titulo = 'Example', style, testID }) {
  const lineas = separarEjemplos(ejemplo);

  if (lineas.length === 0) {
    return null;
  }

  return (
    <LightCard style={[styles.card, style]} testID={testID ?? 'lesson-example'}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="bulb" size={16} color={colors.onPrimary} />
          <Text style={styles.badgeText} accessibilityRole="header">
            {titulo}
          </Text>
        </View>
      </View>

      <View style={styles.lista} accessible accessibilityLabel={`${titulo}: ${lineas.join('. ')}`}>
        {lineas.map((linea, index) => (
          <View key={`${index}-${linea}`} style={styles.fila}>
            <View style={styles.marca} />
            <Text style={styles.text}>{linea}</Text>
          </View>
        ))}
      </View>
    </LightCard>
  );
}

const styles = StyleSheet.create({
  card: {
    // Borde dorado a la izquierda: lo distingue de la tarjeta de teoría.
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    marginBottom: spacing.ms,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.ms,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    // textoSobreAcento sobre acento: contraste 11.2:1.
    fontFamily: fonts.heading,
    fontSize: typography.small,
    color: colors.onPrimary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  lista: {
    gap: spacing.sm,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.sm,
  },
  marca: {
    width: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.onLessonCard,
    opacity: 0.25,
  },
  text: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: typography.body,
    lineHeight: typography.body * 1.5,
    color: colors.onLessonCard,
  },
});
