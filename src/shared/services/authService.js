import * as SecureStore from 'expo-secure-store';

import { USE_MOCK } from '../../config/apiConfig';
import apiClient, { getErrorMessage, setAuthToken } from './apiClient';

// Solo se guarda el token. La contraseña nunca se almacena.
const TOKEN_KEY = 'smartquest_token';

const CREDENCIALES_INCORRECTAS = 'Usuario o contraseña incorrectos';
const MOCK_DELAY_MS = 600;

// ---------------------------------------------------------------------------
// Mock: mismo formato que el contrato de la API (data: { token, usuario }).
// ---------------------------------------------------------------------------

// Cuentas de prueba, también usadas por los botones de acceso rápido del login.
export const MOCK_ACCOUNTS = {
  ESTUDIANTE: { username: 'alumno1', password: 'Estudiante123!' },
  DOCENTE: { username: 'profesor1', password: 'Docente123!' },
};

const MOCK_SESSIONS = [
  {
    ...MOCK_ACCOUNTS.ESTUDIANTE,
    data: {
      token: 'mock-token-estudiante',
      usuario: {
        id: 2,
        username: 'alumno1',
        nombreCompleto: 'Sofía Valenzuela',
        rol: 'ESTUDIANTE',
        colegio: { id: 1, nombre: 'Colegio SmartQuest' },
        curso: { id: 1, nombre: '4to de Secundaria A' },
      },
    },
  },
  {
    ...MOCK_ACCOUNTS.DOCENTE,
    data: {
      token: 'mock-token-docente',
      usuario: {
        id: 1,
        username: 'profesor1',
        nombreCompleto: 'Prof. Carlos Mendoza',
        rol: 'DOCENTE',
        colegio: { id: 1, nombre: 'Colegio SmartQuest' },
        cursos: [
          { id: 1, nombre: '4to de Secundaria A' },
          { id: 2, nombre: '4to de Secundaria B' },
        ],
      },
    },
  },
];

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Copia profunda para que nadie modifique los datos del mock por accidente.
function copiar(valor) {
  return JSON.parse(JSON.stringify(valor));
}

async function mockLogin(username, password) {
  await esperar(MOCK_DELAY_MS);
  const sesion = MOCK_SESSIONS.find((s) => s.username === username && s.password === password);
  if (!sesion) {
    throw new Error(CREDENCIALES_INCORRECTAS);
  }
  return copiar(sesion.data);
}

async function mockGetMe(token) {
  await esperar(MOCK_DELAY_MS);
  const sesion = MOCK_SESSIONS.find((s) => s.data.token === token);
  if (!sesion) {
    throw new Error('Tu sesión expiró. Vuelve a iniciar sesión.');
  }
  return copiar(sesion.data.usuario);
}

// ---------------------------------------------------------------------------
// API pública del servicio
// ---------------------------------------------------------------------------

export async function getStoredToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

/**
 * Inicia sesión y guarda el token.
 * @returns {Promise<{ token: string, usuario: object }>}
 */
export async function login(username, password) {
  let data;
  if (USE_MOCK) {
    data = await mockLogin(username, password);
  } else {
    try {
      const response = await apiClient.post('/auth/login', { username, password });
      data = response.data?.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        throw new Error(CREDENCIALES_INCORRECTAS);
      }
      throw new Error(getErrorMessage(error, CREDENCIALES_INCORRECTAS));
    }
  }

  if (!data?.token || !data?.usuario) {
    throw new Error('El servidor respondió con datos incompletos. Intenta de nuevo.');
  }

  await SecureStore.setItemAsync(TOKEN_KEY, data.token);
  setAuthToken(data.token);
  return data;
}

/**
 * Devuelve el usuario de la sesión guardada.
 * @returns {Promise<object>} usuario
 */
export async function getMe() {
  const token = await getStoredToken();
  if (!token) {
    throw new Error('No hay una sesión activa.');
  }

  if (USE_MOCK) {
    return mockGetMe(token);
  }

  try {
    const response = await apiClient.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data?.data;
    // Acepta tanto data: { usuario } como data: usuario.
    const usuario = data?.usuario ?? data;
    if (!usuario?.rol) {
      throw new Error('El servidor respondió con datos incompletos.');
    }
    setAuthToken(token);
    return usuario;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'No se pudo recuperar tu sesión.'));
  }
}

/** Cierra la sesión: borra el token guardado. */
export async function logout() {
  setAuthToken(null);
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
