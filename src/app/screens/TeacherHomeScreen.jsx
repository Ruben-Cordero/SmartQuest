import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, layout, radius, spacing, typography } from '../../config/theme';
import { useAuth } from '../../shared/context/AuthContext';

export default function TeacherHomeScreen() {
  const { usuario } = useAuth();
  const nombre = usuario?.nombreCompleto || 'docente';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.greeting} accessibilityRole="header">
        ¡Hola, {nombre}!
      </Text>
      <Text style={styles.text}>Revisa el avance de tus estudiantes en inglés.</Text>

      {/* Placeholder: se implementa en src/features/teacher-dashboard */}
      <View style={styles.placeholder}>
        <Text style={styles.placeholderTitle}>Panel de seguimiento</Text>
        <Text style={styles.text}>Muy pronto verás aquí el progreso de tus cursos.</Text>
      </View>
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
  greeting: {
    fontSize: typography.title,
    fontWeight: typography.weightBold,
    color: colors.text,
  },
  text: {
    fontSize: typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  placeholder: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  placeholderTitle: {
    fontSize: typography.subtitle,
    fontWeight: typography.weightBold,
    color: colors.text,
  },
});
