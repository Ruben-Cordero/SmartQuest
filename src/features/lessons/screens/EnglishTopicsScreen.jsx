import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, radius, spacing, typography } from '../../../config/theme';
import Button from '../../../shared/components/Button';
import { ENGLISH_ROUTES } from '../navigation/routes';
import { getUnits } from '../services/lessons';

// Lista de temas (unidades y lecciones) del módulo de Inglés.
// - Arriba: la barra de estado y el notch los cubre el header del stack
//   (si la pantalla se muestra sin header, agrega 'top' a SAFE_AREA_EDGES).
// - Abajo: la lista se desplaza por debajo de la barra de gestos y el
//   paddingBottom suma esa zona segura para que la última lección quede visible.
const SAFE_AREA_EDGES = ['left', 'right'];
const LESSON_TITLE_MAX_LINES = 2;

function ListHeader({ onOpenGlossary }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        <Text style={styles.title} accessibilityRole="header">
          Inglés
        </Text>
        <Text style={styles.subtitle}>Unidades y lecciones</Text>
      </View>
      <Button
        title="Glosario"
        variant="secondary"
        onPress={onOpenGlossary}
        accessibilityLabel="Abrir glosario"
        style={styles.glossaryButton}
      />
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

function UnitHeader({ title }) {
  return (
    <View style={styles.unitHeader}>
      <Text style={styles.unitTitle} accessibilityRole="header">
        {title}
      </Text>
    </View>
  );
}

function LessonSeparator() {
  return <View style={styles.lessonSeparator} />;
}

function LessonRow({ lesson, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Abrir lección ${lesson.title}`}
      testID={`lesson-${lesson.id}`}
      android_ripple={{ color: colors.disabledBackground }}
      style={({ pressed }) => [styles.lesson, pressed && styles.lessonPressed]}
    >
      <Text style={styles.lessonTitle} numberOfLines={LESSON_TITLE_MAX_LINES}>
        {lesson.title}
      </Text>
      <Text style={styles.chevron} importantForAccessibility="no" accessibilityElementsHidden>
        ›
      </Text>
    </Pressable>
  );
}

export default function EnglishTopicsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Cada unidad es una sección; SectionList espera las filas en "data".
  const sections = useMemo(
    () => getUnits().map((unit) => ({ id: unit.id, title: unit.title, data: unit.lessons })),
    [],
  );

  function handleOpenLesson(lessonId) {
    navigation.navigate(ENGLISH_ROUTES.LESSON_DETAIL, { lessonId });
  }

  function handleOpenGlossary() {
    navigation.navigate(ENGLISH_ROUTES.GLOSSARY);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={SAFE_AREA_EDGES}>
      <SectionList
        style={styles.list}
        sections={sections}
        keyExtractor={(lesson) => lesson.id}
        ListHeaderComponent={<ListHeader onOpenGlossary={handleOpenGlossary} />}
        ListEmptyComponent={EmptyList}
        ItemSeparatorComponent={LessonSeparator}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
        renderSectionHeader={({ section }) => <UnitHeader title={section.title} />}
        renderItem={({ item }) => (
          <LessonRow lesson={item} onPress={() => handleOpenLesson(item.id)} />
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
  list: {
    flex: 1,
  },
  // Márgenes laterales uniformes de 16 y ancho máximo para pantallas grandes;
  // sin anchos ni altos fijos, se adapta desde 360 dp.
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  // Título a la izquierda y botón "Glosario" a la derecha; en pantallas
  // muy angostas o con texto grande, el botón baja a la siguiente línea.
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.md,
    borderBottomWidth: layout.borderWidth,
    borderBottomColor: colors.disabledBackground,
  },
  headerText: {
    flexGrow: 1,
    flexShrink: 1,
    marginRight: spacing.md,
  },
  glossaryButton: {
    marginTop: spacing.sm,
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
  // Cabecera de unidad: más grande, en negrita y con más aire arriba que entre lecciones.
  unitHeader: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  unitTitle: {
    fontSize: typography.subtitle,
    fontWeight: typography.weightBold,
    color: colors.text,
  },
  lessonSeparator: {
    height: spacing.sm,
  },
  // Fila de lección: área táctil de al menos 48 de alto; el texto largo ocupa hasta 2 líneas.
  lesson: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: layout.minTouchSize,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  lessonPressed: {
    backgroundColor: colors.disabledBackground,
  },
  lessonTitle: {
    flex: 1,
    flexShrink: 1,
    fontSize: typography.body,
    color: colors.text,
  },
  chevron: {
    fontSize: typography.title,
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
