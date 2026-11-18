// Dueño: Rubén. Tarjeta de la galaxia: "Galaxy X of N", nombre y progreso.
import { StyleSheet, Text } from 'react-native';

import { colors, fonts, spacing, typography } from '../../../../config/theme';
import { ProgressBar, SpaceCard } from '../../../../shared/components/space';

export default function GalaxyCard({ galaxy, totalGalaxies, style }) {
  return (
    <SpaceCard style={style}>
      <Text style={styles.kicker}>
        Galaxy {galaxy.number} of {totalGalaxies}
      </Text>
      <Text style={styles.title} accessibilityRole="header">
        {galaxy.title}
      </Text>
      <ProgressBar
        value={galaxy.completed}
        max={galaxy.total}
        style={styles.bar}
        accessibilityLabel={`${galaxy.completed} of ${galaxy.total} planets completed`}
      />
      <Text style={styles.count}>
        {galaxy.completed} / {galaxy.total} planets completed
      </Text>
    </SpaceCard>
  );
}

const styles = StyleSheet.create({
  kicker: {
    fontFamily: fonts.heading,
    fontSize: typography.label,
    color: colors.primary,
  },
  title: {
    marginTop: spacing.xs,
    fontFamily: fonts.display,
    fontSize: typography.subtitle,
    lineHeight: typography.subtitle * 1.25,
    color: colors.text,
  },
  bar: {
    marginTop: spacing.md,
  },
  count: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.textMuted,
  },
});
