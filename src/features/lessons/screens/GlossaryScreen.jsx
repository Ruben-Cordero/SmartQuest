// Dueño: Liam (T14, T15 y T20).
// Hoy: título y "Coming soon".
// Falta: buscador y lista con buscarGlosario(q) de '../services/inglesApi' (palabra,
// definición, pronunciación, tiempo verbal, audio y ejemplo), estados de carga, error
// y vacío, y el botón de audio con PronunciationButton.
import { ScrollView, StyleSheet } from 'react-native';

import { layout, spacing } from '../../../config/theme';
import { MessageBubble, ScreenTitle, SpaceBackground } from '../../../shared/components/space';

export default function GlossaryScreen() {
  return (
    <SpaceBackground seed="glossary">
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenTitle title="Glossary" />
        <MessageBubble style={styles.bubble}>Coming soon</MessageBubble>
      </ScrollView>
    </SpaceBackground>
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
