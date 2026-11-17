// Único punto de lectura de las unidades y lecciones (datos locales, sin API).
// Para usar el archivo real, cambia SOLO esta línea por:
//   import unitsSource from '../data/lessons';
import unitsSource from '../data/lessons.mock';

/**
 * Devuelve las unidades con una forma fija para las pantallas:
 * [{ id, title, lessons: [{ id, title }] }]
 * Si el archivo real usa otros nombres de campos, adáptalos aquí y no en la pantalla.
 */
export function getUnits() {
  if (!Array.isArray(unitsSource)) return [];

  return unitsSource
    .filter((unit) => unit?.id != null)
    .map((unit) => ({
      id: String(unit.id),
      title: unit.title ?? '',
      lessons: (Array.isArray(unit.lessons) ? unit.lessons : [])
        .filter((lesson) => lesson?.id != null)
        .map((lesson) => ({
          id: String(lesson.id),
          title: lesson.title ?? '',
        })),
    }));
}
