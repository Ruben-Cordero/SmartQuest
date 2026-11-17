import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { defaultScreenOptions } from '../../../navigation/screenOptions';
import EnglishTopicsScreen from '../screens/EnglishTopicsScreen';
// Cambiar por '../screens/LessonDetailScreen' cuando Estrella suba su pantalla.
import LessonDetailScreen from './placeholders/LessonDetailPlaceholder';
// Cambiar por '../screens/GlossaryScreen' cuando Liam suba su pantalla.
import GlossaryScreen from './placeholders/GlossaryPlaceholder';
import { ENGLISH_ROUTES } from './routes';

const Stack = createNativeStackNavigator();

// Stack interno del módulo de Inglés. Se monta dentro del stack del estudiante;
// esa ruta debe tener headerShown: false para que no se vean dos cabeceras.
export default function EnglishNavigator() {
  return (
    <Stack.Navigator initialRouteName={ENGLISH_ROUTES.TOPICS} screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name={ENGLISH_ROUTES.TOPICS}
        component={EnglishTopicsScreen}
        // Sin cabecera propia: en esta pantalla se muestra la del stack padre, que
        // trae el botón atrás nativo hacia Inicio (ver src/navigation/StudentNavigator.jsx).
        options={{ title: 'Inglés', headerShown: false }}
      />
      <Stack.Screen
        name={ENGLISH_ROUTES.LESSON_DETAIL}
        component={LessonDetailScreen}
        options={{ title: 'Lección' }}
      />
      <Stack.Screen
        name={ENGLISH_ROUTES.GLOSSARY}
        component={GlossaryScreen}
        options={{ title: 'Glosario' }}
      />
    </Stack.Navigator>
  );
}
