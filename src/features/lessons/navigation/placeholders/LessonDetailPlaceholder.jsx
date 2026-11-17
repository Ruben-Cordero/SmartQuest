import { ScrollView, StyleSheet, Text } from 'react-native';

import { colors, fonts, layout, spacing, typography } from '../../../../config/theme';
import { InkCard, PaperBackground, Ribbon } from '../../../../shared/components/vintage';

// Placeholder TEMPORAL hasta que exista screens/LessonDetailScreen.
// Muestra el lessonId recibido para comprobar que la navegación lo pasa bien.
// Aquí la barra de pestañas está oculta, así que se respeta la zona segura inferior.
export default function LessonDetailPlaceholder({ route }) {
  const lessonId = route?.params?.lessonId;

  return (
    <PaperBackground edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Ribbon text="Level details" />
        <InkCard style={styles.card}>
          <Text style={styles.label}>Received lessonId</Text>
          <Text style={styles.value} testID="lesson-detail-id">
            {lessonId ?? 'No data'}
          </Text>
        </InkCard>
        <Text style={styles.note}>
          Temporary screen: the real content arrives with LessonDetailScreen.
        </Text>
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
  card: {
    marginTop: spacing.lg,
  },
  label: {
    fontFamily: fonts.detail,
    fontSize: typography.body,
    color: colors.sepia,
  },
  value: {
    fontFamily: fonts.bodyBold,
    fontSize: typography.subtitle,
    lineHeight: typography.subtitle * 1.3,
    color: colors.tinta,
    marginTop: spacing.xs,
  },
  note: {
    fontFamily: fonts.body,
    fontSize: typography.body,
    lineHeight: typography.body * 1.4,
    color: colors.sepia,
    marginTop: spacing.lg,
  },
});
