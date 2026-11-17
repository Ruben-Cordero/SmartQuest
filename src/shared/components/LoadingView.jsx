import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { colors, fonts, spacing, typography } from '../../config/theme';
import PaperBackground from './vintage/PaperBackground';

// Pantalla completa de carga con un mensaje opcional.
export default function LoadingView({ message = 'Loading...' }) {
  return (
    <PaperBackground
      edges={['top', 'bottom', 'left', 'right']}
      inkTop={false}
      style={styles.container}
    >
      <ActivityIndicator
        size="large"
        color={colors.azul}
        accessibilityRole="progressbar"
        accessibilityLabel={message}
      />
      {message ? <Text style={styles.text}>{message}</Text> : null}
    </PaperBackground>
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
    color: colors.sepia,
    textAlign: 'center',
  },
});
