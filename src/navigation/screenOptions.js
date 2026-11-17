import { colors, typography } from '../config/theme';

// Estilo común del header para todos los stacks.
export const defaultScreenOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.primary,
  headerTitleStyle: { color: colors.text, fontSize: typography.subtitle },
  contentStyle: { backgroundColor: colors.background },
};
