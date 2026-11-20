// Dueño: Rubén. Una galaxia del mapa: su tarjeta y el camino de planetas.
import { StyleSheet, View } from 'react-native';

import { spacing } from '../../../../config/theme';
import GalaxyCard from './GalaxyCard';
import PlanetPath from './PlanetPath';

export default function GalaxySection({
  galaxy,
  totalGalaxies,
  width,
  onOpenPlanet,
  onSectionLayout,
  onPathLayout,
}) {
  return (
    <View style={styles.section} onLayout={(e) => onSectionLayout(galaxy.id, e)}>
      <GalaxyCard galaxy={galaxy} totalGalaxies={totalGalaxies} />
      <View onLayout={(e) => onPathLayout(galaxy.id, e)}>
        <PlanetPath galaxy={galaxy} width={width} onOpenPlanet={onOpenPlanet} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.lg,
  },
});
