import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from '../navigation/AppNavigator';
import AuthNavigator from '../navigation/AuthNavigator';
import LoadingView from '../shared/components/LoadingView';
import { AuthProvider, useAuth } from '../shared/context/AuthContext';

// Muestra un navegador u otro según haya sesión. Como se reemplaza el navegador
// completo (no se apila una pantalla sobre otra), el botón atrás de Android no
// puede volver al login tras entrar, ni a la app tras cerrar sesión.
function RootNavigator() {
  const { cargando, estaAutenticado } = useAuth();

  if (cargando) {
    return <LoadingView message="Recuperando tu sesión..." />;
  }

  return estaAutenticado ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
