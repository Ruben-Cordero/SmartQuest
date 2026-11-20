// Dueña: Estrella (T11). Marca una lección (sin cuestionario) como estudiada.
import { useState } from 'react';

import { marcarEstudiado } from '../services/inglesApi';
import { LESSON_STATUS } from '../services/lessons';

const ERROR_POR_DEFECTO = 'Could not mark the lesson as studied. Please try again.';

/**
 * @param {string|number} lessonId
 * @param {string} [estadoInicial] estadoEstudiante que devolvió la API ("PENDIENTE" | "ESTUDIADO")
 * @returns {{ estado: string, marcando: boolean, error: string|null, marcar: () => Promise<void> }}
 */
export function useMarkAsStudied(lessonId, estadoInicial) {
  const [estadoLocal, setEstadoLocal] = useState(null);
  const [marcando, setMarcando] = useState(false);
  const [error, setError] = useState(null);

  const estado = estadoLocal ?? estadoInicial ?? LESSON_STATUS.PENDING;

  async function marcar() {
    setMarcando(true);
    setError(null);
    try {
      await marcarEstudiado(lessonId);
      setEstadoLocal(LESSON_STATUS.STUDIED);
    } catch (e) {
      setError(e?.message || ERROR_POR_DEFECTO);
    } finally {
      setMarcando(false);
    }
  }

  return { estado, marcando, error, marcar };
}
