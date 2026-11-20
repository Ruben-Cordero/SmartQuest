// Dueño: Liam (T15). Buscador del glosario: campo de texto, indicador mientras busca
// y botón para limpiar.
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { colors, fonts, layout, radius, spacing, typography } from '../../../../config/theme';

export default function GlossarySearchBar({ value, onChangeText, searching, style }) {
  return (
    <View style={[styles.bar, style]}>
      <Ionicons
        name="search"
        size={typography.subtitle}
        color={colors.textMuted}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search a word..."
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="never"
        accessibilityLabel="Search the glossary"
        testID="glossary-search"
      />
      {searching ? <ActivityIndicator color={colors.primary} style={styles.spinner} /> : null}
      {value ? (
        <Pressable
          onPress={() => onChangeText('')}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          style={styles.clear}
        >
          <Ionicons name="close-circle" size={typography.subtitle} color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  // El borde usa textMuted para cumplir el 3:1 de los controles (igual que el login).
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: layout.minTouchSize,
    borderWidth: layout.borderWidth,
    borderColor: colors.textMuted,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.ms,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: layout.minTouchSize,
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.text,
  },
  spinner: {
    marginLeft: spacing.sm,
  },
  clear: {
    minWidth: layout.minTouchSize,
    minHeight: layout.minTouchSize,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -spacing.ms,
  },
});
