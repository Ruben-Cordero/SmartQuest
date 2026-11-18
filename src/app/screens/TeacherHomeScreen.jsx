import { ScrollView, StyleSheet, Text } from 'react-native';

import { colors, fonts, layout, spacing, typography } from '../../config/theme';
import { ScreenTitle, SpaceBackground, SpaceCard } from '../../shared/components/space';
import { useAuth } from '../../shared/context/AuthContext';

export default function TeacherHomeScreen() {
  const { usuario } = useAuth();
  const nombre = usuario?.nombreCompleto || 'teacher';

  return (
    <SpaceBackground seed="dashboard">
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenTitle
          title={`Hi, ${nombre}!`}
          subtitle="Check how your students are doing in English."
        />

        {/* Placeholder: se implementa en src/features/teacher-dashboard */}
        <SpaceCard style={styles.card}>
          <Text style={styles.cardTitle}>Progress tracking</Text>
          <Text style={styles.text}>The progress of your classes will appear here soon.</Text>
        </SpaceCard>
      </ScrollView>
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
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
