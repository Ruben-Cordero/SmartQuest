import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../app/screens/LoginScreen';
import { defaultScreenOptions } from './screenOptions';

const Stack = createNativeStackNavigator();

// Navegador para usuarios sin sesión.
export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ ...defaultScreenOptions, headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
