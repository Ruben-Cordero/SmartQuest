import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { fallBackToSystemFonts } from '../config/theme';
import { FONT_SOURCES } from './fonts';

// El splash nativo queda visible hasta que las fuentes estén listas (o fallen).
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [fuentesCargadas, errorFuentes] = useFonts(FONT_SOURCES);
  const listo = fuentesCargadas || Boolean(errorFuentes);

  useEffect(() => {
    if (listo) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [listo]);

  if (!listo) {
    return null;
  }

  if (errorFuentes) {
    // Sin fuentes personalizadas la app sigue funcionando con las del sistema.
    fallBackToSystemFonts();
  }

  // Se carga recién aquí para que todas las pantallas creen sus estilos con las
  // fuentes ya resueltas (las personalizadas o, si fallaron, las del sistema).
  const AppContent = require('./AppContent').default;
  return <AppContent />;
}
