import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../app/screens/ProfileScreen';
import TeacherHomeScreen from '../app/screens/TeacherHomeScreen';
import ProfileHeaderButton from '../shared/components/ProfileHeaderButton';
import { defaultScreenOptions } from './screenOptions';

const Stack = createNativeStackNavigator();

// Stack exclusivo del docente: aquí no se registra ninguna pantalla de estudiante.
export default function TeacherNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="TeacherHome"
        component={TeacherHomeScreen}
        options={{ title: 'Inicio', headerRight: () => <ProfileHeaderButton /> }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Mi perfil' }} />
    </Stack.Navigator>
  );
}
