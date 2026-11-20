// Tema espacial de SmartQuest: la app es un universo, cada unidad es una galaxia
// y cada lección un planeta. Es el ÚNICO tema de la app: las pantallas que leen
// colors, typography, spacing, radius, layout o fonts cambian solas.

// Paleta base (tokens del diseño).
export const palette = {
  fondo: '#0B1026',
  superficie: '#161C42',
  superficie2: '#131938',
  borde: '#262E62',
  texto: '#EEF1FF',
  textoSecundario: '#9AA3C7',
  acento: '#FFC857', // estrellas y botones principales (CTA)
  textoSobreAcento: '#1A1440',
  energia: '#6CE0B4',
  racha: '#FF9F5A', // reservado: la API todavía no tiene rachas
  tarjetaLeccion: '#F6F7FB', // tarjeta clara para leer contenido de lecciones
  textoTarjetaLeccion: '#14183A',
  peligro: '#FF7A8A', // SOLO errores, respuestas incorrectas o salir
};

// Contrastes medidos (WCAG), todos ≥ 4.5:1 para texto normal:
// - texto sobre fondo 16.7:1 y sobre superficie 14.6:1.
// - texto secundario sobre fondo 7.6:1 y sobre superficie 6.6:1.
// - textoSobreAcento sobre acento 11.2:1; acento sobre fondo 12.2:1.
// - textoTarjetaLeccion sobre tarjetaLeccion 16.1:1; peligro sobre superficie 6.6:1.
// - El borde (#262E62) es decorativo (1.5:1): los campos de texto usan textMuted
//   como borde para cumplir el 3:1 de los controles.
export const colors = {
  ...palette,

  // Nombres semánticos (los que usan las pantallas).
  background: palette.fondo,
  surface: palette.superficie,
  surfaceAlt: palette.superficie2,
  border: palette.borde,
  text: palette.texto,
  onBackground: palette.texto, // texto sobre el fondo (16.7:1)
  onSurface: palette.texto, // texto sobre tarjetas (14.6:1)
  textMuted: palette.textoSecundario,
  primary: palette.acento,
  onPrimary: palette.textoSobreAcento,
  success: palette.energia,
  energy: palette.energia,
  error: palette.peligro,
  danger: palette.peligro,
  lessonCard: palette.tarjetaLeccion,
  onLessonCard: palette.textoTarjetaLeccion,

  // Nebulosas del fondo (solo decoración, siempre con baja opacidad).
  nebula: {
    azul: '#3557FF',
    morado: '#8A4DFF',
    rosa: '#FF4FB8',
    cian: '#2FD6FF',
  },

  // Derivados con transparencia.
  overlay: 'rgba(11, 16, 38, 0.6)',
  textFaint: 'rgba(154, 163, 199, 0.45)', // líneas punteadas y decoración (no texto)
};

// Familias tipográficas (nombres con los que se cargan en src/app/fonts.js).
export const FONT_FAMILIES = {
  display: 'SpaceGrotesk_700Bold', // títulos grandes
  heading: 'SpaceGrotesk_600SemiBold', // subtítulos, botones, pestañas
  body: 'Inter_400Regular', // texto de lectura
  bodyMedium: 'Inter_500Medium',
  bodyBold: 'Inter_700Bold',
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
  display: 30,
  title: 24,
  subtitle: 20,
  button: 18,
  label: 16,
  body: 16, // mínimo para texto de lectura (ERS)
  small: 14, // solo etiquetas cortas de apoyo, nunca párrafos
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
  sm: 10,
  md: 16,
  lg: 22,
  pill: 999,
};

export const layout = {
  minTouchSize: 48, // ≥ 44 px pedido por el diseño
  maxContentWidth: 480,
  borderWidth: 1,
};
