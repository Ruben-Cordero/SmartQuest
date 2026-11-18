// Dueño: Rubén. Mapa del universo: cada unidad es una galaxia y cada lección un
// planeta. Datos: GET /contenidos/ingles (inglesApi.js); el estado de cada planeta
// sale del campo "estado" que devuelve la API. Nada de datos locales.
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';

import { layout, spacing } from '../../../config/theme';
import { MessageBubble, SpaceBackground, SpaceButton } from '../../../shared/components/space';
import { useAuth } from '../../../shared/context/AuthContext';
import GalaxyCard from '../components/galaxy/GalaxyCard';
import GalaxyHeader from '../components/galaxy/GalaxyHeader';
import MapSkeleton from '../components/galaxy/MapSkeleton';
import PlanetPath from '../components/galaxy/PlanetPath';
import { ENGLISH_ROUTES } from '../navigation/routes';
import { getContenidoIngles } from '../services/inglesApi';
import { buildGalaxies, computePathLayout } from '../services/galaxy';
import { normalizeUnits } from '../services/lessons';

const LOAD_STATE = { LOADING: 'loading', READY: 'ready', ERROR: 'error' };

export default function GalaxyMapScreen() {
  const navigation = useNavigation();
  const { usuario } = useAuth();
  const reduceMotion = useReducedMotion();
  const { width: windowWidth } = useWindowDimensions();
  const mapWidth = Math.min(windowWidth - spacing.md * 2, layout.maxContentWidth);

  const [units, setUnits] = useState([]);
  const [loadState, setLoadState] = useState(LOAD_STATE.LOADING);
  const [errorMessage, setErrorMessage] = useState('');
  const [attempt, setAttempt] = useState(0);

  // Al montar (y en cada reintento) se piden las unidades a la API.
  useEffect(() => {
    let activo = true;
    async function cargar() {
      try {
        const contenido = await getContenidoIngles();
        if (!activo) return;
        setUnits(normalizeUnits(contenido));
        setLoadState(LOAD_STATE.READY);
      } catch (error) {
        if (!activo) return;
        setUnits([]);
        setErrorMessage(error?.message || 'Could not load your galaxy. Please try again.');
        setLoadState(LOAD_STATE.ERROR);
      }
    }
    cargar();
    return () => {
      activo = false;
    };
  }, [attempt]);

  function handleRetry() {
    setLoadState(LOAD_STATE.LOADING);
    setAttempt((n) => n + 1);
  }

  const galaxies = useMemo(() => buildGalaxies(units), [units]);

  // Estable entre renders para que los caminos (memo) no se vuelvan a dibujar.
  const handleOpenPlanet = useCallback(
    (lessonId) => navigation.navigate(ENGLISH_ROUTES.LESSON_DETAIL, { lessonId }),
    [navigation],
  );

  // --- Centrar el scroll en el planeta actual (una sola vez) -----------------
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

  function renderContenido() {
    if (loadState === LOAD_STATE.LOADING) {
      return <MapSkeleton width={mapWidth} />;
    }
    if (loadState === LOAD_STATE.ERROR) {
      return (
        <View style={styles.status}>
          <MessageBubble tone="error">{errorMessage}</MessageBubble>
          <SpaceButton title="Retry" onPress={handleRetry} style={styles.retry} />
        </View>
      );
    }
    if (galaxies.length === 0) {
      return (
        <MessageBubble style={styles.status}>
          There are no planets to explore yet. Come back soon!
        </MessageBubble>
      );
    }
    return galaxies.map((galaxy) => (
      <View
        key={galaxy.id}
        style={styles.galaxy}
        onLayout={(e) => {
          medidas.current.secciones[galaxy.id] = e.nativeEvent.layout.y;
          intentarCentrar();
        }}
      >
        <GalaxyCard galaxy={galaxy} totalGalaxies={galaxies.length} />
        <View
          onLayout={(e) => {
            medidas.current.caminos[galaxy.id] = e.nativeEvent.layout.y;
            intentarCentrar();
          }}
        >
          <PlanetPath galaxy={galaxy} width={mapWidth} onOpenPlanet={handleOpenPlanet} />
        </View>
      </View>
    ));
  }

  return (
    <SpaceBackground edges={['top', 'left', 'right']} seed="galaxy-map">
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.content, { width: mapWidth + spacing.md * 2 }]}
        onLayout={(e) => {
          medidas.current.viewport = e.nativeEvent.layout.height;
          intentarCentrar();
        }}
      >
        <GalaxyHeader name={usuario?.nombreCompleto} course={usuario?.curso?.nombre} />
        {renderContenido()}
      </ScrollView>
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    alignSelf: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  galaxy: {
    marginTop: spacing.lg,
  },
  status: {
    marginTop: spacing.lg,
  },
  retry: {
    marginTop: spacing.md,
  },
});
