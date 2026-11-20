// Pronunciación del glosario mediante texto a voz (TTS).
// No requiere enlaces MP3: lee directamente el campo `palabra`.
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, layout, radius, spacing, typography } from '../../../config/theme';

const INACTIVO = { palabra: null, fase: 'inactivo' };
let estadoActual = INACTIVO;
let solicitudActual = 0;
const oyentes = new Set();

function cambiarEstado(nuevo) {
  estadoActual = nuevo;
  oyentes.forEach((avisar) => avisar(nuevo));
}

/** Detiene la lectura actual, también al salir del glosario. */
export function detenerPronunciacion() {
  solicitudActual += 1;
  cambiarEstado(INACTIVO);
  Speech.stop().catch(() => {});
}

function reproducir(palabra) {
  // Identificador para que los callbacks de una lectura anterior no afecten la nueva.
  const solicitud = ++solicitudActual;
  cambiarEstado({ palabra, fase: 'cargando' });

  Speech.stop()
    .then(() => {
      if (solicitud !== solicitudActual) return;
      Speech.speak(palabra, {
        language: 'en-US',
        rate: 0.85,
        pitch: 1,
        onStart: () => {
          if (solicitud === solicitudActual) {
            cambiarEstado({ palabra, fase: 'sonando' });
          }
        },
        onDone: () => {
          if (solicitud === solicitudActual) cambiarEstado(INACTIVO);
        },
        onStopped: () => {
          if (solicitud === solicitudActual) cambiarEstado(INACTIVO);
        },
        onError: () => {
          if (solicitud === solicitudActual) cambiarEstado({ palabra, fase: 'error' });
        },
      });
    })
    .catch(() => {
      if (solicitud === solicitudActual) {
        cambiarEstado({ palabra, fase: 'error' });
      }
    });
}

export default function PronunciationButton({ palabra, style }) {
  const [estado, setEstado] = useState(estadoActual);

  useEffect(() => {
    oyentes.add(setEstado);
    return () => oyentes.delete(setEstado);
  }, []);

  const texto = typeof palabra === 'string' ? palabra.trim() : '';
  if (!texto) return null;

  const fase = estado.palabra === texto ? estado.fase : 'inactivo';
  const ocupado = fase === 'cargando' || fase === 'sonando';

  const alTocar = () => {
    if (ocupado) detenerPronunciacion();
    else reproducir(texto);
  };

  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        onPress={alTocar}
        accessibilityRole="button"
        accessibilityLabel={ocupado ? `Stop pronunciation of ${texto}` : `Play pronunciation of ${texto}`}
        accessibilityState={{ busy: fase === 'cargando' }}
        hitSlop={spacing.xs}
        style={({ pressed }) => [
          styles.button,
          fase === 'error' && styles.buttonError,
          pressed && styles.pressed,
        ]}
        testID="pronunciation-button"
      >
        <Ionicons
          name={ocupado ? 'stop-circle' : fase === 'error' ? 'volume-mute' : 'volume-high'}
          size={typography.title}
          color={fase === 'error' ? colors.danger : colors.onPrimary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center' },
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
  pressed: { transform: [{ scale: 0.94 }], opacity: 0.85 },
});
