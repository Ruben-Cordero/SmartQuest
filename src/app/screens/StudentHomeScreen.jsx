import { useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { colors, layout, radius, spacing, typography } from '../../config/theme';
import { useAuth } from '../../shared/context/AuthContext';

export default function StudentHomeScreen() {
  const { usuario } = useAuth();
  const navigation = useNavigation();
  const nombre = usuario?.nombreCompleto || 'estudiante';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.greeting} accessibilityRole="header">
        ¡Hola, {nombre}!
      </Text>
      <Text style={styles.text}>¿Listo para practicar inglés hoy?</Text>

      {/* Acceso a las unidades: se implementa en src/features/lessons */}
      <Pressable
        onPress={() => navigation.navigate('EnglishTopics')}
        accessibilityRole="button"
        accessibilityLabel="Abrir Unidades de Inglés"
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        <Text style={styles.cardTitle}>Unidades de Inglés</Text>
        <Text style={styles.text}>Revisa tus unidades y lecciones.</Text>
        <Text style={styles.cardAction}>Ver unidades ›</Text>
      </Pressable>
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
  card: {
    marginTop: spacing.lg,
    padding: spacing.md,
    minHeight: layout.minTouchSize,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  pressed: {
    opacity: 0.7,
  },
  cardTitle: {
    fontSize: typography.subtitle,
    fontWeight: typography.weightBold,
    color: colors.text,
  },
  cardAction: {
    fontSize: typography.body,
    fontWeight: typography.weightBold,
    color: colors.primary,
    marginTop: spacing.sm,
  },
});
