// Dueña: Estrella (T09–T11).
// Hoy: muestra el lessonId que llega por navegación (route.params.lessonId).
// Falta: cargar la lección con getLeccion(lessonId) de '../services/inglesApi',
// mostrar su teoría (usa LessonExample de Liam para los ejemplos), estados de carga y
// error, y "marcar como estudiada" con marcarEstudiado(lessonId) si no tiene cuestionario.
// Aquí la barra de pestañas está oculta: PaperBackground respeta la zona segura inferior.
import { ScrollView, StyleSheet, Text } from 'react-native';

import { colors, fonts, layout, spacing, typography } from '../../../config/theme';
import { InkCard, PaperBackground } from '../../../shared/components/vintage';

export default function LessonDetailScreen({ route }) {
  const lessonId = route?.params?.lessonId;

  return (
    <PaperBackground edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <InkCard>
          <Text style={styles.title} accessibilityRole="header" testID="lesson-detail-id">
            Lesson {lessonId ?? '—'}
          </Text>
        </InkCard>
      </ScrollView>
    </PaperBackground>
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
    color: colors.tinta,
  },
});
