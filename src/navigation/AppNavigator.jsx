import { useEffect } from 'react';

import { ROLES } from '../config/roles';
import LoadingView from '../shared/components/LoadingView';
import { useAuth } from '../shared/context/AuthContext';
import MainTabNavigator from './MainTabNavigator';

const ROL_NO_RECONOCIDO = 'Unrecognized role';

// Navegador para usuarios con sesión: barra inferior con pestañas según el rol.
export default function AppNavigator() {
  const { rol, logout } = useAuth();
  const rolValido = rol === ROLES.ESTUDIANTE || rol === ROLES.DOCENTE;

  useEffect(() => {
    if (!rolValido) {
      // Cierra la sesión; el login mostrará el mensaje "Unrecognized role".
      logout(ROL_NO_RECONOCIDO);
    }
  }, [rolValido, logout]);

  if (rolValido) return <MainTabNavigator />;
  return <LoadingView message={ROL_NO_RECONOCIDO} />;
}
