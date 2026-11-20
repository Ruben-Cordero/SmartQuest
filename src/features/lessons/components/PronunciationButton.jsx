// Dueño: Liam (T20).
// Hoy: no muestra nada (devuelve null).
// Falta: un botón (SpaceButton o un ícono de @expo/vector-icons) que reproduzca el audio de
// la pronunciación desde la URL recibida en linkAudio. Si linkAudio viene vacío o null,
// debe seguir devolviendo null. Respetar "reducir movimiento" en cualquier animación y
// usar un accessibilityLabel en inglés, por ejemplo "Play pronunciation".
// Ojo: reproducir audio requiere una librería (por ejemplo expo-audio) que todavía no
// está instalada; se instala con "npx expo install", previa coordinación con el equipo.
// Lo usa GlossaryScreen: <PronunciationButton linkAudio={termino.linkAudio} />

import Ionicons from '@expo/vector-icons/Ionicons';
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, layout, radius, spacing, typography } from '../../../config/theme';

const TIEMPO_MAXIMO_MS = 10000;
const INACTIVO = { link: null, fase: 'inactivo' }; // fases: inactivo | cargando | sonando | error

// ---- Reproductor compartido (vive fuera de los componentes) ----
let player = null;
let modoConfigurado = false;
let temporizador = null;
let estadoActual = INACTIVO;
const oyentes = new Set();

function cambiarEstado(nuevo) {
  estadoActual = nuevo;
  oyentes.forEach((avisar) => avisar(nuevo));
}

function limpiarTemporizador() {
  if (temporizador) {
    clearTimeout(temporizador);
    temporizador = null;
  }
}

function pausarSinFallar() {
  try {
    player?.pause();
  } catch {
    // Si el reproductor ya no existe no hay nada que pausar.
  }
}

function marcarError() {
  limpiarTemporizador();
  pausarSinFallar();
  if (estadoActual.link) {
    cambiarEstado({ link: estadoActual.link, fase: 'error' });
  }
}

function alActualizarEstado(status) {
  if (!estadoActual.link || estadoActual.fase === 'error') {
    return;
  }
  if (status?.error) {
    marcarError();
  } else if (status?.didJustFinish) {
    limpiarTemporizador();
    cambiarEstado(INACTIVO);
  } else if (status?.playing && estadoActual.fase === 'cargando') {
    limpiarTemporizador();
    cambiarEstado({ link: estadoActual.link, fase: 'sonando' });
  }
}

function obtenerPlayer() {
  if (!player) {
    player = createAudioPlayer(null);
    player.addListener('playbackStatusUpdate', alActualizarEstado);
  }
  return player;
}

async function reproducir(link) {
  limpiarTemporizador();
  pausarSinFallar();
  cambiarEstado({ link, fase: 'cargando' });
  try {
    if (!modoConfigurado) {
      // En iPhone, sin esto el audio no suena con el teléfono en modo silencio.
      await setAudioModeAsync({ playsInSilentMode: true });
      modoConfigurado = true;
    }
    const reproductor = obtenerPlayer();
    reproductor.replace({ uri: link });
    reproductor.play();
    temporizador = setTimeout(marcarError, TIEMPO_MAXIMO_MS);
  } catch {
    marcarError();
  }
}

/** Detiene cualquier pronunciación que esté sonando (por ejemplo, al salir del glosario). */
export function detenerPronunciacion() {
  limpiarTemporizador();
  pausarSinFallar();
  if (estadoActual.link) {
    cambiarEstado(INACTIVO);
  }
}

function esUrlValida(valor) {
  return typeof valor === 'string' && /^https?:\/\/\S+$/i.test(valor.trim());
}

// ---- Componente ----
export default function PronunciationButton({ linkAudio, palabra, style }) {
  const [estado, setEstado] = useState(estadoActual);

  useEffect(() => {
    oyentes.add(setEstado);
    return () => {
      oyentes.delete(setEstado);
    };
  }, []);

  if (!esUrlValida(linkAudio)) {
    return null;
  }

  const link = linkAudio.trim();
  const fase = estado.link === link ? estado.fase : 'inactivo';
  const ocupado = fase === 'cargando' || fase === 'sonando';
  const nombre = palabra ? ` of ${palabra}` : '';

  const alTocar = () => {
    if (ocupado) {
      detenerPronunciacion();
    } else {
      reproducir(link);
    }
  };

  let icono = 'volume-high';
  if (fase === 'sonando') icono = 'stop-circle';
  if (fase === 'error') icono = 'volume-mute';

  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        onPress={alTocar}
        accessibilityRole="button"
        accessibilityLabel={ocupado ? `Stop pronunciation${nombre}` : `Play pronunciation${nombre}`}
        accessibilityState={{ busy: fase === 'cargando' }}
        hitSlop={spacing.xs}
        style={({ pressed }) => [
          styles.button,
          fase === 'error' && styles.buttonError,
          pressed && styles.pressed,
        ]}
        testID="pronunciation-button"
      >
        {fase === 'cargando' ? (
          <ActivityIndicator color={colors.onPrimary} />
        ) : (
          <Ionicons
            name={icono}
            size={typography.title}
            color={fase === 'error' ? colors.danger : colors.onPrimary}
          />
        )}
      </Pressable>
      {fase === 'error' ? (
        <Text style={styles.aviso} accessibilityRole="alert" accessibilityLiveRegion="polite">
          Audio unavailable
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  button: {
    width: layout.minTouchSize,
    height: layout.minTouchSize,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  buttonError: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: layout.borderWidth,
    borderColor: colors.danger,
  },
  pressed: {
    transform: [{ scale: 0.94 }],
    opacity: 0.85,
  },
  aviso: {
    marginTop: spacing.xs,
    maxWidth: 96,
    fontFamily: fonts.bodyMedium,
    fontSize: typography.small,
    color: colors.danger,
    textAlign: 'center',
  },
});
