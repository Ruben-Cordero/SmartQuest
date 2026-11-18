import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, SectionList, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, layout, radius, spacing, typography } from '../../../config/theme';
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
import { getContenidoIngles } from '../services/inglesApi';
import { LESSON_STATUS, normalizeUnits } from '../services/lessons';

// Lista de mundos (unidades) y niveles (lecciones) del módulo de Inglés, desde
// GET /contenidos/ingles. La pantalla nunca llama a fetch ni a axios directamente.
// La cabecera del stack cubre la barra de estado y la barra de pestañas cubre
// la zona segura inferior; PaperBackground respeta los laterales.
const LESSON_TITLE_MAX_LINES = 2;
const LOAD_STATE = { LOADING: 'loading', READY: 'ready', ERROR: 'error' };

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

// Lo que se ve cuando no hay secciones: cargando, error con "Retry" o lista vacía.
function ListStatus({ loadState, errorMessage, onRetry }) {
  if (loadState === LOAD_STATE.LOADING) {
    return (
      <View style={styles.status}>
        <ActivityIndicator
          size="large"
          color={colors.azul}
          accessibilityRole="progressbar"
          accessibilityLabel="Loading lessons"
        />
        <Text style={styles.statusText}>Loading lessons...</Text>
      </View>
    );
  }

  if (loadState === LOAD_STATE.ERROR) {
    return (
      <View style={styles.status}>
        <MessageBubble tone="error">{errorMessage}</MessageBubble>
        <Button3D title="Retry" onPress={onRetry} style={styles.retry} />
      </View>
    );
  }

  return <MessageBubble style={styles.status}>There are no lessons available yet.</MessageBubble>;
}

// Etiqueta de estado: STUDIED en verde (acierto) o PENDING neutra. Nunca rojo.
// El texto va en tinta o sepia para cumplir 4.5:1; el verde se usa en borde e ícono.
function StatusTag({ status }) {
  const estudiado = status === LESSON_STATUS.STUDIED;
  return (
    <View style={[styles.tag, estudiado ? styles.tagStudied : styles.tagPending]}>
      <Ionicons
        name={estudiado ? 'checkmark-circle' : 'ellipse-outline'}
        size={typography.body}
        color={estudiado ? colors.verde : colors.sepia}
        style={styles.tagIcon}
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
      <Text style={[styles.tagText, !estudiado && styles.tagTextPending]}>
        {estudiado ? 'STUDIED' : 'PENDING'}
      </Text>
    </View>
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
  const estado = lesson.status === LESSON_STATUS.STUDIED ? 'studied' : 'pending';
  return (
    <InkCard
      onPress={onPress}
      accessibilityLabel={`Level ${level}: ${lesson.title}, ${estado}`}
      accessibilityHint="Opens the level"
      testID={`lesson-${lesson.id}`}
      contentStyle={styles.lesson}
    >
      <View style={styles.lessonText}>
        <Text style={styles.levelTag}>LEVEL {level}</Text>
        <Text style={styles.lessonTitle} numberOfLines={LESSON_TITLE_MAX_LINES}>
          {lesson.title}
        </Text>
        <StatusTag status={lesson.status} />
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
  const [units, setUnits] = useState([]);
  const [loadState, setLoadState] = useState(LOAD_STATE.LOADING);
  const [errorMessage, setErrorMessage] = useState('');
  // Cambiarlo vuelve a disparar la carga (botón "Retry").
  const [attempt, setAttempt] = useState(0);

  // Al montar (y en cada reintento) se piden las unidades a la API. Un 401 no se
  // maneja aquí: la base no tiene un flujo global para eso, así que solo se
  // muestra el mensaje de la API.
  useEffect(() => {
    let activo = true;

    async function cargar() {
      try {
        const contenido = await getContenidoIngles();
        if (!activo) return;
        setUnits(normalizeUnits(contenido));
        setLoadState(LOAD_STATE.READY);
      } catch (error) {
        if (!activo) return;
        setUnits([]);
        setErrorMessage(error?.message || 'Could not load the lessons. Please try again.');
        setLoadState(LOAD_STATE.ERROR);
      }
    }

    cargar();
    return () => {
      activo = false;
    };
  }, [attempt]);

  function handleRetry() {
    setLoadState(LOAD_STATE.LOADING);
    setAttempt((n) => n + 1);
  }

  // Cada unidad es una sección; SectionList espera las filas en "data".
  // Las unidades sin lecciones no se muestran como sección vacía.
  const sections = useMemo(
    () =>
      units
        .filter((unit) => unit.lessons.length > 0)
        .map((unit, index) => ({
          id: unit.id,
          number: index + 1,
          title: unit.title,
          data: unit.lessons,
        })),
    [units],
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
        ListEmptyComponent={
          <ListStatus loadState={loadState} errorMessage={errorMessage} onRetry={handleRetry} />
        }
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
  status: {
    marginTop: spacing.lg,
  },
  statusText: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.sepia,
    textAlign: 'center',
  },
  retry: {
    marginTop: spacing.md,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderWidth: layout.inkBorder - 1,
    borderRadius: radius.sm,
    backgroundColor: colors.papel,
  },
  tagStudied: {
    borderColor: colors.verde,
  },
  tagPending: {
    borderColor: colors.sepia,
  },
  tagIcon: {
    marginRight: spacing.xs,
  },
  tagText: {
    fontFamily: fonts.game,
    fontSize: typography.body,
    lineHeight: typography.body * 1.3,
    color: colors.tinta,
    letterSpacing: 0.5,
  },
  tagTextPending: {
    color: colors.sepia,
  },
});
