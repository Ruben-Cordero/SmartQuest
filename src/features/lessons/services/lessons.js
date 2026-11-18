// Adapta la respuesta de GET /contenidos/ingles a la forma que usan las pantallas.
// Si la API cambia nombres de campos, se ajustan aquí y no en la pantalla.

export const LESSON_STATUS = {
  STUDIED: 'ESTUDIADO',
  PENDING: 'PENDIENTE',
};

function porOrden(a, b) {
  const oa = Number.isFinite(a?.orden) ? a.orden : Number.MAX_SAFE_INTEGER;
  const ob = Number.isFinite(b?.orden) ? b.orden : Number.MAX_SAFE_INTEGER;
  return oa - ob || Number(a?.id) - Number(b?.id);
}

/**
 * @param {object} contenido data de GET /contenidos/ingles
 * @returns {Array<{ id: string, title: string, lessons: Array<{ id: string, title: string, status: string, hasQuiz: boolean }> }>}
 *   unidades y lecciones ordenadas por el campo "orden".
 */
export function normalizeUnits(contenido) {
  const unidades = Array.isArray(contenido?.unidades) ? contenido.unidades : [];

  return [...unidades]
    .filter((unidad) => unidad?.id != null)
    .sort(porOrden)
    .map((unidad) => ({
      id: String(unidad.id),
      title: unidad.titulo ?? '',
      lessons: (Array.isArray(unidad.lecciones) ? [...unidad.lecciones] : [])
        .filter((leccion) => leccion?.id != null)
        .sort(porOrden)
        .map((leccion) => ({
          id: String(leccion.id),
          title: leccion.titulo ?? '',
          status:
            leccion.estado === LESSON_STATUS.STUDIED
              ? LESSON_STATUS.STUDIED
              : LESSON_STATUS.PENDING,
          hasQuiz: Boolean(leccion.tieneCuestionario),
        })),
    }));
}
