import { create } from 'axios';

import { API_BASE_URL, API_TIMEOUT_MS } from '../../config/apiConfig';

// Cliente central: todas las llamadas a la API pasan por aquí.
const apiClient = create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

// Agrega (o quita) el token de sesión en todas las peticiones siguientes.
export function setAuthToken(token) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
}

// Convierte un error de axios en un mensaje comprensible para el usuario.
export function getErrorMessage(
  error,
  fallback = 'Ocurrió un error inesperado. Intenta de nuevo.',
) {
  if (error?.code === 'ECONNABORTED') {
    return 'El servidor tardó demasiado en responder. Intenta de nuevo.';
  }
  if (error?.response) {
    return error.response.data?.message || fallback;
  }
  if (error?.request) {
    return 'No se pudo conectar con el servidor. Revisa tu conexión a internet.';
  }
  return error?.message || fallback;
}

export default apiClient;
