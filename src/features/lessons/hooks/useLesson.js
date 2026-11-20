// Dueña: Estrella (T09). Carga una lección de la API con estados de carga y error.
import { useCallback } from 'react';

import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';
import { getLeccion } from '../services/inglesApi';

const LECCION_NO_ENCONTRADA = 'Lesson not found.';
const ERROR_POR_DEFECTO = 'Could not load the lesson. Please try again.';

// Traduce el error de la API a un mensaje claro para el estudiante.
function mensajeDeError(error) {
  const mensaje = error?.message || '';
  const texto = mensaje.toLowerCase();
  if (texto.includes('no encontrada') || texto.includes('not found')) {
    return LECCION_NO_ENCONTRADA;
  }
  return mensaje || ERROR_POR_DEFECTO;
}

/**
 * @param {string|number} lessonId
 * @returns {{ leccion: object|null, status: string, error: string, retry: () => void }}
 */
export function useLesson(lessonId) {
  const cargar = useCallback(async () => {
    if (!lessonId) {
      throw new Error(LECCION_NO_ENCONTRADA);
    }
    try {
      return await getLeccion(lessonId);
    } catch (e) {
      throw new Error(mensajeDeError(e));
    }
  }, [lessonId]);

  const { data: leccion, status, error, retry } = useAsyncResource(cargar);
  return { leccion, status, error, retry };
}
