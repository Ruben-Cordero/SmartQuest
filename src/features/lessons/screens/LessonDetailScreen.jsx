// Dueña: Estrella (T09–T11). Detalle de una lección (planeta): encabezado, teoría,
// ejemplo (LessonExample de Liam) y "marcar como estudiada".
// La carga vive en hooks/useLesson.js y el marcado en hooks/useMarkAsStudied.js.
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing, typography } from '../../../config/theme';
import LoadingState from '../../../shared/components/LoadingState';
import { SpaceBackground, SpaceButton } from '../../../shared/components/space';
import { ASYNC_STATUS } from '../../../shared/hooks/useAsyncResource';
import { screenContent } from '../../../shared/styles/layout';
import LessonAction from '../components/lesson/LessonAction';
import LessonHeader from '../components/lesson/LessonHeader';
import LessonSectionCard from '../components/lesson/LessonSectionCard';
import LessonExample from '../components/LessonExample';
import { useLesson } from '../hooks/useLesson';
import { useMarkAsStudied } from '../hooks/useMarkAsStudied';

// La barra de pestañas está oculta aquí: se respeta la zona segura inferior.
const EDGES = ['left', 'right', 'bottom'];
const ERROR_ICON_SIZE = 48;

function LessonError({ message, onBack }) {
  return (
    <View style={styles.center}>
      <Ionicons name="warning-outline" size={ERROR_ICON_SIZE} color={colors.danger} />
      <Text style={styles.errorText}>{message}</Text>
      <SpaceButton title="Return to Galaxy" onPress={onBack} />
    </View>
  );
}

export default function LessonDetailScreen({ route, navigation }) {
  const lessonId = route?.params?.lessonId;
  const { leccion, status, error } = useLesson(lessonId);
  const progreso = useMarkAsStudied(lessonId, leccion?.estadoEstudiante);

  function renderContent() {
    if (status === ASYNC_STATUS.LOADING) {
      return <LoadingState message="Landing on planet..." />;
    }
    if (status === ASYNC_STATUS.ERROR) {
      return <LessonError message={error} onBack={() => navigation.goBack()} />;
    }
    return (
      <ScrollView
        contentContainerStyle={[screenContent, styles.content]}
        showsVerticalScrollIndicator={false}
      >
        <LessonHeader
          unitTitle={leccion?.unidad?.titulo}
          title={leccion?.titulo || `Lesson ${lessonId}`}
        />
        <LessonSectionCard
          icon="book"
          title="Theory"
          text={leccion?.definicion?.trim()}
          emptyText="No theory available for this lesson."
        />
        <LessonExample ejemplo={leccion?.ejemplo} />
        <LessonAction
          hasQuiz={leccion?.tieneCuestionario === true}
          timeLimitSeconds={leccion?.tiempoLimiteSegundos}
          status={progreso.estado}
          marking={progreso.marcando}
          error={progreso.error}
          onMarkAsStudied={progreso.marcar}
        />
      </ScrollView>
    );
  }

  return (
    <SpaceBackground edges={EDGES} seed="lesson">
      {renderContent()}
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  errorText: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.danger,
    textAlign: 'center',
  },
});
