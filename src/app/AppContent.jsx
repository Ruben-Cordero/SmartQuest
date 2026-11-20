import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '../features/auth';
import { navigationTheme } from '../navigation/navigationTheme';
import RootNavigator from '../navigation/RootNavigator';

// Proveedores globales de la app: zona segura, sesión y navegación.
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
