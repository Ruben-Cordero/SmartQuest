import { StyleSheet, View } from 'react-native';

import { spacing } from '../../config/theme';
import MessageBubble from './space/MessageBubble';
import SpaceButton from './space/SpaceButton';

/** Mensaje de error comprensible con un botón "Retry" (estado de error estándar). */
export default function ErrorState({ message, onRetry, style }) {
  return (
    <View style={style}>
      <MessageBubble tone="error">{message}</MessageBubble>
      {onRetry ? <SpaceButton title="Retry" onPress={onRetry} style={styles.retry} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  retry: {
    marginTop: spacing.md,
  },
});
