import { ScrollView, StyleSheet, Text } from 'react-native';

import { colors, fonts, layout, spacing, typography } from '../../config/theme';
import { InkCard, PaperBackground, TitleBanner } from '../../shared/components/vintage';
import { useAuth } from '../../shared/context/AuthContext';

export default function TeacherHomeScreen() {
  const { usuario } = useAuth();
  const nombre = usuario?.nombreCompleto || 'teacher';

  return (
    <PaperBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <TitleBanner title="Dashboard" sunburst />

        <Text style={styles.greeting}>Hi, {nombre}!</Text>
        <Text style={styles.text}>Check how your students are doing in English.</Text>

        {/* Placeholder: se implementa en src/features/teacher-dashboard */}
        <InkCard style={styles.card}>
          <Text style={styles.cardTitle}>Progress tracking</Text>
          <Text style={styles.text}>The progress of your classes will appear here soon.</Text>
        </InkCard>
      </ScrollView>
    </PaperBackground>
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
  greeting: {
    marginTop: spacing.lg,
    fontFamily: fonts.bodyBold,
    fontSize: typography.subtitle,
    lineHeight: typography.subtitle * 1.3,
    color: colors.tinta,
  },
  text: {
    fontFamily: fonts.body,
    fontSize: typography.body,
    lineHeight: typography.body * 1.4,
    color: colors.sepia,
    marginTop: spacing.xs,
  },
  card: {
    marginTop: spacing.lg,
  },
  cardTitle: {
    fontFamily: fonts.game,
    fontSize: typography.label,
    lineHeight: typography.label * 1.3,
    color: colors.tinta,
    letterSpacing: 0.5,
  },
});
