import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  // true mientras se recupera una sesión guardada al abrir la app.
  const [cargando, setCargando] = useState(true);
  // Mensaje para mostrar en el login tras un cierre de sesión forzado (p. ej. rol no reconocido).
  const [aviso, setAviso] = useState(null);

  useEffect(() => {
    let activo = true;

    async function restaurarSesion() {
      try {
        const tokenGuardado = await authService.getStoredToken();
        if (!tokenGuardado) return;
        const usuarioActual = await authService.getMe();
        if (activo) {
          setToken(tokenGuardado);
          setUsuario(usuarioActual);
        }
      } catch {
        // Token inválido o vencido: se descarta y se pide iniciar sesión de nuevo.
        await authService.logout().catch(() => {});
      } finally {
        if (activo) setCargando(false);
      }
    }

    restaurarSesion();
    return () => {
      activo = false;
    };
  }, []);

  const login = useCallback(async (username, password) => {
    setAviso(null);
    const data = await authService.login(username, password);
    setToken(data.token);
    setUsuario(data.usuario);
    return data.usuario;
  }, []);

  const logout = useCallback(async (mensaje = null) => {
    try {
      await authService.logout();
    } finally {
      setToken(null);
      setUsuario(null);
      setAviso(typeof mensaje === 'string' ? mensaje : null);
    }
  }, []);

  const value = useMemo(
    () => ({
      usuario,
      token,
      rol: usuario?.rol ?? null,
      estaAutenticado: Boolean(token && usuario),
      cargando,
      aviso,
      login,
      logout,
    }),
    [usuario, token, cargando, aviso, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>.');
  }
  return context;
}
