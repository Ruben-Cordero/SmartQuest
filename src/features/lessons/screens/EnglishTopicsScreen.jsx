import { useMemo } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout, radius, spacing, typography } from '../../../config/theme';
import { getUnits } from '../services/lessons';

// Lista de temas (unidades y lecciones) del módulo de Inglés.
// El borde superior lo cubre el header del stack; si la pantalla se muestra
// sin header, agrega 'top' a SAFE_AREA_EDGES.
const SAFE_AREA_EDGES = ['left', 'right', 'bottom'];

function ListHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title} accessibilityRole="header">
        Inglés
      </Text>
      <Text style={styles.subtitle}>Unidades y lecciones</Text>
    </View>
  );
}

function EmptyList() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>
        Todavía no hay unidades disponibles. Vuelve pronto para empezar a practicar.
      </Text>
    </View>
  );
}

export default function EnglishTopicsScreen() {
  // Cada unidad es una sección; SectionList espera las filas en "data".
  const sections = useMemo(
    () => getUnits().map((unit) => ({ id: unit.id, title: unit.title, data: unit.lessons })),
    [],
  );

  function handleOpenLesson(lessonId) {
    // T16: conectar con LessonDetailScreen
    // navigation.navigate('LessonDetail', { lessonId });
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={SAFE_AREA_EDGES}>
      <SectionList
        sections={sections}
        keyExtractor={(lesson) => lesson.id}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyList}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.content}
        renderSectionHeader={({ section }) => (
          <Text style={styles.unitTitle} accessibilityRole="header">
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleOpenLesson(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`Abrir lección ${item.title}`}
            testID={`lesson-${item.id}`}
            style={({ pressed }) => [styles.lesson, pressed && styles.lessonPressed]}
          >
            <Text style={styles.lessonTitle}>{item.title}</Text>
            <Text style={styles.chevron} importantForAccessibility="no">
              ›
            </Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
  unitTitle: {
    fontSize: typography.subtitle,
    fontWeight: typography.weightBold,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  lesson: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: layout.minTouchSize,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  lessonPressed: {
    opacity: 0.7,
  },
  lessonTitle: {
    flex: 1,
    fontSize: typography.body,
    color: colors.text,
  },
  chevron: {
    fontSize: typography.subtitle,
    color: colors.primary,
    marginLeft: spacing.sm,
  },
  empty: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  emptyText: {
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
