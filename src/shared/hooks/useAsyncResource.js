import { useCallback, useEffect, useRef, useState } from 'react';

export const ASYNC_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const DEFAULT_ERROR = 'Something went wrong. Please try again.';

/**
 * Carga datos asíncronos (por ejemplo, de la API) con estados de carga, error y
 * reintento. Evita repetir en cada pantalla el mismo useEffect con banderas.
 *
 * @param {() => Promise<any>} load función que trae los datos. Debe ser estable
 *   (una función del servicio o envuelta en useCallback); si cambia, se vuelve a cargar.
 * @returns {{ data: any, status: string, error: string, retry: () => void, refresh: () => void }}
 *   - retry: vuelve a cargar mostrando el estado de carga (tras un error).
 *   - refresh: vuelve a cargar en silencio, manteniendo los datos actuales en pantalla
 *     hasta que llegan los nuevos; si falla, conserva los datos que ya había.
 */
export function useAsyncResource(load) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(ASYNC_STATUS.LOADING);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const recargaSilenciosa = useRef(false);

  useEffect(() => {
    let activo = true;
    const silenciosa = recargaSilenciosa.current;
    recargaSilenciosa.current = false;

    load()
      .then((resultado) => {
        if (!activo) return;
        setData(resultado);
        setStatus(ASYNC_STATUS.SUCCESS);
      })
      .catch((e) => {
        if (!activo || silenciosa) return;
        setData(null);
        setError(e?.message || DEFAULT_ERROR);
        setStatus(ASYNC_STATUS.ERROR);
      });

    return () => {
      activo = false;
    };
  }, [load, attempt]);

  const retry = useCallback(() => {
    setStatus(ASYNC_STATUS.LOADING);
    setAttempt((n) => n + 1);
  }, []);

  const refresh = useCallback(() => {
    recargaSilenciosa.current = true;
    setAttempt((n) => n + 1);
  }, []);

  return { data, status, error, retry, refresh };
}
