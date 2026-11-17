import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { defaultScreenOptions } from '../../../navigation/screenOptions';
import EnglishTopicsScreen from '../screens/EnglishTopicsScreen';
// Cambiar por '../screens/LessonDetailScreen' cuando Estrella suba su pantalla.
import LessonDetailScreen from './placeholders/LessonDetailPlaceholder';
import { ENGLISH_ROUTES } from './routes';

const Stack = createNativeStackNavigator();

// Stack interno del módulo de Inglés (temas → lección). Se monta en la pestaña
// "Aprender" de MainTabNavigator, que tiene headerShown: false para no duplicar cabeceras.
export default function EnglishNavigator() {
  return (
    <Stack.Navigator initialRouteName={ENGLISH_ROUTES.TOPICS} screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name={ENGLISH_ROUTES.TOPICS}
        component={EnglishTopicsScreen}
        options={{ title: 'Worlds' }}
      />
      <Stack.Screen
        name={ENGLISH_ROUTES.LESSON_DETAIL}
        component={LessonDetailScreen}
        options={{ title: 'Level' }}
      />
    </Stack.Navigator>
  );
}
