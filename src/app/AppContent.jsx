import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '../config/theme';
import AppNavigator from '../navigation/AppNavigator';
import AuthNavigator from '../navigation/AuthNavigator';
import LoadingView from '../shared/components/LoadingView';
import { AuthProvider, useAuth } from '../shared/context/AuthContext';

// Colores base de React Navigation alineados con el tema (evita destellos blancos).
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.azul,
    background: colors.papel,
    card: colors.papel,
    text: colors.tinta,
    border: colors.tinta,
  },
};

// Muestra un navegador u otro según haya sesión. Como se reemplaza el navegador
// completo (no se apila una pantalla sobre otra), el botón atrás de Android no
// puede volver al login tras entrar, ni a la app tras cerrar sesión.
function RootNavigator() {
  const { cargando, estaAutenticado } = useAuth();

  if (cargando) {
    return <LoadingView message="Restoring your session..." />;
  }

  return (
    <>
      {/* Cabeceras y login son color papel: hora y batería en oscuro. */}
      <StatusBar style="dark" />
      {estaAutenticado ? <AppNavigator /> : <AuthNavigator />}
    </>
  );
}

export default function AppContent() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer theme={navigationTheme}>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
