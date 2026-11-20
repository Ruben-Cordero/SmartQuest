// Sesión del usuario: login, usuario actual y logout contra la API central
// (o contra el mock si USE_MOCK = true). Solo se guarda el token, cifrado con
// expo-secure-store; la contraseña nunca se almacena.
import * as SecureStore from 'expo-secure-store';

import { USE_MOCK } from '../../../config/apiConfig';
import apiClient, { getErrorMessage, setAuthToken } from '../../../shared/services/apiClient';
import { AUTH_ERRORS } from './authErrors';
import { mockGetMe, mockLogin } from './authService.mock';

const TOKEN_KEY = 'smartquest_token';
const HTTP_UNAUTHORIZED = 401;

async function loginEnApi(username, password) {
  try {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data?.data;
  } catch (error) {
    if (error?.response?.status === HTTP_UNAUTHORIZED) {
      throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
    }
    throw new Error(getErrorMessage(error, AUTH_ERRORS.INVALID_CREDENTIALS));
  }
}

async function getMeEnApi(token) {
  try {
    const response = await apiClient.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data?.data;
    // Acepta tanto data: { usuario } como data: usuario.
    return data?.usuario ?? data;
  } catch (error) {
    throw new Error(getErrorMessage(error, AUTH_ERRORS.RESTORE_FAILED));
  }
}

export async function getStoredToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

/**
 * Inicia sesión y guarda el token.
 * @returns {Promise<{ token: string, usuario: object }>}
 */
export async function login(username, password) {
  const data = USE_MOCK
    ? await mockLogin(username, password)
    : await loginEnApi(username, password);

  if (!data?.token || !data?.usuario) {
    throw new Error(AUTH_ERRORS.INCOMPLETE_DATA);
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
    throw new Error(AUTH_ERRORS.NO_SESSION);
  }

  const usuario = USE_MOCK ? await mockGetMe(token) : await getMeEnApi(token);
  if (!usuario?.rol) {
    throw new Error(AUTH_ERRORS.INCOMPLETE_DATA);
  }

  setAuthToken(token);
  return usuario;
}

/** Cierra la sesión: borra el token guardado. */
export async function logout() {
  setAuthToken(null);
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
