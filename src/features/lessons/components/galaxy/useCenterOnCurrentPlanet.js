// Dueño: Rubén. Centra el scroll del mapa en el planeta actual, una sola vez, en
// cuanto se conocen las medidas (alto visible y posición de la galaxia y su camino).
import { useCallback, useRef } from 'react';
import { useReducedMotion } from 'react-native-reanimated';

import { computePathLayout } from '../../services/galaxy';

export function useCenterOnCurrentPlanet(galaxies, mapWidth) {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef(null);
  const medidas = useRef({ viewport: 0, secciones: {}, caminos: {} });
  const yaCentrado = useRef(false);
  const galaxiaActual = galaxies.find((g) => g.currentIndex >= 0);

  const intentarCentrar = useCallback(() => {
    if (yaCentrado.current || !galaxiaActual) return;
    const { viewport, secciones, caminos } = medidas.current;
    const seccion = secciones[galaxiaActual.id];
    const camino = caminos[galaxiaActual.id];
    if (!viewport || seccion == null || camino == null) return;

    const { points } = computePathLayout(galaxiaActual.planets.length, mapWidth);
    const y = seccion + camino + points[galaxiaActual.currentIndex].y;
    yaCentrado.current = true;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - viewport / 2), animated: !reduceMotion });
  }, [galaxiaActual, mapWidth, reduceMotion]);

  const onViewportLayout = useCallback(
    (event) => {
      medidas.current.viewport = event.nativeEvent.layout.height;
      intentarCentrar();
    },
    [intentarCentrar],
  );

  const onSectionLayout = useCallback(
    (galaxyId, event) => {
      medidas.current.secciones[galaxyId] = event.nativeEvent.layout.y;
      intentarCentrar();
    },
    [intentarCentrar],
  );

  const onPathLayout = useCallback(
    (galaxyId, event) => {
      medidas.current.caminos[galaxyId] = event.nativeEvent.layout.y;
      intentarCentrar();
    },
    [intentarCentrar],
  );

  return { scrollRef, onViewportLayout, onSectionLayout, onPathLayout };
}
