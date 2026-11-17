// Tema vintage de SmartQuest: dibujos animados de los años 30 (papel envejecido,
// tinta negra gruesa, sombras duras). Es el ÚNICO tema de la app: las pantallas
// que leen colors, typography, spacing, radius, layout o fonts cambian solas.

// Paleta base.
export const palette = {
  azul: '#006BBB',
  cielo: '#30A0E0',
  ambar: '#FFC872',
  crema: '#FFE3B3',
  papel: '#F2E4C4',
  tinta: '#1F1A17',
  sepia: '#6B4E31',
  verde: '#2F7D4F', // solo acierto
  rojo: '#C8283B', // SOLO error, cancelar o respuesta incorrecta; nunca decorativo
};

// Contrastes medidos (WCAG):
// - tinta sobre papel 14:1 y sobre crema 14.6:1; sepia sobre papel 6:1 y sobre crema 6.1:1.
// - tinta sobre ámbar 11.3:1; ámbar sobre tinta 11.3:1.
// - crema sobre azul o rojo 4.4:1: solo para texto grande (títulos y botones de 18 o más).
export const colors = {
  ...palette,

  // Nombres semánticos (los que ya usan las pantallas).
  primary: palette.azul,
  onPrimary: palette.crema,
  background: palette.papel,
  surface: palette.crema,
  text: palette.tinta,
  textMuted: palette.sepia,
  border: palette.tinta,
  success: palette.verde,
  error: palette.rojo, // para bordes e íconos; el texto de error va en tinta
  errorBackground: palette.crema,
  danger: palette.rojo,
  disabledBackground: palette.papel,
  disabledText: palette.sepia,

  // Derivados con transparencia.
  creamMuted: 'rgba(255, 227, 179, 0.7)', // pestañas inactivas sobre tinta (7.4:1)
  vignette: 'rgba(107, 78, 49, 0.22)', // sepia translúcido para los bordes del papel
  vignetteClear: 'rgba(107, 78, 49, 0)',
};

// Familias tipográficas (nombres con los que se cargan en src/app/fonts.js).
export const FONT_FAMILIES = {
  display: 'Ultra_400Regular', // títulos grandes
  game: 'LuckiestGuy_400Regular', // botones, pestañas y etiquetas cortas
  body: 'Nunito_400Regular', // todo el texto de lectura
  bodyBold: 'Nunito_700Bold',
  detail: 'SpecialElite_400Regular', // detalles pequeños: fechas, notas
};

export const fonts = { ...FONT_FAMILIES };

// Si las fuentes no cargan, se usan las del sistema (undefined = fuente por defecto).
// Debe llamarse antes de que se importe cualquier pantalla (ver src/app/App.jsx).
export function fallBackToSystemFonts() {
  Object.keys(fonts).forEach((key) => {
    fonts[key] = undefined;
  });
}

export const typography = {
  display: 28, // TitleBanner
  title: 24,
  subtitle: 20,
  button: 20, // texto grande: permite crema sobre azul/rojo
  label: 18,
  body: 16, // mínimo para texto de lectura (ERS)
  weightRegular: '400',
  weightBold: '700',
};

export const spacing = {
  xs: 4,
  sm: 8,
  ms: 12,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  ink: 14,
};

export const layout = {
  minTouchSize: 48,
  maxContentWidth: 480,
  borderWidth: 1,
  inkBorder: 3, // contorno de tinta
  shadowOffset: 4, // sombra dura: 4 abajo y 4 a la derecha
  buttonDepth: 5, // base inferior de Button3D
};
