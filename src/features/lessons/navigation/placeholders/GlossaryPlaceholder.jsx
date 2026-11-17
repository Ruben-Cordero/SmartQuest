import { ScrollView, StyleSheet } from 'react-native';

import { layout, spacing } from '../../../../config/theme';
import { MessageBubble, PaperBackground, TitleBanner } from '../../../../shared/components/vintage';

// Placeholder TEMPORAL hasta que exista screens/GlossaryScreen.
export default function GlossaryPlaceholder() {
  return (
    <PaperBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <TitleBanner title="Word Notebook" sunburst />
        <MessageBubble style={styles.bubble}>
          Your words will appear here with their definition, pronunciation and examples.
        </MessageBubble>
      </ScrollView>
    </PaperBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  bubble: {
    marginTop: spacing.lg,
  },
});
