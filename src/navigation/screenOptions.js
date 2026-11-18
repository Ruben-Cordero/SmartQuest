import { colors, fonts, typography } from '../config/theme';

// Cabecera vintage común: fondo papel (integrado con la pantalla), título en tinta
// con Luckiest Guy y flecha atrás nativa en tinta (14:1). El borde de tinta bajo la
// cabecera lo dibuja PaperBackground (inkTop), porque la cabecera nativa no admite
// bordes propios.
export const headerOptions = {
  headerStyle: { backgroundColor: colors.papel },
  headerTintColor: colors.tinta,
  headerTitleStyle: {
    color: colors.tinta,
    fontFamily: fonts.game,
    fontSize: typography.subtitle,
  },
  headerBackTitleStyle: { fontFamily: fonts.game },
  headerShadowVisible: false,
};

// Opciones para los stacks (native-stack).
export const defaultScreenOptions = {
  ...headerOptions,
  contentStyle: { backgroundColor: colors.papel },
};
