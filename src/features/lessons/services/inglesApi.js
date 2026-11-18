// Dueño: Marvin (T03). Pendiente: manejo global de 401 y revisión de errores.
//
// Servicio ÚNICO del módulo de Inglés para hablar con la API central.
// - Usa el cliente central, que ya envía el header Authorization: Bearer <token>.
// - Cada función devuelve directamente el campo data de la respuesta.
// - Si hay error, lanza un Error con el message que envía la API.
// Si alguien necesita una llamada nueva, se agrega aquí (no en las pantallas).
import { APP_SLUG } from '../../../config/apiConfig';
import apiClient, { getErrorMessage } from '../../../shared/services/apiClient';

async function pedir(peticion, fallback) {
  try {
    const response = await peticion();
    return response.data?.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, fallback));
  }
}

/** GET /contenidos/{APP_SLUG}: la materia con su árbol de unidades y lecciones. */
export function getContenidoIngles() {
  return pedir(
    () => apiClient.get(`/contenidos/${APP_SLUG}`),
    'Could not load the lessons. Please try again.',
  );
}

/** GET /lecciones/:id: contenido y teoría de una lección. */
export function getLeccion(id) {
  return pedir(
    () => apiClient.get(`/lecciones/${encodeURIComponent(id)}`),
    'Could not load the lesson. Please try again.',
  );
}

/** POST /lecciones/:id/marcar-estudiado: marca como estudiada una lección SIN cuestionario. */
export function marcarEstudiado(id) {
  return pedir(
    () => apiClient.post(`/lecciones/${encodeURIComponent(id)}/marcar-estudiado`),
    'Could not mark the lesson as studied. Please try again.',
  );
}

/**
 * GET /glosarios/{APP_SLUG}: lista el glosario o busca en él.
 * El parámetro ?q= solo se envía si q tiene texto.
 */
export function buscarGlosario(q) {
  const texto = typeof q === 'string' ? q.trim() : '';
  return pedir(
    () => apiClient.get(`/glosarios/${APP_SLUG}`, { params: texto ? { q: texto } : undefined }),
    'Could not load the glossary. Please try again.',
  );
}
