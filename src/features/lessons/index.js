// Punto de entrada de la funcionalidad de lecciones de Inglés.
export { default as EnglishNavigator } from './navigation/EnglishNavigator';
export { ENGLISH_ROUTES } from './navigation/routes';
export { default as EnglishTopicsScreen } from './screens/EnglishTopicsScreen';

// Único lugar a cambiar cuando Liam suba su pantalla:
// export { default as GlossaryScreen } from './screens/GlossaryScreen';
export { default as GlossaryScreen } from './navigation/placeholders/GlossaryPlaceholder';
