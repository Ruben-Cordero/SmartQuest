// Dueño: Liam (T12).
// Hoy: muestra el texto del ejemplo en una InkCard; si viene vacío o null, no muestra nada.
// Falta: el diseño final del ejemplo (por ejemplo, resaltar la estructura gramatical).
// Lo usa LessonDetailScreen (Estrella): <LessonExample ejemplo={leccion.ejemplo} />
import { StyleSheet, Text } from 'react-native';

import { colors, fonts, typography } from '../../../config/theme';
import { InkCard } from '../../../shared/components/vintage';

export default function LessonExample({ ejemplo, style }) {
  if (typeof ejemplo !== 'string' || ejemplo.trim() === '') {
    return null;
  }

  return (
    <InkCard style={style}>
      <Text style={styles.text}>{ejemplo}</Text>
    </InkCard>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.body,
    fontSize: typography.body,
    lineHeight: typography.body * 1.4,
    color: colors.tinta,
  },
});
