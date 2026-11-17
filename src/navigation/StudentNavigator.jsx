import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../app/screens/ProfileScreen';
import StudentHomeScreen from '../app/screens/StudentHomeScreen';
import { ENGLISH_ROUTES, EnglishNavigator } from '../features/lessons';
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
      {/*
        Módulo de Inglés (stack anidado). En la lista de temas se usa ESTA cabecera,
        cuyo botón atrás nativo vuelve a Inicio; en Lección y Glosario se oculta y se
        usa la cabecera del módulo, cuyo botón atrás vuelve a la lista. Así nunca hay
        dos cabeceras ni una pantalla sin flecha atrás.
      */}
      <Stack.Screen
        name="English"
        component={EnglishNavigator}
        options={({ route }) => {
          const focused = getFocusedRouteNameFromRoute(route) ?? ENGLISH_ROUTES.TOPICS;
          return { title: 'Inglés', headerShown: focused === ENGLISH_ROUTES.TOPICS };
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Mi perfil' }} />
    </Stack.Navigator>
  );
}
