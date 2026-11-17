import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, layout, radius, spacing, typography } from '../../../../config/theme';

// Placeholder TEMPORAL hasta que exista screens/LessonDetailScreen.
// Muestra el lessonId recibido para comprobar que la navegación lo pasa bien.
export default function LessonDetailPlaceholder({ route }) {
  const lessonId = route?.params?.lessonId;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title} accessibilityRole="header">
        Detalle de la lección
      </Text>
      <View style={styles.card}>
        <Text style={styles.label}>lessonId recibido</Text>
        <Text style={styles.value} testID="lesson-detail-id">
          {lessonId ?? 'Sin datos'}
        </Text>
      </View>
      <Text style={styles.note}>
        Pantalla provisional: el contenido real llega con LessonDetailScreen.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  title: {
    fontSize: typography.title,
    fontWeight: typography.weightBold,
    color: colors.text,
  },
  card: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  label: {
    fontSize: typography.body,
    color: colors.textMuted,
  },
  value: {
    fontSize: typography.subtitle,
    fontWeight: typography.weightBold,
    color: colors.text,
    marginTop: spacing.xs,
  },
  note: {
    fontSize: typography.body,
    color: colors.textMuted,
    marginTop: spacing.lg,
  },
});
