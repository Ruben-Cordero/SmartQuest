// Dueño: Liam (T14, T15 y T20). Glosario: buscador con espera, lista de términos y
// pronunciación por voz. La lógica de búsqueda vive en hooks/useGlossarySearch.js.
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { layout, spacing } from '../../../config/theme';
import ErrorState from '../../../shared/components/ErrorState';
import LoadingState from '../../../shared/components/LoadingState';
import { MessageBubble, ScreenTitle, SpaceBackground } from '../../../shared/components/space';
import GlossarySearchBar from '../components/glossary/GlossarySearchBar';
import TermCard from '../components/glossary/TermCard';
import { detenerPronunciacion } from '../components/PronunciationButton';
import { useGlossarySearch } from '../hooks/useGlossarySearch';

const SIN_COINCIDENCIAS = 'No matches found.';
const GLOSARIO_VACIO = 'The glossary has no terms yet.';

export default function GlossaryScreen() {
  const [texto, setTexto] = useState('');
  const { busqueda, terminos, cargando, error, reintentar } = useGlossarySearch(texto);

  // Al salir de la pestaña del glosario se detiene la pronunciación que esté sonando.
  useFocusEffect(useCallback(() => () => detenerPronunciacion(), []));

  const primeraCarga = terminos === null && cargando && !error;

  function renderEstado() {
    if (primeraCarga) {
      return <LoadingState message="Loading the glossary..." />;
    }
    if (error) {
      return <ErrorState message={error} onRetry={reintentar} style={styles.estado} />;
    }
    if (!cargando && terminos?.length === 0) {
      return (
        <View style={styles.estado}>
          <MessageBubble>{busqueda ? SIN_COINCIDENCIAS : GLOSARIO_VACIO}</MessageBubble>
        </View>
      );
    }
    return null;
  }

  return (
    <SpaceBackground seed="glossary">
      <View style={styles.cabecera}>
        <ScreenTitle title="Glossary" subtitle="Search a word and listen to how it sounds." />
        <GlossarySearchBar
          value={texto}
          onChangeText={setTexto}
          searching={cargando && !primeraCarga}
          style={styles.buscador}
        />
      </View>

      {renderEstado() ?? (
        <FlatList
          data={terminos ?? []}
          keyExtractor={(item, index) => String(item?.id ?? index)}
          renderItem={({ item }) => <TermCard termino={item} />}
          contentContainerStyle={styles.lista}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          testID="glossary-list"
        />
      )}
    </SpaceBackground>
  );
}

const styles = StyleSheet.create({
  cabecera: {
    padding: spacing.md,
    paddingBottom: spacing.sm,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  buscador: {
    marginTop: spacing.md,
  },
  lista: {
    padding: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.ms,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  estado: {
    padding: spacing.md,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
});
