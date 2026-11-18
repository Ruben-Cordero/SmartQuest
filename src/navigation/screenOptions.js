import { colors, fonts, typography } from '../config/theme';

// Cabecera espacial común: fondo del espacio, título en Space Grotesk y flecha
// atrás nativa en color texto (16.7:1), con una línea de borde suave debajo.
export const headerOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.text,
  headerTitleStyle: {
    color: colors.text,
    fontFamily: fonts.heading,
    fontSize: typography.subtitle,
  },
  headerBackTitleStyle: { fontFamily: fonts.heading },
  headerShadowVisible: false,
};

// Opciones para los stacks (native-stack).
export const defaultScreenOptions = {
  ...headerOptions,
  contentStyle: { backgroundColor: colors.background },
};
