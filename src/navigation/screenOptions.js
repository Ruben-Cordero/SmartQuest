import { colors, fonts, typography } from '../config/theme';

// Cabecera vintage común: fondo azul, título crema en Luckiest Guy y flecha atrás
// nativa en crema. El borde de tinta bajo la cabecera lo dibuja PaperBackground
// (inkTop), porque la cabecera nativa no admite bordes propios.
export const headerOptions = {
  headerStyle: { backgroundColor: colors.azul },
  headerTintColor: colors.crema,
  headerTitleStyle: {
    color: colors.crema,
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
