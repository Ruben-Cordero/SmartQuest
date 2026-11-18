// Dueña: Estrella (T09–T11).
// Hoy: muestra el lessonId que llega por navegación (route.params.lessonId).
// Falta: cargar la lección con getLeccion(lessonId) de '../services/inglesApi',
// mostrar su teoría (usa LessonExample de Liam para los ejemplos), estados de carga y
// error, y "marcar como estudiada" con marcarEstudiado(lessonId) si no tiene cuestionario.
// Aquí la barra de pestañas está oculta: SpaceBackground respeta la zona segura inferior.
// El contenido de lectura va en LightCard (tarjeta clara, texto colors.onLessonCard).
import { ScrollView, StyleSheet, Text } from 'react-native';

import { colors, fonts, layout, spacing, typography } from '../../../config/theme';
import { LightCard, SpaceBackground } from '../../../shared/components/space';

export default function LessonDetailScreen({ route }) {
  const lessonId = route?.params?.lessonId;

  return (
    <SpaceBackground edges={['left', 'right', 'bottom']} seed="lesson">
      <ScrollView contentContainerStyle={styles.content}>
        <LightCard>
          <Text style={styles.title} accessibilityRole="header" testID="lesson-detail-id">
            Lesson {lessonId ?? '—'}
          </Text>
        </LightCard>
      </ScrollView>
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: typography.subtitle,
    lineHeight: typography.subtitle * 1.3,
    color: colors.onLessonCard,
  },
});
