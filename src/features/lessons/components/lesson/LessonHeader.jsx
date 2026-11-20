// Dueña: Estrella (T09). Encabezado de la lección: galaxia (unidad) y título.
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, layout, spacing, typography } from '../../../../config/theme';
import { SpaceCard } from '../../../../shared/components/space';

export default function LessonHeader({ unitTitle, title }) {
  return (
    <SpaceCard style={styles.card}>
      <Text style={styles.unit}>{unitTitle || 'Unknown Galaxy'}</Text>
      <View style={styles.row}>
        <Ionicons name="planet" size={typography.title + 4} color={colors.primary} />
        <Text style={styles.title} accessibilityRole="header" testID="lesson-detail-id">
          {title}
        </Text>
      </View>
    </SpaceCard>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: layout.borderWidth,
    borderColor: colors.primary,
    padding: spacing.lg,
    backgroundColor: colors.surfaceTranslucent,
  },
  unit: {
    fontFamily: fonts.bodyMedium,
    fontSize: typography.small,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    fontFamily: fonts.heading,
    fontSize: typography.title,
    lineHeight: typography.title * 1.2,
    color: colors.text,
  },
});
