import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, layout, spacing, typography } from '../../config/theme';

// Botón "Perfil" para el header (headerRight). Navega a la pantalla "Profile"
// del stack actual, que existe tanto en StudentNavigator como en TeacherNavigator.
export default function ProfileHeaderButton() {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('Profile')}
      accessibilityRole="button"
      accessibilityLabel="Abrir mi perfil"
      hitSlop={spacing.sm}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>Perfil</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: layout.minTouchSize,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  pressed: {
    opacity: 0.6,
  },
  text: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: typography.weightBold,
  },
});
