// Dueña: Estrella (T11). Acción final de la lección:
// - con cuestionario: aviso de que se completa aprobándolo;
// - ya estudiada: confirmación;
// - si no: botón "Mark as studied".
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, layout, spacing, typography } from '../../../../config/theme';
import { SpaceButton, SpaceCard } from '../../../../shared/components/space';
import { LESSON_STATUS } from '../../services/lessons';

const ICON_SIZE = typography.title;

export default function LessonAction({
  hasQuiz,
  timeLimitSeconds,
  status,
  marking,
  error,
  onMarkAsStudied,
}) {
  let contenido;
  if (hasQuiz) {
    contenido = (
      <SpaceCard style={[styles.banner, styles.notice]}>
        <Ionicons name="trophy" size={ICON_SIZE} color={colors.primary} />
        <Text style={styles.noticeText}>
          Completed by passing the quiz
          {timeLimitSeconds ? ` (${timeLimitSeconds}s limit)` : ''}. Available in Sprint 2.
        </Text>
      </SpaceCard>
    );
  } else if (status === LESSON_STATUS.STUDIED) {
    contenido = (
      <SpaceCard style={[styles.banner, styles.success]}>
        <Ionicons name="checkmark-circle" size={ICON_SIZE} color={colors.energy} />
        <Text style={styles.successText}>Marked as studied</Text>
      </SpaceCard>
    );
  } else {
    contenido = (
      <SpaceButton
        title={marking ? 'Marking...' : 'Mark as studied'}
        onPress={onMarkAsStudied}
        disabled={marking}
      />
    );
  }

  return (
    <View style={styles.container}>
      {contenido}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.surfaceTranslucent,
    borderWidth: layout.borderWidth,
  },
  notice: {
    borderColor: colors.primary,
  },
  noticeText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: typography.body,
    lineHeight: typography.body * 1.5,
    color: colors.onSurface,
  },
  success: {
    justifyContent: 'center',
    borderColor: colors.energy,
  },
  successText: {
    fontFamily: fonts.bodyBold,
    fontSize: typography.body,
    color: colors.energy,
  },
  error: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.danger,
    textAlign: 'center',
  },
});
