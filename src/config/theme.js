// Valores provisionales hasta definir la identidad visual de SmartQuest.
// Todas las combinaciones de texto/fondo cumplen un contraste mínimo de 4.5:1 (ERS).
export const colors = {
  primary: '#2563EB', // texto blanco encima: 5.2:1
  onPrimary: '#FFFFFF',
  background: '#FFFFFF',
  surface: '#F3F4F6',
  text: '#111827',
  textMuted: '#4B5563', // sobre blanco: 7.6:1
  border: '#6B7280',
  error: '#B91C1C', // sobre blanco: 6.5:1
  errorBackground: '#FEF2F2',
  danger: '#B91C1C', // texto blanco encima: 6.5:1
  disabledBackground: '#E5E7EB',
  disabledText: '#374151', // sobre disabledBackground: 8.6:1
};

export const typography = {
  title: 24,
  subtitle: 20,
  body: 16, // tamaño mínimo de texto (ERS)
  weightRegular: '400',
  weightBold: '700',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
};

export const layout = {
  minTouchSize: 48,
  maxContentWidth: 480,
  borderWidth: 1,
};
