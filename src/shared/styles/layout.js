import { layout, spacing } from '../../config/theme';

// Contenedor estándar del contenido de una pantalla: márgenes de 16 y ancho máximo
// centrado, para que se vea bien desde 360 dp hasta pantallas grandes.
// Uso: <ScrollView contentContainerStyle={[screenContent, styles.otro]}>
export const screenContent = {
  padding: spacing.md,
  paddingBottom: spacing.xl,
  width: '100%',
  maxWidth: layout.maxContentWidth,
  alignSelf: 'center',
};
