// Dueño: Rubén. Encabezado del mapa: avatar con iniciales, nombre y curso.
// Nivel, racha y estrellas NO se muestran: la API todavía no los tiene.
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing, typography } from '../../../../config/theme';
import { Avatar } from '../../../../shared/components/space';

export default function GalaxyHeader({ name, course }) {
  return (
    <View style={styles.row}>
      <Avatar name={name} />
      <View style={styles.text}>
        <Text style={styles.hello}>Welcome back,</Text>
        <Text style={styles.name} numberOfLines={1} accessibilityRole="header">
          {name || 'Explorer'}
        </Text>
        {course ? (
          <Text style={styles.course} numberOfLines={1}>
            {course}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    marginLeft: spacing.ms,
  },
  hello: {
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  name: {
    fontFamily: fonts.display,
    fontSize: typography.subtitle,
    color: colors.text,
  },
  course: {
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.textMuted,
  },
});
