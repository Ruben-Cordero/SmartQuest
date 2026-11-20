import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing, typography } from '../../config/theme';

/** Indicador de carga centrado con un mensaje (dentro de una pantalla). */
export default function LoadingState({ message = 'Loading...', style }) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator
        size="large"
        color={colors.primary}
        accessibilityRole="progressbar"
        accessibilityLabel={message}
      />
      {message ? <Text style={styles.text}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  text: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
