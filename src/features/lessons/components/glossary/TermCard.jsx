// Dueño: Liam (T14). Tarjeta de un término del glosario: palabra, pronunciación,
// tiempo verbal, definición, ejemplo y botón para escucharla.
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, layout, radius, spacing, typography } from '../../../../config/theme';
import { SpaceCard } from '../../../../shared/components/space';
import PronunciationButton from '../PronunciationButton';

export default function TermCard({ termino }) {
  const { palabra, pronunciacion, tiempoVerbal, definicion, ejemplo } = termino;

  return (
    <SpaceCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.palabra} accessibilityRole="header">
            {palabra}
          </Text>
          {pronunciacion ? <Text style={styles.pronunciacion}>{pronunciacion}</Text> : null}
        </View>
        <PronunciationButton palabra={palabra} />
      </View>

      {tiempoVerbal ? (
        <View style={styles.etiqueta}>
          <Text style={styles.etiquetaTexto}>{tiempoVerbal}</Text>
        </View>
      ) : null}

      {definicion ? <Text style={styles.definicion}>{definicion}</Text> : null}

      {ejemplo ? (
        <View style={styles.ejemplo}>
          <Text style={styles.ejemploLabel}>Example</Text>
          <Text style={styles.ejemploTexto}>{ejemplo}</Text>
        </View>
      ) : null}
    </SpaceCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.ms,
  },
  title: {
    flex: 1,
  },
  palabra: {
    fontFamily: fonts.display,
    fontSize: typography.title,
    lineHeight: typography.title * 1.2,
    color: colors.primary,
  },
  pronunciacion: {
    marginTop: spacing.xs,
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  etiqueta: {
    alignSelf: 'flex-start',
    borderWidth: layout.borderWidth,
    borderColor: colors.energy,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.ms,
    paddingVertical: spacing.xs,
  },
  etiquetaTexto: {
    fontFamily: fonts.bodyMedium,
    fontSize: typography.small,
    color: colors.energy,
  },
  definicion: {
    fontFamily: fonts.body,
    fontSize: typography.body,
    lineHeight: typography.body * 1.5,
    color: colors.text,
  },
  ejemplo: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    paddingLeft: spacing.ms,
  },
  ejemploLabel: {
    fontFamily: fonts.heading,
    fontSize: typography.small,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ejemploTexto: {
    marginTop: spacing.xs,
    fontFamily: fonts.body,
    fontSize: typography.body,
    lineHeight: typography.body * 1.5,
    color: colors.text,
  },
});
