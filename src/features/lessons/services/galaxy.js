// Dueño: Rubén. Lógica pura del mapa de galaxias (sin React): estados de los
// planetas a partir del progreso que devuelve la API y posiciones del camino.
import { LESSON_STATUS } from './lessons';

export const PLANET_STATE = {
  COMPLETED: 'completed',
  CURRENT: 'current',
  LOCKED: 'locked',
};

// "Unit 1: …", "Unidad 2 - …", "UNIT 3. …": prefijo de numeración que trae la API.
const UNIT_PREFIX = /^\s*(unit|unidad)\s*\d+\s*[:.\-–—]\s*/i;

/**
 * Nombre de la galaxia sin el prefijo "Unit N:" / "Unidad N:", porque la tarjeta
 * ya muestra "Galaxy N of M". Si al quitarlo no queda nada, devuelve el título original.
 */
export function galaxyName(title) {
  const texto = String(title ?? '').trim();
  const sinPrefijo = texto.replace(UNIT_PREFIX, '').trim();
  return sinPrefijo || texto;
}

/**
 * Convierte las unidades normalizadas (normalizeUnits) en galaxias con planetas.
 * - completed: la API dice ESTUDIADO.
 * - current: la PRIMERA lección no estudiada, recorriendo galaxias y planetas en orden.
 * - locked: el resto de las no estudiadas.
 * Las unidades sin lecciones no se muestran.
 */
export function buildGalaxies(units) {
  const conLecciones = (Array.isArray(units) ? units : []).filter(
    (u) => Array.isArray(u?.lessons) && u.lessons.length > 0,
  );
  const actual = conLecciones
    .flatMap((u) => u.lessons)
    .find((l) => l.status !== LESSON_STATUS.STUDIED);

  return conLecciones.map((unidad, gi) => {
    const planets = unidad.lessons.map((leccion, li) => {
      let state = PLANET_STATE.LOCKED;
      if (leccion.status === LESSON_STATUS.STUDIED) state = PLANET_STATE.COMPLETED;
      else if (actual && leccion.id === actual.id) state = PLANET_STATE.CURRENT;
      return { ...leccion, number: li + 1, state };
    });
    const completed = planets.filter((p) => p.state === PLANET_STATE.COMPLETED).length;
    return {
      id: unidad.id,
      number: gi + 1,
      title: galaxyName(unidad.title),
      planets,
      completed,
      total: planets.length,
      currentIndex: planets.findIndex((p) => p.state === PLANET_STATE.CURRENT),
    };
  });
}

// --- Geometría del camino -------------------------------------------------

export const PATH_LAYOUT = {
  step: 175, // distancia vertical entre planetas
  top: 86, // centro del primer planeta
  planetSize: 92,
  currentSize: 118,
  blackHoleSpace: 150, // espacio para el agujero negro al final
  labelWidth: 168,
};

// Zigzag que serpentea: centro, derecha, centro, izquierda…
const ZIGZAG = [0, 1, 0, -1];

/**
 * Posiciones de los planetas (y del agujero negro al final) para un ancho dado.
 * @returns {{ points: Array<{x:number,y:number,side:number}>, blackHole: {x:number,y:number}, height: number }}
 */
export function computePathLayout(count, width) {
  const amplitud = Math.min(width * 0.26, 100);
  const punto = (i) => {
    const side = ZIGZAG[i % ZIGZAG.length];
    return { x: width / 2 + side * amplitud, y: PATH_LAYOUT.top + i * PATH_LAYOUT.step, side };
  };
  const points = Array.from({ length: count }, (_, i) => punto(i));
  const blackHole = punto(count);
  return {
    points,
    blackHole,
    height: blackHole.y + PATH_LAYOUT.blackHoleSpace / 2 + 40,
  };
}

/** Path SVG suave (curvas de Bézier verticales) que une los puntos en orden. */
export function curveThrough(points) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const medio = (b.y - a.y) / 2;
    d += ` C ${a.x} ${a.y + medio}, ${b.x} ${b.y - medio}, ${b.x} ${b.y}`;
  }
  return d;
}
