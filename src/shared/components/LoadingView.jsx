import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { colors, fonts, spacing, typography } from '../../config/theme';
import SpaceBackground from './space/SpaceBackground';

// Pantalla completa de carga con un mensaje opcional.
export default function LoadingView({ message = 'Loading...' }) {
  return (
    <SpaceBackground edges={['top', 'bottom', 'left', 'right']} style={styles.container}>
      <ActivityIndicator
        size="large"
        color={colors.primary}
        accessibilityRole="progressbar"
        accessibilityLabel={message}
      />
      {message ? <Text style={styles.text}>{message}</Text> : null}
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  container: {
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
