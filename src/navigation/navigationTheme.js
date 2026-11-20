import { DarkTheme } from '@react-navigation/native';

import { colors } from '../config/theme';

// Colores base de React Navigation alineados con el tema (evita destellos blancos).
export const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: colors.border,
  },
};
