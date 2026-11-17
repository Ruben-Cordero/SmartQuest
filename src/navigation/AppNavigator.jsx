import { useEffect } from 'react';

import { ROLES } from '../config/roles';
import LoadingView from '../shared/components/LoadingView';
import { useAuth } from '../shared/context/AuthContext';
import StudentNavigator from './StudentNavigator';
import TeacherNavigator from './TeacherNavigator';

const ROL_NO_RECONOCIDO = 'Rol no reconocido';

// Navegador para usuarios con sesión: elige el stack según el rol.
export default function AppNavigator() {
  const { rol, logout } = useAuth();
  const rolValido = rol === ROLES.ESTUDIANTE || rol === ROLES.DOCENTE;

  useEffect(() => {
    if (!rolValido) {
      // Cierra la sesión; el login mostrará el mensaje "Rol no reconocido".
      logout(ROL_NO_RECONOCIDO);
    }
  }, [rolValido, logout]);

  if (rol === ROLES.ESTUDIANTE) return <StudentNavigator />;
  if (rol === ROLES.DOCENTE) return <TeacherNavigator />;
  return <LoadingView message={ROL_NO_RECONOCIDO} />;
}
