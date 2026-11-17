import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useMemo, useRef } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, layout, spacing, typography } from '../../../config/theme';
import {
  Button3D,
  InkCard,
  MessageBubble,
  PaperBackground,
  Ribbon,
  TitleBanner,
  useReduceMotion,
} from '../../../shared/components/vintage';
import { ENGLISH_ROUTES } from '../navigation/routes';
import { getUnits } from '../services/lessons';

// Lista de mundos (unidades) y niveles (lecciones) del módulo de Inglés.
// La cabecera del stack cubre la barra de estado y la barra de pestañas cubre
// la zona segura inferior; PaperBackground respeta los laterales.
const LESSON_TITLE_MAX_LINES = 2;

// Encabezado con un botón por mundo para saltar directo a sus niveles.
function ListHeader({ worlds, onSelectWorld }) {
  return (
    <View style={styles.header}>
      <TitleBanner title="Learn" sunburst />
      <Text style={styles.subtitle}>Pick a world and enter a level.</Text>
      {worlds.length > 0 && (
        <View style={styles.worldPicker}>
          {worlds.map((world) => (
            <Button3D
              key={world.id}
              title={`World ${world.number}`}
              variant="secondary"
              onPress={() => onSelectWorld(world.number - 1)}
              accessibilityLabel={`Go to world ${world.number}: ${world.title}`}
              style={styles.worldButton}
            />
          ))}
        </View>
      )}
    </View>
  );
}

function EmptyList() {
  return (
    <MessageBubble style={styles.empty}>
      There are no worlds available yet. Come back soon to start practicing.
    </MessageBubble>
  );
}

// Cinta del mundo: al tocarla, el mundo sube al tope y se ven sus niveles.
function UnitHeader({ number, title, onPress }) {
  return (
    <Ribbon
      text={`WORLD ${number} · ${title}`}
      onPress={onPress}
      accessibilityLabel={`World ${number}: ${title}`}
      accessibilityHint="Shows the levels in this world"
      style={styles.unitHeader}
    />
  );
}

function LessonSeparator() {
  return <View style={styles.lessonSeparator} />;
}

function LessonRow({ lesson, level, onPress }) {
  return (
    <InkCard
      onPress={onPress}
      accessibilityLabel={`Level ${level}: ${lesson.title}`}
      accessibilityHint="Opens the level"
      testID={`lesson-${lesson.id}`}
      contentStyle={styles.lesson}
    >
      <View style={styles.lessonText}>
        <Text style={styles.levelTag}>LEVEL {level}</Text>
        <Text style={styles.lessonTitle} numberOfLines={LESSON_TITLE_MAX_LINES}>
          {lesson.title}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={typography.title}
        color={colors.tinta}
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
    </InkCard>
  );
}

export default function EnglishTopicsScreen() {
  const navigation = useNavigation();
  const listRef = useRef(null);
  const reduceMotion = useReduceMotion();

  // Cada unidad es una sección; SectionList espera las filas en "data".
  const sections = useMemo(
    () =>
      getUnits().map((unit, index) => ({
        id: unit.id,
        number: index + 1,
        title: unit.title,
        data: unit.lessons,
      })),
    [],
  );

  function handleOpenLesson(lessonId) {
    navigation.navigate(ENGLISH_ROUTES.LESSON_DETAIL, { lessonId });
  }

  // Lleva la cinta del mundo al tope de la lista (itemIndex 0 = cabecera de la sección).
  // Sin animación si el usuario activó "reducir movimiento".
  function goToWorld(sectionIndex) {
    listRef.current?.scrollToLocation({
      sectionIndex,
      itemIndex: 0,
      viewOffset: 0,
      animated: reduceMotion === false,
    });
  }

  // Si la sección todavía no se midió, se aproxima y se reintenta una vez.
  function handleScrollToIndexFailed({ index, averageItemLength }) {
    listRef.current?.getScrollResponder()?.scrollTo({
      y: index * averageItemLength,
      animated: false,
    });
  }

  return (
    <PaperBackground>
      <SectionList
        ref={listRef}
        style={styles.list}
        sections={sections}
        keyExtractor={(lesson) => lesson.id}
        ListHeaderComponent={<ListHeader worlds={sections} onSelectWorld={goToWorld} />}
        ListEmptyComponent={EmptyList}
        ItemSeparatorComponent={LessonSeparator}
        stickySectionHeadersEnabled={false}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        contentContainerStyle={styles.content}
        renderSectionHeader={({ section }) => (
          <UnitHeader
            number={section.number}
            title={section.title}
            onPress={() => goToWorld(section.number - 1)}
          />
        )}
        renderItem={({ item, index }) => (
          <LessonRow lesson={item} level={index + 1} onPress={() => handleOpenLesson(item.id)} />
        )}
      />
    </PaperBackground>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  // Márgenes laterales de 16 y ancho máximo para pantallas grandes;
  // sin anchos ni altos fijos, se adapta desde 360 dp.
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  header: {
    paddingBottom: spacing.sm,
  },
  subtitle: {
    marginTop: spacing.ms,
    fontFamily: fonts.detail,
    fontSize: typography.body,
    color: colors.sepia,
    textAlign: 'center',
  },
  // Botones de mundo: dos por fila en un teléfono de 360; bajan de línea si no caben.
  worldPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  worldButton: {
    flexGrow: 1,
    flexBasis: '40%',
  },
  // Cada mundo: cinta con más aire arriba que la separación entre niveles.
  unitHeader: {
    marginTop: spacing.xl,
    marginBottom: spacing.ms,
  },
  lessonSeparator: {
    height: spacing.ms,
  },
  lesson: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonText: {
    flex: 1,
    marginRight: spacing.sm,
  },
  levelTag: {
    fontFamily: fonts.game,
    fontSize: typography.body,
    lineHeight: typography.body * 1.3,
    color: colors.sepia,
    letterSpacing: 0.5,
  },
  lessonTitle: {
    marginTop: spacing.xs,
    fontFamily: fonts.bodyBold,
    fontSize: typography.label,
    lineHeight: typography.label * 1.35,
    color: colors.tinta,
  },
  empty: {
    marginTop: spacing.lg,
  },
});
