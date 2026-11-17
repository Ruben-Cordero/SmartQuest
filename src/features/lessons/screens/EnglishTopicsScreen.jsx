import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout, radius, spacing, typography } from '../../../config/theme';

// Lista de temas (unidades y lecciones) del módulo de Inglés.
// El borde superior lo cubre el header del stack; si la pantalla se muestra
// sin header, agrega 'top' a SAFE_AREA_EDGES.
const SAFE_AREA_EDGES = ['left', 'right', 'bottom'];

export default function EnglishTopicsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={SAFE_AREA_EDGES}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} accessibilityRole="header">
            Inglés
          </Text>
          <Text style={styles.subtitle}>Unidades y lecciones</Text>
        </View>

        {/* T07: renderizar aquí las unidades de src/features/lessons/data/lessons.js */}
        <View style={styles.topicsList}>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Aquí aparecerán las unidades.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  header: {
    paddingBottom: spacing.md,
    borderBottomWidth: layout.borderWidth,
    borderBottomColor: colors.disabledBackground,
  },
  title: {
    fontSize: typography.title,
    fontWeight: typography.weightBold,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  topicsList: {
    marginTop: spacing.lg,
  },
  placeholder: {
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  placeholderText: {
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
