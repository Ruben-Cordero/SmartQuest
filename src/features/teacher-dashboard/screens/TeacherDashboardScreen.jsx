import { ScrollView, StyleSheet, Text } from 'react-native';

import { colors, fonts, spacing, typography } from '../../../config/theme';
import { ScreenTitle, SpaceBackground, SpaceCard } from '../../../shared/components/space';
import { screenContent } from '../../../shared/styles/layout';
import { useAuth } from '../../auth';

// Panel docente (pestaña Dashboard). Por ahora es un marcador: el seguimiento real
// se implementa en esta misma funcionalidad.
export default function TeacherDashboardScreen() {
  const { usuario } = useAuth();
  const nombre = usuario?.nombreCompleto || 'teacher';

  return (
    <SpaceBackground seed="dashboard">
      <ScrollView contentContainerStyle={screenContent}>
        <ScreenTitle
          title={`Hi, ${nombre}!`}
          subtitle="Check how your students are doing in English."
        />

        <SpaceCard style={styles.card}>
          <Text style={styles.cardTitle}>Progress tracking</Text>
          <Text style={styles.text}>The progress of your classes will appear here soon.</Text>
        </SpaceCard>
      </ScrollView>
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.lg,
  },
  cardTitle: {
    fontFamily: fonts.heading,
    fontSize: typography.label,
    color: colors.primary,
  },
  text: {
    marginTop: spacing.xs,
    fontFamily: fonts.body,
    fontSize: typography.body,
    lineHeight: typography.body * 1.4,
    color: colors.textMuted,
  },
});
