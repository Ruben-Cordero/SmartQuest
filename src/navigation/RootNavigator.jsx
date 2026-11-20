import { StatusBar } from 'expo-status-bar';

import { useAuth } from '../features/auth';
import LoadingView from '../shared/components/LoadingView';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

// Muestra un navegador u otro según haya sesión. Como se reemplaza el navegador
// completo (no se apila una pantalla sobre otra), el botón atrás de Android no
// puede volver al login tras entrar, ni a la app tras cerrar sesión.
export default function RootNavigator() {
  const { cargando, estaAutenticado } = useAuth();

  if (cargando) {
    return <LoadingView message="Restoring your session..." />;
  }

  return (
    <>
      {/* Todo el universo es oscuro: hora y batería en claro. */}
      <StatusBar style="light" />
      {estaAutenticado ? <AppNavigator /> : <AuthNavigator />}
    </>
  );
}
