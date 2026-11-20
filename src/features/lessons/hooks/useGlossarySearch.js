// Dueño: Liam (T15). Búsqueda en el glosario con espera (debounce).
// - Espera 400 ms desde la última letra antes de pedir a la API.
// - Con el campo vacío pide de inmediato el glosario completo.
// - Solo la última búsqueda puede actualizar el estado (las respuestas viejas se ignoran).
import { useEffect, useRef, useState } from 'react';

import { buscarGlosario } from '../services/inglesApi';

const ESPERA_BUSQUEDA_MS = 400;
const ERROR_POR_DEFECTO = 'Could not load the glossary. Please try again.';

/**
 * @param {string} texto lo que escribe el usuario en el buscador
 * @returns {{ busqueda: string, terminos: Array|null, cargando: boolean, error: string|null, reintentar: () => void }}
 *   terminos es null hasta que llega la primera respuesta.
 */
export function useGlossarySearch(texto) {
  const [terminos, setTerminos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [reintentos, setReintentos] = useState(0);
  const ultimaPeticion = useRef(0);

  const busqueda = texto.trim();

  useEffect(() => {
    const idBusqueda = ++ultimaPeticion.current;
    const espera = busqueda ? ESPERA_BUSQUEDA_MS : 0;

    const temporizador = setTimeout(async () => {
      setCargando(true);
      setError(null);

      try {
        const data = await buscarGlosario(busqueda);
        if (idBusqueda === ultimaPeticion.current) {
          setTerminos(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        if (idBusqueda === ultimaPeticion.current) {
          setError(e?.message || ERROR_POR_DEFECTO);
        }
      } finally {
        if (idBusqueda === ultimaPeticion.current) {
          setCargando(false);
        }
      }
    }, espera);

    return () => {
      clearTimeout(temporizador);
      ultimaPeticion.current += 1;
    };
  }, [busqueda, reintentos]);

  const reintentar = () => setReintentos((n) => n + 1);

  return { busqueda, terminos, cargando, error, reintentar };
}
