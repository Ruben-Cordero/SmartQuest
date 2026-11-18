import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { defaultScreenOptions } from '../../../navigation/screenOptions';
import GalaxyMapScreen from '../screens/GalaxyMapScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import { ENGLISH_ROUTES } from './routes';

const Stack = createNativeStackNavigator();

// Dueño: Rubén. Stack interno del módulo de Inglés (mapa de galaxias → planeta). Se
// monta en la pestaña "Galaxy" de MainTabNavigator, que tiene headerShown: false para
// no duplicar cabeceras. El mapa no lleva cabecera: tiene su propio encabezado.
export default function EnglishNavigator() {
  return (
    <Stack.Navigator initialRouteName={ENGLISH_ROUTES.TOPICS} screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name={ENGLISH_ROUTES.TOPICS}
        component={GalaxyMapScreen}
        options={{ title: 'Galaxy', headerShown: false }}
      />
      <Stack.Screen
        name={ENGLISH_ROUTES.LESSON_DETAIL}
        component={LessonDetailScreen}
        options={{ title: 'Planet' }}
      />
    </Stack.Navigator>
  );
}
