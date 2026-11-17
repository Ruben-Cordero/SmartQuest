import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../app/screens/ProfileScreen';
import StudentHomeScreen from '../app/screens/StudentHomeScreen';
import { EnglishTopicsScreen } from '../features/lessons';
import ProfileHeaderButton from '../shared/components/ProfileHeaderButton';
import { defaultScreenOptions } from './screenOptions';

const Stack = createNativeStackNavigator();

// Stack exclusivo del estudiante: aquí no se registra ninguna pantalla docente.
export default function StudentNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="StudentHome"
        component={StudentHomeScreen}
        options={{ title: 'Inicio', headerRight: () => <ProfileHeaderButton /> }}
      />
      <Stack.Screen
        name="EnglishTopics"
        component={EnglishTopicsScreen}
        options={{ title: 'Unidades' }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Mi perfil' }} />
    </Stack.Navigator>
  );
}
