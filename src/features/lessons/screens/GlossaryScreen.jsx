// Dueño: Liam (T14, T15 y T20).
// Hoy: título y "Coming soon".
// Falta: buscador y lista con buscarGlosario(q) de '../services/inglesApi' (palabra,
// definición, pronunciación, tiempo verbal, audio y ejemplo), estados de carga, error
// y vacío, y el botón de audio con PronunciationButton.
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors, fonts, layout, radius, spacing, typography } from '../../../config/theme';
import {
  MessageBubble,
  ScreenTitle,
  SpaceBackground,
  SpaceButton,
  SpaceCard,
} from '../../../shared/components/space';
import PronunciationButton, { detenerPronunciacion } from '../components/PronunciationButton';
import { buscarGlosario } from '../services/inglesApi';

const ESPERA_BUSQUEDA_MS = 400;
const SIN_COINCIDENCIAS = 'No se encontraron coincidencias';

function TermCard({ termino }) {
  const { palabra, pronunciacion, tiempoVerbal, definicion, ejemplo, linkAudio } = termino;

  return (
    <SpaceCard style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitle}>
          <Text style={styles.palabra} accessibilityRole="header">
            {palabra}
          </Text>
          {pronunciacion ? <Text style={styles.pronunciacion}>{pronunciacion}</Text> : null}
        </View>
        <PronunciationButton linkAudio={linkAudio} palabra={palabra} />
      </View>

      {tiempoVerbal ? (
        <View style={styles.etiqueta}>
          <Text style={styles.etiquetaTexto}>{tiempoVerbal}</Text>
        </View>
      ) : null}

      {definicion ? <Text style={styles.definicion}>{definicion}</Text> : null}

      {ejemplo ? (
        <View style={styles.ejemplo}>
          <Text style={styles.ejemploLabel}>Example</Text>
          <Text style={styles.ejemploTexto}>{ejemplo}</Text>
        </View>
      ) : null}
    </SpaceCard>
  );
}

export default function GlossaryScreen() {
  const [texto, setTexto] = useState('');
  const [terminos, setTerminos] = useState(null); // null = todavía no llegó la primera respuesta
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [reintentos, setReintentos] = useState(0);
  const ultimaPeticion = useRef(0);

  const busqueda = texto.trim();

  // T15: espera 400 ms desde la última letra antes de pedir a la API.
  // Con el campo vacío pide de inmediato el glosario completo.
  useEffect(() => {
    const espera = busqueda ? ESPERA_BUSQUEDA_MS : 0;
    const temporizador = setTimeout(async () => {
      const id = ++ultimaPeticion.current;
      setCargando(true);
      setError(null);
      try {
        const data = await buscarGlosario(busqueda);
        // Si mientras tanto se hizo otra búsqueda, se ignora esta respuesta vieja.
        if (id === ultimaPeticion.current) {
          setTerminos(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        if (id === ultimaPeticion.current) {
          setError(e?.message || 'Could not load the glossary. Please try again.');
        }
      } finally {
        if (id === ultimaPeticion.current) {
          setCargando(false);
        }
      }
    }, espera);

    return () => clearTimeout(temporizador);
  }, [busqueda, reintentos]);

  // Al salir de la pestaña del glosario se detiene el audio que esté sonando.
  useFocusEffect(useCallback(() => () => detenerPronunciacion(), []));

  const reintentar = () => setReintentos((n) => n + 1);

  const primeraCarga = terminos === null && cargando && !error;

  let contenidoVacio = null;
  if (primeraCarga) {
    contenidoVacio = (
      <View style={styles.centro}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
          accessibilityRole="progressbar"
          accessibilityLabel="Loading the glossary"
        />
        <Text style={styles.textoSuave}>Loading the glossary...</Text>
      </View>
    );
  } else if (error) {
    contenidoVacio = (
      <View style={styles.estado}>
        <MessageBubble tone="error">{error}</MessageBubble>
        <SpaceButton title="Try again" onPress={reintentar} style={styles.reintentar} />
      </View>
    );
  } else if (!cargando && terminos?.length === 0) {
    contenidoVacio = (
      <View style={styles.estado}>
        <MessageBubble>
          {busqueda ? SIN_COINCIDENCIAS : 'The glossary has no terms yet.'}
        </MessageBubble>
      </View>
    );
  }

  return (
    <SpaceBackground seed="glossary">
      <View style={styles.cabecera}>
        <ScreenTitle title="Glossary" subtitle="Search a word and listen to how it sounds." />

        <View style={styles.buscador}>
          <Ionicons
            name="search"
            size={typography.subtitle}
            color={colors.textMuted}
            style={styles.lupa}
          />
          <TextInput
            style={styles.input}
            value={texto}
            onChangeText={setTexto}
            placeholder="Search a word..."
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            clearButtonMode="never"
            accessibilityLabel="Search the glossary"
            testID="glossary-search"
          />
          {cargando && !primeraCarga ? (
            <ActivityIndicator color={colors.primary} style={styles.indicadorBusqueda} />
          ) : null}
          {texto ? (
            <Pressable
              onPress={() => setTexto('')}
              accessibilityRole="button"
              accessibilityLabel="Clear search"
              style={styles.limpiar}
            >
              <Ionicons name="close-circle" size={typography.subtitle} color={colors.textMuted} />
            </Pressable>
          ) : null}
        </View>
      </View>

      {contenidoVacio ?? (
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
  // El borde usa textMuted para cumplir el 3:1 de los controles (igual que el login).
  buscador: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: layout.minTouchSize,
    borderWidth: layout.borderWidth,
    borderColor: colors.textMuted,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.ms,
  },
  lupa: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: layout.minTouchSize,
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.text,
  },
  indicadorBusqueda: {
    marginLeft: spacing.sm,
  },
  limpiar: {
    minWidth: layout.minTouchSize,
    minHeight: layout.minTouchSize,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -spacing.ms,
  },
  lista: {
    padding: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.ms,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  estado: {
    padding: spacing.md,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  reintentar: {
    marginTop: spacing.md,
  },
  textoSuave: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  card: {
    gap: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.ms,
  },
  cardTitle: {
    flex: 1,
  },
  palabra: {
    fontFamily: fonts.display,
    fontSize: typography.title,
    lineHeight: typography.title * 1.2,
    color: colors.primary,
  },
  pronunciacion: {
    marginTop: spacing.xs,
    fontFamily: fonts.body,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  etiqueta: {
    alignSelf: 'flex-start',
    borderWidth: layout.borderWidth,
    borderColor: colors.energy,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.ms,
    paddingVertical: spacing.xs,
  },
  etiquetaTexto: {
    fontFamily: fonts.bodyMedium,
    fontSize: typography.small,
    color: colors.energy,
  },
  definicion: {
    fontFamily: fonts.body,
    fontSize: typography.body,
    lineHeight: typography.body * 1.5,
    color: colors.text,
  },
  ejemplo: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    paddingLeft: spacing.ms,
  },
  ejemploLabel: {
    fontFamily: fonts.heading,
    fontSize: typography.small,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ejemploTexto: {
    marginTop: spacing.xs,
    fontFamily: fonts.body,
    fontSize: typography.body,
    lineHeight: typography.body * 1.5,
    color: colors.text,
  },
});