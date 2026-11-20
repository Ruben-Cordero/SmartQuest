// Dueña: Estrella (T10). Tarjeta clara con efecto vidrio para el contenido de la
// lección (por ejemplo, la teoría): ícono, título de sección y texto.
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, layout, radius, spacing, typography } from '../../../../config/theme';

export default function LessonSectionCard({ icon, title, text, emptyText }) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={colors.lessonCardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.header}>
          <Ionicons name={icon} size={typography.subtitle} color={colors.primary} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.separator} />
        {text ? (
          <Text style={styles.body}>{text}</Text>
        ) : (
          <Text style={[styles.body, styles.empty]}>{emptyText}</Text>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: layout.borderWidth,
    borderColor: colors.lessonCardBorder,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  card: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: typography.body,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lessonCardDivider,
    marginVertical: spacing.sm,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: typography.body,
    lineHeight: typography.body * 1.6,
    color: colors.onLessonCard,
  },
  empty: {
    fontStyle: 'italic',
  },
});
