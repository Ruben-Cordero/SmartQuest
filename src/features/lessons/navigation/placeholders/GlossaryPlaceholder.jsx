import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../../../config/theme';

// Placeholder TEMPORAL hasta que exista screens/GlossaryScreen.
export default function GlossaryPlaceholder() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aquí estará el glosario de vocabulario.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  text: {
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
