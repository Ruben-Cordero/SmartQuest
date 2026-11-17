import { colors, typography } from '../config/theme';

// Estilo común del header para todos los stacks.
// El botón atrás es el nativo de cada plataforma (flecha en la esquina superior
// izquierda), que aparece solo en las pantallas que tienen a dónde volver.
export const defaultScreenOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.primary,
  headerTitleStyle: { color: colors.text, fontSize: typography.subtitle },
  contentStyle: { backgroundColor: colors.background },
};
