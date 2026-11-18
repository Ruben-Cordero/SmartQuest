import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ProfileScreen from '../app/screens/ProfileScreen';
import TeacherHomeScreen from '../app/screens/TeacherHomeScreen';
import { ROLES } from '../config/roles';
import { colors, fonts, layout, spacing, typography } from '../config/theme';
import { ENGLISH_ROUTES, EnglishNavigator, GlossaryScreen } from '../features/lessons';
import { useAuth } from '../shared/context/AuthContext';
import { headerOptions } from './screenOptions';
import { MAIN_TABS } from './tabRoutes';

const Tab = createBottomTabNavigator();

// Alto de la barra sin contar la zona segura inferior.
const TAB_BAR_HEIGHT = layout.minTouchSize + spacing.md;
const ICON_SIZE = typography.title;

// Ícono relleno si la pestaña está activa y de contorno si no.
function tabIcon(name) {
  return function TabIcon({ focused, color }) {
    return <Ionicons name={focused ? name : `${name}-outline`} size={ICON_SIZE} color={color} />;
  };
}

// Barra inferior de la app autenticada.
// - Estudiante: Aprender · Glosario · Perfil.
// - Docente:    Panel · Perfil.
// Un rol no puede llegar a las pestañas del otro: no se registran en su navegador.
export default function MainTabNavigator() {
  const { rol } = useAuth();
  const insets = useSafeAreaInsets();
  const esDocente = rol === ROLES.DOCENTE;

  // Barra vintage: fondo tinta con borde superior ámbar; activa en ámbar (11.3:1)
  // e inactiva en crema translúcido (7.4:1).
  const tabBarStyle = {
    height: TAB_BAR_HEIGHT + insets.bottom,
    paddingBottom: insets.bottom,
    backgroundColor: colors.tinta,
    borderTopColor: colors.ambar,
    borderTopWidth: layout.inkBorder,
  };

  return (
    <Tab.Navigator
      initialRouteName={esDocente ? MAIN_TABS.PANEL : MAIN_TABS.LEARN}
      backBehavior="history"
      screenOptions={{
        ...headerOptions,
        sceneStyle: { backgroundColor: colors.papel },
        tabBarActiveTintColor: colors.ambar,
        tabBarInactiveTintColor: colors.creamMuted,
        tabBarLabelStyle: {
          fontFamily: fonts.game,
          fontSize: typography.body,
          letterSpacing: 0.5,
        },
        tabBarItemStyle: { minHeight: layout.minTouchSize, paddingVertical: spacing.xs },
        tabBarStyle,
      }}
    >
      {esDocente ? (
        // Pestañas exclusivas del docente.
        <Tab.Screen
          name={MAIN_TABS.PANEL}
          component={TeacherHomeScreen}
          options={{
            title: 'Dashboard',
            tabBarIcon: tabIcon('stats-chart'),
            tabBarAccessibilityLabel: 'Progress dashboard',
          }}
        />
      ) : (
        // Pestañas exclusivas del estudiante.
        <>
          <Tab.Screen
            name={MAIN_TABS.LEARN}
            component={EnglishNavigator}
            options={({ route }) => ({
              title: 'Learn',
              // El stack de Inglés trae sus propias cabeceras.
              headerShown: false,
              tabBarIcon: tabIcon('book'),
              tabBarAccessibilityLabel: 'Learn: English worlds and levels',
              // Dentro del detalle de una lección la barra se oculta para leer a pantalla completa.
              tabBarStyle:
                getFocusedRouteNameFromRoute(route) === ENGLISH_ROUTES.LESSON_DETAIL
                  ? { display: 'none' }
                  : tabBarStyle,
            })}
          />
          <Tab.Screen
            name={MAIN_TABS.GLOSSARY}
            component={GlossaryScreen}
            options={{
              title: 'Glossary',
              tabBarIcon: tabIcon('search'),
              tabBarAccessibilityLabel: 'Glossary',
            }}
          />
        </>
      )}
      <Tab.Screen
        name={MAIN_TABS.PROFILE}
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerTitle: 'My profile',
          tabBarIcon: tabIcon('person'),
          tabBarAccessibilityLabel: 'My profile and log out',
        }}
      />
    </Tab.Navigator>
  );
}
