// Dueño: Rubén. Mapa del universo: cada unidad es una galaxia y cada lección un
// planeta. Datos: GET /contenidos/ingles (inglesApi.js); el estado de cada planeta
// sale del campo "estado" que devuelve la API. Nada de datos locales.
import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import { layout, spacing } from '../../../config/theme';
import ErrorState from '../../../shared/components/ErrorState';
import { MessageBubble, SpaceBackground } from '../../../shared/components/space';
import { ASYNC_STATUS, useAsyncResource } from '../../../shared/hooks/useAsyncResource';
import { useAuth } from '../../auth';
import GalaxyHeader from '../components/galaxy/GalaxyHeader';
import GalaxySection from '../components/galaxy/GalaxySection';
import MapSkeleton from '../components/galaxy/MapSkeleton';
import { useCenterOnCurrentPlanet } from '../components/galaxy/useCenterOnCurrentPlanet';
import { ENGLISH_ROUTES } from '../navigation/routes';
import { buildGalaxies } from '../services/galaxy';
import { getContenidoIngles } from '../services/inglesApi';
import { normalizeUnits } from '../services/lessons';

export default function GalaxyMapScreen() {
  const navigation = useNavigation();
  const { usuario } = useAuth();
  const { width: windowWidth } = useWindowDimensions();
  const mapWidth = Math.min(windowWidth - spacing.md * 2, layout.maxContentWidth);

  const { data: contenido, status, error, retry } = useAsyncResource(getContenidoIngles);
  const galaxies = useMemo(() => buildGalaxies(normalizeUnits(contenido)), [contenido]);
  const { scrollRef, onViewportLayout, onSectionLayout, onPathLayout } = useCenterOnCurrentPlanet(
    galaxies,
    mapWidth,
  );

  // Estable entre renders para que los caminos (memo) no se vuelvan a dibujar.
  const handleOpenPlanet = useCallback(
    (lessonId) => navigation.navigate(ENGLISH_ROUTES.LESSON_DETAIL, { lessonId }),
    [navigation],
  );

  function renderContent() {
    if (status === ASYNC_STATUS.LOADING) {
      return <MapSkeleton width={mapWidth} />;
    }
    if (status === ASYNC_STATUS.ERROR) {
      return <ErrorState message={error} onRetry={retry} style={styles.status} />;
    }
    if (galaxies.length === 0) {
      return (
        <MessageBubble style={styles.status}>
          There are no planets to explore yet. Come back soon!
        </MessageBubble>
      );
    }
    return galaxies.map((galaxy) => (
      <GalaxySection
        key={galaxy.id}
        galaxy={galaxy}
        totalGalaxies={galaxies.length}
        width={mapWidth}
        onOpenPlanet={handleOpenPlanet}
        onSectionLayout={onSectionLayout}
        onPathLayout={onPathLayout}
      />
    ));
  }

  return (
    <SpaceBackground edges={['top', 'left', 'right']} seed="galaxy-map">
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.content, { width: mapWidth + spacing.md * 2 }]}
        onLayout={onViewportLayout}
      >
        <GalaxyHeader name={usuario?.nombreCompleto} course={usuario?.curso?.nombre} />
        {renderContent()}
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
  status: {
    marginTop: spacing.lg,
  },
});
